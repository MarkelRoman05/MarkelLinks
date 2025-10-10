import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// Ruta log
const LOG_DIR = 'logs';
const LOG_FILE = 'actualizar_links.log';
const LOG_PATH = path.join(LOG_DIR, LOG_FILE);

// Crea carpeta logs si no existe
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

// Función para loguear eventos con timestamp
function log(msg) {
  const now = new Date().toISOString().replace('T',' ').slice(0,19);
  fs.appendFileSync(LOG_PATH, `[${now}] ${msg}\n`, 'utf8');
}

// --- CONFIGURACIÓN ---
const linksBase = JSON.parse(fs.readFileSync('src/assets/links.base.json', 'utf8'));
const REMOTE_URL = 'https://ipfs.io/ipns/k2k4r8oqlcjxsritt5mczkcn4mmvcmymbqw7113fz2flkrerfwfps004/data/listas/listaplana.txt';
const OUTPUT = path.resolve('src/assets/links.json');

// Matchers simplificados - el script detecta automáticamente las opciones
const canalMatchers = [
  { remote: 'M+ LALIGA', match: l => l.title.includes('M+ LALIGA') && !l.title.includes('M+ LALIGA 2') && !l.title.includes('M+ LALIGA 3') && !l.title.includes('M+ LALIGA 4') },
  { remote: 'M+ LALIGA 2', match: l => l.title.includes('M+ LALIGA 2') },
  { remote: 'M+ LALIGA 3', match: l => l.title.includes('M+ LALIGA 3') },
  { remote: 'M+ LALIGA 4', match: l => l.title.includes('M+ LALIGA 4') },
  { remote: 'MOVISTAR+', match: l => l.title.includes('Movistar Plus+ (OPCIÓN') },
  { remote: 'MOVISTAR+ 2', match: l => l.title.includes('Movistar Plus+ 2') },
  { remote: 'DAZN F1', match: l => l.title.includes('DAZN F1') },
  { remote: 'EUROSPORT 1', match: l => l.title.includes('Eurosport 1') },
  { remote: 'EUROSPORT 2', match: l => l.title.includes('Eurosport 2') },
  { remote: 'FOX PREMIUM UFC', match: l => l.title === 'FOX PREMIUM UFC' },
  { remote: 'UFC FIGHT PASS', match: l => l.title === 'UFC Fight Pass' },
  { remote: 'NBA TV', match: l => l.title === 'NBA TV' },
  { remote: 'GOL', match: l => l.title === 'GOL' },
  { remote: 'BEIN SPORTS', match: l => l.title === 'beIN SPORTS 1' },
  { remote: 'DAZN LALIGA', match: l => l.title.includes('DAZN LALIGA') && !l.title.includes('DAZN LALIGA 2') && !l.title.includes('DAZN LALIGA 3') },
  { remote: 'DAZN LALIGA 2', match: l => l.title.includes('DAZN LALIGA 2') },
  { remote: 'DAZN LALIGA 3', match: l => l.title.includes('DAZN LALIGA 3') },
  { remote: 'DAZN 1', match: l => l.title.includes('DAZN 1') && !l.title.includes('DAZN 1') },
  { remote: 'DAZN 2', match: l => l.title.includes('DAZN 2') },
  { remote: 'DAZN 3', match: l => l.title.includes('DAZN 3') },
  { remote: 'DAZN 4', match: l => l.title.includes('DAZN 4') },
  { remote: 'LA LIGA HYPERMOTION', match: l => l.title.includes('LALIGA TV HYPERMOTION (') },
  { remote: 'LA LIGA HYPERMOTION 2', match: l => l.title.includes('LALIGA TV HYPERMOTION 2') },
  { remote: 'LA LIGA HYPERMOTION 3', match: l => l.title.includes('LALIGA TV HYPERMOTION 3') },
  { remote: 'LA LIGA HYPERMOTION 4', match: l => l.title.includes('LALIGA TV HYPERMOTION 4') },
  { remote: 'LA LIGA HYPERMOTION 5', match: l => l.title.includes('LALIGA TV HYPERMOTION 5') },
  { remote: 'M+ GOLF', match: l => l.title === 'M+ Golf' },
  { remote: 'M+ GOLF 2', match: l => l.title === 'M+ Golf 2' },
  { remote: 'M+ VAMOS', match: l => l.title.includes('M+ Vamos') },
  { remote: 'M+ ELLAS', match: l => l.title === 'M+ Ellas Vamos' },
  { remote: 'LA 1', match: l => l.title === 'La 1' },
  { remote: 'LA 2', match: l => l.title === 'La 2' },
  { remote: 'RALLY TV', match: l => l.title === 'Rally TV' },
  { remote: 'TENNIS CHANNEL', match: l => l.title === 'Tennis Channel' },
  { remote: 'LIGA DE CAMPEONES', match: l => l.title.includes('M+ L. de Campeones (') },
  { remote: 'LIGA DE CAMPEONES 2', match: l => l.title.includes('M+ L. de Campeones 2 (') },
  { remote: 'LIGA DE CAMPEONES 3', match: l => l.title.includes('M+ L. de Campeones 3 (') },
  { remote: 'LIGA DE CAMPEONES 4', match: l => l.title.includes('M+ L. de Campeones 4 (') },
  { remote: 'LIGA DE CAMPEONES 5', match: l => l.title.includes('M+ L. de Campeones 5') },
  { remote: 'LIGA DE CAMPEONES 6', match: l => l.title.includes('M+ L. de Campeones 6') },
  { remote: 'LIGA DE CAMPEONES 7', match: l => l.title.includes('M+ L. de Campeones 7') },
  { remote: 'LIGA DE CAMPEONES 8', match: l => l.title.includes('M+ L. de Campeones 8') },
  { remote: 'LIGA DE CAMPEONES 9', match: l => l.title.includes('M+ L. de Campeones 9') },
  { remote: 'LIGA DE CAMPEONES 10', match: l => l.title.includes('M+ L. de Campeones 10') },
  { remote: 'LIGA DE CAMPEONES 11', match: l => l.title.includes('M+ L. de Campeones 11') },
  { remote: 'LIGA DE CAMPEONES 12', match: l => l.title.includes('M+ L. de Campeones 12') },
  { remote: 'PRIMERA FEDERACION', match: l => l.title.includes('Primera Federación') },
  { remote: 'M+ DEPORTES', match: l => l.title.includes('M+ Deportes (OPCIÓN') },
  { remote: 'M+ DEPORTES 2', match: l => l.title.includes('M+ Deportes 2') },
  { remote: 'M+ DEPORTES 3', match: l => l.title.includes('M+ Deportes 3') },
  { remote: 'M+ DEPORTES 4', match: l => l.title.includes('M+ Deportes 4') },
  { remote: 'M+ DEPORTES 5', match: l => l.title.includes('M+ Deportes 5') },
  { remote: 'M+ DEPORTES 6', match: l => l.title.includes('M+ Deportes 6') },
  { remote: 'M+ DEPORTES 7', match: l => l.title.includes('M+ Deportes 7') }
];

// --- FUNCIONES DE PARSEO ---
function parseRemoteList(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const entries = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const name = lines[i];
    const hash = lines[i + 1];
    if (/^[0-9a-f]{40}$/i.test(hash)) {
      entries.push({ name, hash: hash.toLowerCase() });
      i++;
    }
  }
  return entries;
}

function normalizeRemoteName(name) {
  let base = name.replace(/\s*-->\s*.*$/i, '').trim();
  base = base.replace(/\b(FHD|HD|4K|SD)\b/g, '').replace(/\s{2,}/g, ' ').trim().toUpperCase();
  return base;
}

function idFromUrl(url) {
  const m = String(url).match(/acestream:\/\/([0-9a-f]{40})/i);
  return m ? m[1].toLowerCase() : null;
}

function buildRemoteIndex(entries) {
  const idx = new Map();
  for (const e of entries) {
    const key = normalizeRemoteName(e.name);
    if (!idx.has(key)) idx.set(key, []);
    idx.get(key).push(e.hash);
  }
  return idx;
}

// FUNCIÓN CORREGIDA: busca hash específico por nombre y opción
function findHashForOption(remoteIndex, remoteBaseName, opcionNum) {
  // Busca todas las entradas que coincidan con el nombre base
  const matchingEntries = [];
  for (const [key, hashes] of remoteIndex.entries()) {
    if (key.includes(remoteBaseName)) {
      matchingEntries.push(...hashes);
    }
  }
  
  if (matchingEntries.length === 0) return null;
  
  // Si hay múltiples hashes, usa el índice de opción (OPCIÓN 1 = índice 0)
  const idx = Math.max(0, opcionNum - 1);
  return matchingEntries[idx] || matchingEntries[0];
}

// FUNCIÓN CORREGIDA: extrae número de opción del título
function extractOpcionNumber(title) {
  const match = title.match(/OPCIÓN\s+(\d+)/i);
  return match ? parseInt(match[1], 10) : 1;
}

// FUNCIÓN CORREGIDA: actualiza links respetando opciones individuales
function updateLinks(remoteIndex, links) {
  const updated = [...links];
  const cambios = [];
  
  for (const matcher of canalMatchers) {
    const canales = links.filter(matcher.match);
    
    for (const canal of canales) {
      const opcionNum = extractOpcionNumber(canal.title);
      const hashRemoto = findHashForOption(remoteIndex, matcher.remote, opcionNum);
      const actualId = idFromUrl(canal.url);
      
      if (hashRemoto && actualId !== hashRemoto) {
        const canalIndex = updated.findIndex(u => u.title === canal.title);
        if (canalIndex !== -1) {
          updated[canalIndex].url = `acestream://${hashRemoto}`;
          cambios.push({ title: canal.title, from: actualId, to: hashRemoto });
        }
      }
    }
  }
  
  return { updated, cambios };
}

// --- MAIN ---
async function main() {
  try {
    const resp = await fetch(REMOTE_URL);
    const txt = await resp.text();
    const entradas = parseRemoteList(txt);
    const idx = buildRemoteIndex(entradas);
    const { updated, cambios } = updateLinks(idx, linksBase);

    fs.writeFileSync(OUTPUT, JSON.stringify(updated, null, 2), 'utf8');

    let logMsg = `OK. Cambios: ${cambios.length}`;
    if (cambios.length) {
      logMsg += '\n' + cambios.map(c => `- ${c.title}: ${c.from || '(vacío)'} -> ${c.to}`).join('\n');
    }
    log(logMsg);
    console.log(logMsg);
  } catch (e) {
    log('ERROR: ' + e.message);
    console.error(e);
    process.exit(1);
  }
}

main();
