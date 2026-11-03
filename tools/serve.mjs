// Servidor estático para desarrollo local. Uso: npm run dev  (http://localhost:4173)
// Reconstruye css/site.min.css al arrancar y cada vez que cambia un CSS fuente.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCss, SOURCES } from './build-css.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.ics': 'text/calendar; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};
const COMPRESIBLES = new Set(['.html', '.css', '.js', '.json', '.svg', '.ics', '.txt']);

await buildCss();
let timer;
watch(join(ROOT, 'css'), (_e, name) => {
  if (!SOURCES.includes(name)) return;
  clearTimeout(timer);
  timer = setTimeout(() => buildCss().then(() => console.log('css reconstruido')), 80);
});

createServer(async (req, res) => {
  try {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (path.includes('..') || path.includes('FOTOS JORNADA')) throw new Error('prohibido');
    let file = join(ROOT, path);
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const ext = extname(file);
    let body = await readFile(file);
    const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream' };
    headers['Cache-Control'] = path.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache';
    if (COMPRESIBLES.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
      body = gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
    }
    res.writeHead(200, headers);
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('No encontrado');
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
