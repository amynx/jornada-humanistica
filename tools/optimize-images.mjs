// Genera las imágenes publicables a partir de los originales en "FOTOS JORNADA HUMANISTICA/".
// Los originales no se modifican. Salida: assets/img/*.{avif,webp,jpg} (sin metadatos EXIF).
// Uso: npm run optimize
import sharp from 'sharp';
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'FOTOS JORNADA HUMANISTICA');
const OUT = join(ROOT, 'assets', 'img');
const A24 = join(SRC, 'EVIDENCIA FOTOGRÁFICA SÁBADO 28 DE SEPT');
const M26 = join(SRC, '3. Registro fotográfico');

// Recortes verticales del hero: relación 2:5, centrados en fx (0 a 1 del ancho).
const HERO = [
  { id: 'hero-1', file: join(A24, 'IMG_20240928_081921.jpg'), fx: 0.78 },
  { id: 'hero-2', file: join(A24, 'IMG_20240928_115724.jpg'), fx: 0.3 },
  { id: 'hero-3', file: join(A24, 'IMG_20240928_081939.jpg'), fx: 0.5 },
];

// Galería: se conserva la proporción original.
const GALLERY = [
  // VII Jornada, 28 de marzo de 2026
  { id: 'vii-pasarela', file: join(M26, 'IMG-20260328-WA0123.jpg') },
  { id: 'vii-crossfit', file: join(M26, 'IMG_20260328_100447.jpg') },
  { id: 'vii-cancha', file: join(M26, 'IMG-20260406-WA0049.jpg') },
  { id: 'vii-sabiduria', file: join(M26, 'IMG-20260328-WA0056.jpg') },
  { id: 'vii-auditorio', file: join(M26, 'IMG-20260328-WA0107.jpg') },
  { id: 'vii-voley', file: join(M26, 'IMG_20260328_103509.jpg') },
  { id: 'vii-medallas', file: join(M26, 'IMG_20260328_103359.jpg') },
  // Jornada del 28 de septiembre de 2024
  { id: 'a24-llegada', file: join(A24, 'IMG_20240928_080555.jpg') },
  { id: 'a24-arena', file: join(A24, 'IMG_20240928_081756.jpg') },
  { id: 'a24-cancha', file: join(A24, 'IMG_20240928_091526.jpg') },
  { id: 'a24-frutas', file: join(A24, 'IMG_20240928_092015.jpg') },
  { id: 'a24-barras', file: join(A24, 'IMG_20240928_111256.jpg') },
  { id: 'a24-baile', file: join(A24, 'IMG_20240928_115724.jpg') },
  { id: 'a24-voley', file: join(A24, 'WhatsApp Image 2024-10-01 at 2.40.42 PM.jpeg') },
];

const WIDTHS = [480, 960, 1600];
const exists = (p) => access(p).then(() => true, () => false);
const manifest = {};
const ONLY = process.argv[2]; // 'hero' | 'gallery' | undefined

async function emit(id, pipeline, widths, fallbackWidth, q = { avif: 48, webp: 72, jpeg: 76 }) {
  const meta = await pipeline.clone().metadata();
  manifest[id] = {};
  for (const w of widths) {
    const img = pipeline.clone().resize({ width: w, withoutEnlargement: true });
    const { width, height } = await img.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info);
    await img.clone().avif({ quality: q.avif, effort: 5 }).toFile(join(OUT, `${id}-${w}.avif`));
    await img.clone().webp({ quality: q.webp }).toFile(join(OUT, `${id}-${w}.webp`));
    if (w === fallbackWidth) await img.clone().jpeg({ quality: q.jpeg, mozjpeg: true }).toFile(join(OUT, `${id}-${w}.jpg`));
    manifest[id][w] = { width, height };
  }
  return meta;
}

await mkdir(OUT, { recursive: true });

for (const h of ONLY === 'gallery' ? [] : HERO) {
  if (!(await exists(h.file))) throw new Error(`No existe: ${h.file}`);
  const { data, info } = await sharp(h.file).rotate().toBuffer({ resolveWithObject: true });
  const cw = Math.min(info.width, Math.round(info.height * 0.4));
  const left = Math.max(0, Math.min(info.width - cw, Math.round(h.fx * info.width - cw / 2)));
  const cropped = sharp(data).extract({ left, top: 0, width: cw, height: info.height });
  await emit(h.id, cropped, [160, 320, 560], 560, { avif: 36, webp: 58, jpeg: 62 });
  console.log('hero', h.id, `${cw}x${info.height}`);
}

for (const g of ONLY === 'hero' ? [] : GALLERY) {
  if (!(await exists(g.file))) throw new Error(`No existe: ${g.file}`);
  const { data } = await sharp(g.file).rotate().toBuffer({ resolveWithObject: true });
  await emit(g.id, sharp(data), WIDTHS, 960);
  console.log('galería', g.id, JSON.stringify(manifest[g.id]));
}

if (!ONLY) await writeFile(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('listo →', OUT);
