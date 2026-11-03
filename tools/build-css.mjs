// Une y minifica css/tokens.css + base.css + sections.css en css/site.min.css (una sola petición bloqueante).
// Uso: npm run build   ·  Las fuentes se editan en css/*.css; site.min.css es generado.
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const CSS = join(dirname(fileURLToPath(import.meta.url)), '..', 'css');
export const SOURCES = ['tokens.css', 'base.css', 'sections.css'];

export async function buildCss() {
  const parts = await Promise.all(SOURCES.map((f) => readFile(join(CSS, f), 'utf8')));
  const min = parts
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/:\s+/g, ':')
    .replace(/;}/g, '}')
    .trim();
  await writeFile(join(CSS, 'site.min.css'), min);
  return min.length;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('css/site.min.css', ((await buildCss()) / 1024).toFixed(1), 'KB');
}
