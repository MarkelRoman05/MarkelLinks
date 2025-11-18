import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');

const LOG_DIR = path.join(PROJECT_ROOT, 'logs');
const LINKS_PATH = path.join(PROJECT_ROOT, 'src/assets/links.json');
const REMOTE_URLS = [
  'https://itsssl.com/zWurW',
  'https://ipfs.io/ipns/k2k4r8oqlcjxsritt5mczkcn4mmvcmymbqw7113fz2flkrerfwfps004/data/listas/lista_fuera_iptv.m3u',
  'https://bit.ly/lista-ipfs-iptv'
];

// Asegurar que existe el directorio logs para el resumen
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

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
    // Movistar Acción
    .replace(/^M\+\s*ACCI[ÓO]N/i, 'M+ ACCIÓN')
    .replace(/^MOVISTAR\s*ACCI[ÓO]N/i, 'M+ ACCIÓN')
    // Movistar Cine Español
    .replace(/^M\+\s*CINE\s*ESPA[ÑN]OL/i, 'M+ CINE ESPAÑOL')
    .replace(/^MOVISTAR\s*CINE\s*ESPA[ÑN]OL/i, 'M+ CINE ESPAÑOL')
    // Movistar Clásicos
    .replace(/^M\+\s*CL[ÁA]SICOS/i, 'M+ CLÁSICOS')
    .replace(/^MOVISTAR\s*CL[ÁA]SICOS/i, 'M+ CLÁSICOS')
    // Movistar Comedia
    .replace(/^M\+\s*COMEDIA/i, 'M+ COMEDIA')
    .replace(/^MOVISTAR\s*COMEDIA/i, 'M+ COMEDIA')
    // Movistar Documentales
    .replace(/^M\+\s*DOCUMENTALES/i, 'M+ DOCUMENTALES')
    .replace(/^MOVISTAR\s*DOCUMENTALES/i, 'M+ DOCUMENTALES')
    // Movistar Drama
    .replace(/^M\+\s*DRAMA/i, 'M+ DRAMA')
    .replace(/^MOVISTAR\s*DRAMA/i, 'M+ DRAMA')
    // Movistar Estrenos
    .replace(/^M\+\s*ESTRENOS/i, 'M+ ESTRENOS')
    .replace(/^MOVISTAR\s*ESTRENOS/i, 'M+ ESTRENOS')
    // Movistar Originales
    .replace(/^M\+\s*ORIGINALES/i, 'M+ ORIGINALES')
    .replace(/^MOVISTAR\s*ORIGINALES/i, 'M+ ORIGINALES')
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
  const lines = text.split(/\r?\n/).map(l => l.trim());
  const entries = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Buscar líneas que comiencen con #EXTINF
    if (line.startsWith('#EXTINF')) {
      // Extraer el nombre del canal (después de la última coma)
      const lastCommaIndex = line.lastIndexOf(',');
      if (lastCommaIndex === -1) continue;
      
      const name = line.substring(lastCommaIndex + 1).trim();
      if (!name) continue;
      
      // La siguiente línea no vacía debe contener el hash de acestream
      let hashLine = '';
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].trim() !== '') {
          hashLine = lines[j].trim();
          i = j; // Avanzar el índice principal
          break;
        }
      }
      
      // Extraer el hash del formato acestream://HASH
      const aceMatch = hashLine.match(/acestream:\/\/([0-9a-f]{40})/i);
      if (aceMatch) {
        const hash = aceMatch[1].toLowerCase();
        entries.push({ name, hash });
      }
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
    console.log('Iniciando actualización de links...');
    
    const links = JSON.parse(fs.readFileSync(LINKS_PATH, 'utf8'));
    console.log(`Links locales cargados: ${links.length} items`);
    
    const TIMEOUT_MS = 60000; // Aumentado a 60 segundos para IPFS
    const MAX_RETRIES = 7;
    let resp = null;
    let lastError = null;
    let wait_time_ms = 2000;
    let currentUrlIndex = 0;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const currentUrl = REMOTE_URLS[currentUrlIndex];
        
        if (attempt > 1) {
          console.log(`Reintento ${attempt}/${MAX_RETRIES}...`);
        }
        console.log(`Fetching remote URL [${currentUrlIndex + 1}/${REMOTE_URLS.length}]: ${currentUrl}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
        
        // FIX: No duplicar el cache buster
        const cacheBuster = `?t=${Date.now()}`;
        const url = currentUrl + cacheBuster;
        
        resp = await fetch(url, { 
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; MarkelLinks/1.0)',
          },
        });
        clearTimeout(timeoutId);
        
        console.log(`Fetch status: ${resp.status} ${resp.statusText}`);
        
        // Reintentar en casos específicos
        if (resp.status === 504 || resp.status === 502 || resp.status === 503 || resp.status === 429) {
          lastError = new Error(`HTTP ${resp.status} - ${resp.statusText} (respuesta temporal de gateway)`);
          console.log(`✗ Error temporal: ${lastError.message}`);
          
          // Cambiar a la siguiente URL alternativa si hay error 504
          if (resp.status === 504 && currentUrlIndex < REMOTE_URLS.length - 1) {
            currentUrlIndex++;
            console.log(`Cambiando a URL alternativa [${currentUrlIndex + 1}/${REMOTE_URLS.length}]...`);
            wait_time_ms = 2000; // Resetear el tiempo de espera al cambiar de URL
          }
          // Continuar al siguiente reintento
        } else if (resp.ok) {
          break; // Éxito, salir del bucle
        } else {
          lastError = new Error(`HTTP error! status: ${resp.status}`);
          console.log(`✗ Error: ${lastError.message}`);
        }
      } catch (err) {
        lastError = err;
        const errorMsg = err.name === 'AbortError' ? 'Timeout (60s)' : err.message;
        console.log(`✗ Error: ${errorMsg}`);
        
        // Cambiar a la siguiente URL alternativa en caso de timeout u otro error
        if (currentUrlIndex < REMOTE_URLS.length - 1) {
          currentUrlIndex++;
          console.log(`Cambiando a URL alternativa [${currentUrlIndex + 1}/${REMOTE_URLS.length}]...`);
          wait_time_ms = 2000; // Resetear el tiempo de espera al cambiar de URL
        }
      }
      
      // Esperar antes del siguiente intento (excepto en el último)
      if (attempt < MAX_RETRIES && (!resp || !resp.ok)) {
        const waitSeconds = wait_time_ms / 1000;
        console.log(`Esperando ${waitSeconds}s antes del siguiente intento...`);
        await new Promise(resolve => setTimeout(resolve, wait_time_ms));
        wait_time_ms = Math.min(wait_time_ms * 2, 15000); // Máximo 15 segundos de espera
      }
    }
    
    if (!resp || !resp.ok) {
      const errorMsg = lastError 
        ? `Falló después de ${MAX_RETRIES} intentos con todas las URLs. Último error: ${lastError.message}` 
        : 'No se pudo conectar a ningún servidor';
      throw new Error(errorMsg);
    }
    
    const txt = await resp.text();
    console.log(`Texto remoto descargado: ${txt.length} caracteres`);
    
    // Advertencia si el texto parece demasiado pequeño
    if (txt.length < 25000) {
      console.warn(`[WARN] El texto descargado parece incompleto (${txt.length} caracteres). Puede ser una versión en caché desactualizada.`);
    }
    
    const entries = parseRemoteList(txt);
    console.log(`Entries parseadas: ${entries.length} (válidas)`);
    
    const remoteBuckets = buildRemoteBuckets(entries);
    console.log(`Buckets remotos creados: ${remoteBuckets.size}`);
    
    // Advertencia si hay muy pocos buckets
    if (remoteBuckets.size < 200) {
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
    console.log(resumen);

    // Escribe el resumen simple del run para GitHub Actions
    try { fs.writeFileSync('logs/summary.txt', resumen, 'utf8'); } catch { }

    // Sólo escribe si hay cambios reales
    if (oldContent.trim() !== newContent.trim()) {
      fs.writeFileSync(LINKS_PATH, newContent, 'utf8');
      console.log('Archivo links.json actualizado correctamente');
    } else {
      console.log('Sin cambios en el contenido del archivo');
    }
  } catch (e) {
    if (e.name === 'AbortError') {
      console.error('ERROR: Timeout al intentar descargar los links remotos (60s)');
    } else {
      console.error('ERROR:', e.message);
      console.error(e.stack);
    }
    process.exit(1);
  }
}

main();