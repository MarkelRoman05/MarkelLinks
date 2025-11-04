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
  let cleaned = name
    .replace(/\s*-->\s*.*$/i, '') // Elimina todo después de -->
    .replace(/\b(FHD|HD|4K|SD|NEW\s*ERA|ELCANO|SPORT\s*TV|NEW\s*LOOP)\b/gi, '') // Elimina variantes de calidad y fuente
    .replace(/\b(I{1,3}|VI|IV|V|II)\b/gi, '') // Elimina números romanos
    .replace(/\([^)]*\)/g, '') // Elimina contenido entre paréntesis como (DE), (TR), (RU), etc.
    .replace(/\[[^\]]*\]/g, '') // Elimina contenido entre corchetes como [UK], [US], etc.
    .trim()
    .replace(/\s{2,}/g, ' ')
    .toUpperCase();
  
  // Normaliza nombres específicos para que coincidan entre fuente remota y JSON local
  cleaned = cleaned
    // Liga de Campeones
    .replace(/^M\+\s*L\.\s*DE\s*CAMPEONES/i, 'LIGA DE CAMPEONES')
    .replace(/^LIGA\s+DE\s+CAMPEONES/i, 'LIGA DE CAMPEONES')
    // LaLiga
    .replace(/^M\+\s*LALIGA/i, 'M+ LALIGA')
    // DAZN LaLiga (con o sin espacio)
    .replace(/^DAZN\s*LA\s*LIGA/i, 'DAZN LALIGA')
    // Movistar Plus
    .replace(/^MOVISTAR\s*PLUS\+?/i, 'MOVISTAR PLUS+')
    // Hypermotion
    .replace(/^HYPERMOTION/i, 'LALIGA TV HYPERMOTION')
    // Movistar Vamos
    .replace(/^M\+\s*VAMOS/i, 'M+ VAMOS')
    .replace(/^MOVISTAR\s*VAMOS/i, 'M+ VAMOS')
    // Movistar Deportes
    .replace(/^M\+\s*DEPORTES/i, 'M+ DEPORTES')
    .replace(/^MOVISTAR\s*DEPORTES/i, 'M+ DEPORTES')
    // Movistar Ellas
    .replace(/^M\+\s*ELLAS\s*VAMOS/i, 'M+ ELLAS VAMOS')
    .replace(/^MOVISTAR\s*ELLAS/i, 'M+ ELLAS VAMOS')
    // Movistar Golf
    .replace(/^M\+\s*GOLF/i, 'M+ GOLF')
    .replace(/^MOVISTAR\s*GOLF/i, 'M+ GOLF')
    // DAZN F1
    .replace(/^DAZN\s*F1/i, 'DAZN F1')
    // Eurosport
    .replace(/^EUROSPORT\s+(\d+)/i, 'EUROSPORT $1')
    // Tennis Channel
    .replace(/^TENNIS\s+CHANNEL/i, 'TENNIS CHANNEL')
    // GOL
    .replace(/^GOL\s+PLAY/i, 'GOL')
    // Rally TV
    .replace(/^RALLY\s+TV/i, 'RALLY TV')
    .trim();
  
  return cleaned;
}

function parseRemoteList(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const entries = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const name = lines[i];
    const hash = lines[i + 1];
    // Solo acepta hashes hexadecimales válidos de 40 caracteres
    if (typeof hash === 'string' && hash.length === 40 && /^[0-9a-f]{40}$/i.test(hash)) {
      entries.push({ name, hash: hash.toLowerCase() });
      i++;
    } else if (hash && hash.length > 0) {
      log(`[WARN] Hash descartado para ${name}: ${hash} (longitud: ${hash.length})`);
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
      const titleBase = getTitleBase(existing.title);
      const prev = idFromUrl(existing.url);
      
      // Si hay múltiples opciones (targetCount > 1), asegurar que todas tengan el sufijo "(OPCIÓN X)"
      const newTitle = targetCount > 1 ? `${titleBase} (OPCIÓN ${idx})` : titleBase;
      
      if (prev !== hash) {
        existing = { ...existing, url: `acestream://${hash}`, title: newTitle };
        changes.push({ title: newTitle, from: prev, to: hash });
      } else if (existing.title !== newTitle) {
        // Si no cambió el hash pero sí el título (se añadió "(OPCIÓN X)")
        existing = { ...existing, title: newTitle };
      } else {
        existing = { ...existing };
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
    log('Iniciando actualización de links...');
    console.log('Iniciando actualización de links...');
    
    const links = JSON.parse(fs.readFileSync(LINKS_PATH, 'utf8'));
    log(`Links locales cargados: ${links.length} items`);
    console.log(`Links locales cargados: ${links.length} items`);
    
    log(`Fetching remote URL: ${REMOTE_URL}`);
    console.log(`Fetching remote URL: ${REMOTE_URL}`);
    
    const TIMEOUT_MS = 300000; // 300 segundos (5 minutos)
    const MAX_RETRIES = 5;
    let resp = null;
    let lastError = null;
    
    // Reintentar hasta 2 veces
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const cacheBuster = `?t=${Date.now()}`;
        const url = REMOTE_URL + cacheBuster;
        
        if (attempt > 1) {
          log(`Reintento ${attempt}/${MAX_RETRIES}...`);
          console.log(`Reintento ${attempt}/${MAX_RETRIES}...`);
        }
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
        
        const options = {
          signal: controller.signal,
        };

        if (attempt > 1) {
          options.headers = {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          };
        }

        resp = await fetch(url, options);
        clearTimeout(timeoutId);
        
        log(`Fetch status: ${resp.status} ${resp.statusText}`);
        console.log(`Fetch status: ${resp.status} ${resp.statusText}`);
        
        if (resp.ok) {
          break; // Éxito, salir del bucle
        } else {
          lastError = new Error(`HTTP error! status: ${resp.status}`);
          log(`✗ Error: ${lastError.message}`);
          console.log(`✗ Error: ${lastError.message}`);
        }
      } catch (err) {
        lastError = err;
        const errorMsg = err.name === 'AbortError' ? 'Timeout' : err.message;
        log(`✗ Error: ${errorMsg}`);
        console.log(`✗ Error: ${errorMsg}`);
      }
      
      // Esperar 3 segundos antes del siguiente intento (excepto en el último)
      if (attempt < MAX_RETRIES && (!resp || !resp.ok)) {
        log('Esperando 3 segundos antes del siguiente intento...');
        console.log('Esperando 3 segundos antes del siguiente intento...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
    
    if (!resp || !resp.ok) {
      const errorMsg = lastError 
        ? `Falló después de ${MAX_RETRIES} intentos. Último error: ${lastError.message}` 
        : 'No se pudo conectar al servidor IPFS';
      throw new Error(errorMsg);
    }
    
    const txt = await resp.text();
    log(`Texto remoto descargado: ${txt.length} caracteres`);
    console.log(`Texto remoto descargado: ${txt.length} caracteres`);
    
    // Advertencia si el texto parece demasiado pequeño
    if (txt.length < 25000) {
      log(`[WARN] El texto descargado parece incompleto (${txt.length} caracteres). Puede ser una versión en caché desactualizada.`);
      console.warn(`[WARN] El texto descargado parece incompleto (${txt.length} caracteres). Puede ser una versión en caché desactualizada.`);
    }
    
    const entries = parseRemoteList(txt);
    log(`Entries parseadas: ${entries.length} (válidas), warnings en el log para las inválidas`);
    console.log(`Entries parseadas: ${entries.length} (válidas), warnings en el log para las inválidas`);
    
    const remoteBuckets = buildRemoteBuckets(entries);
    log(`Buckets remotos creados: ${remoteBuckets.size}`);
    console.log(`Buckets remotos creados: ${remoteBuckets.size}`);
    
    // Advertencia si hay muy pocos buckets
    if (remoteBuckets.size < 200) {
      log(`[WARN] Se esperaban al menos 200 buckets, pero solo se encontraron ${remoteBuckets.size}. Los datos pueden estar incompletos.`);
      console.warn(`[WARN] Se esperaban al menos 200 buckets, pero solo se encontraron ${remoteBuckets.size}. Los datos pueden estar incompletos.`);
    }
    
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
      log('Archivo links.json actualizado correctamente');
      console.log('Archivo links.json actualizado correctamente');
    } else {
      log('Sin cambios en el contenido del archivo');
      console.log('Sin cambios en el contenido del archivo');
    }
  } catch (e) {
    if (e.name === 'AbortError') {
      log('ERROR: Timeout al intentar descargar los links remotos (30s)');
      console.error('ERROR: Timeout al intentar descargar los links remotos (30s)');
    } else {
      log('ERROR: ' + e.message);
      console.error('ERROR:', e.message);
      console.error(e.stack);
    }
    process.exit(1);
  }
}

main();