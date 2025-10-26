import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');

const LOG_DIR = path.join(PROJECT_ROOT, 'logs');
const LOG_FILE = 'actualizar_links.log';
const LOG_PATH = path.join(LOG_DIR, LOG_FILE);
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

function log(msg) {
  const now = new Date().toISOString().replace('T',' ').slice(0,19);
  fs.appendFileSync(LOG_PATH, `[${now}] ${msg}\n`, 'utf8');
}

const LINKS_PATH = path.join(PROJECT_ROOT, 'src/assets/links.json');
const REMOTE_URL = 'https://ipfs.io/ipns/k2k4r8oqlcjxsritt5mczkcn4mmvcmymbqw7113fz2flkrerfwfps004/data/listas/listaplana.txt';

// Limpieza de variantes y normalización
function cleanVariant(name) {
  return name
    .replace(/\b(FHD|HD|4K|SD|NEW\s*ERA|ELCANO|SPORT\s*TV)\b/gi, '')
    .replace(/\s*-->\s*.*$/i, '')
    .trim()
    .replace(/\s{2,}/g, ' ')
    .toUpperCase();
}

function parseRemoteList(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const entries = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const name = lines[i];
    const hash = lines[i + 1];
    // Acepta cualquier string de 40 caracteres (para debug de fuentes IPFS) y loguea los inválidos.
    if (typeof hash === 'string' && hash.length === 40) {
      if (!/^[0-9a-f]{40}$/i.test(hash)) {
        log(`[WARN] Hash no-hex detectado para ${name}: ${hash}`);
      }
      entries.push({ name, hash: hash.toLowerCase() });
      i++;
    } else if (hash && hash.length > 0) {
      log(`[WARN] Hash descartado (longitud!=40): ${hash} para ${name}`);
    }
  }
  return entries;
}

function idFromUrl(url) {
  const m = String(url).match(/acestream:\/\/([0-9a-f]{40})/i);
  return m ? m[1].toLowerCase() : null;
}

function buildRemoteBuckets(entries) {
  const buckets = new Map();
  for (const e of entries) {
    const key = cleanVariant(e.name);
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(e.hash);
  }
  return buckets;
}

function extractOpcionNumber(title) {
  const match = title.match(/OPCIÓN\s+(\d+)/i);
  return match ? parseInt(match[1], 10) : null;
}

function getTitleBase(str) {
  return str.replace(/\s*\(OPCIÓN\s+\d+\)$/, '').trim();
}

function reconcileGroup(remoteHashes, groupItems, baseTemplate) {
  const updatedItems = [];
  const changes = [];

  const itemsWithIdx = groupItems
    .map(item => ({
      item,
      idx: extractOpcionNumber(item.title) ?? 1,
    }))
    .sort((a, b) => a.idx - b.idx);

  const targetCount = remoteHashes.length;

  for (let i = 0; i < targetCount; i++) {
    const idx = i + 1;
    const hash = remoteHashes[i];
    let existing = itemsWithIdx.find(x => x.idx === idx)?.item;

    if (!existing) {
      const titleBase = getTitleBase(baseTemplate.title);
      existing = {
        ...baseTemplate,
        title: `${titleBase} (OPCIÓN ${idx})`,
        url: `acestream://${hash}`,
      };
      updatedItems.push(existing);
      changes.push({ title: existing.title, from: '(nuevo)', to: hash });
    } else {
      const prev = idFromUrl(existing.url);
      if (prev !== hash) {
        existing = { ...existing, url: `acestream://${hash}` };
        changes.push({ title: existing.title, from: prev, to: hash });
      }
      updatedItems.push(existing);
    }
  }

  if (itemsWithIdx.length > targetCount) {
    const toRemove = itemsWithIdx.slice(targetCount).map(x => x.item.title);
    for (const name of toRemove) {
      changes.push({
        title: name,
        from:
          idFromUrl(groupItems.find(i => i.title === name)?.url) || '(vacío)',
        to: '(eliminado)',
      });
    }
  }

  return { updated: updatedItems, changes };
}

async function main() {
  try {
    const links = JSON.parse(fs.readFileSync(LINKS_PATH, 'utf8'));
    const resp = await fetch(REMOTE_URL);
    const txt = await resp.text();
    const entries = parseRemoteList(txt);
    const remoteBuckets = buildRemoteBuckets(entries);

    const nextLinks = [];
    const allChanges = [];

    const groupNames = [
      ...new Set(
        links.map(l => cleanVariant(getTitleBase(l.title)))
      ),
    ];

    for (const groupName of groupNames) {
      const groupItems = links.filter(
        l => cleanVariant(getTitleBase(l.title)) === groupName
      );
      if (groupItems.length === 0) continue;

      const baseTemplate = {
        ...groupItems[0],
        title: getTitleBase(groupItems[0].title),
      };

      const remoteHashes = remoteBuckets.get(groupName) || [];
      if (remoteHashes.length === 0) {
        nextLinks.push(...groupItems);
        continue;
      }

      const { updated, changes } = reconcileGroup(
        remoteHashes,
        groupItems,
        baseTemplate
      );
      nextLinks.push(...updated);
      allChanges.push(...changes);
    }

    // Evita duplicados al final: compara por título base limpio
    const addedBaseTitles = new Set(
      nextLinks.map(x => cleanVariant(getTitleBase(x.title)))
    );

    const remaining = links.filter(
      l => !addedBaseTitles.has(cleanVariant(getTitleBase(l.title)))
    );

    nextLinks.push(...remaining);

    const oldContent = fs.existsSync(LINKS_PATH)
      ? fs.readFileSync(LINKS_PATH, 'utf8')
      : '';
    const newContent = JSON.stringify(nextLinks, null, 2);

    const resumen =
      `OK. Cambios: ${allChanges.length}` +
      (allChanges.length
        ? '\n' + allChanges.map(c => `- ${c.title}: ${c.from} -> ${c.to}`).join('\n')
        : '');
    log(resumen);
    console.log(resumen);

    // NUEVO: Escribe el resumen simple del run para notificación o email
    try { fs.writeFileSync('logs/summary.txt', resumen, 'utf8'); } catch { }

    // Sólo escribe si hay cambios reales
    if (oldContent.trim() !== newContent.trim()) {
      fs.writeFileSync(LINKS_PATH, newContent, 'utf8');
    }
  } catch (e) {
    log('ERROR: ' + e.message);
    console.error(e);
    process.exit(1);
  }
}

main();