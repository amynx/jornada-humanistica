# IMPLEMENTATION-PLAN.md

Estado de tareas. Leyenda: ✅ hecho · 🔶 en curso / pendiente de aprobación · ⬜ por hacer.

## Fases del proceso
| Fase | Estado |
|---|---|
| 1. Exploración | ✅ Entregada y respondida por el cliente |
| 2. Dirección artística | ✅ `DESIGN.md` §1–7 |
| 3. Diseño y arquitectura | ✅ `DESIGN.md` §8–12 y esta página |
| 4. Validación | ✅ Aprobada por el cliente el 2026-11-03 |
| 5. Implementación | ✅ Completa (ver tareas) |
| 6. Evaluación | ✅ Realizada (ver resultados) |

## Arquitectura técnica propuesta

Proyecto vacío, así que no hay tecnología previa que respetar. Propuesta: **HTML, CSS y JS planos, sin framework ni paso de compilación para la página**.

```
jornada-humanistica/
├── index.html
├── css/
│   ├── tokens.css        variables: color, tipografía, espaciado
│   ├── base.css          reset, tipografía, foco, accesibilidad
│   └── sections.css      hero, programa, valores, galería, información, footer
├── js/main.js            resaltado por valor, "Agregar al calendario", menú móvil (~2 KB)
├── data/jornada-viii.ics se genera una vez: sábado 7-nov-2026, 7:00–12:00, America/Bogotá
├── assets/
│   ├── brand/            logos (ya creados)
│   ├── img/              fotos optimizadas (AVIF/WebP/JPEG) ← generadas
│   └── fonts/            Archivo y Newsreader, woff2, subset latín
├── tools/optimize-images.mjs   (sharp, solo devDependency; lee de FOTOS JORNADA HUMANISTICA/)
├── package.json          scripts: optimize, dev
├── FOTOS JORNADA HUMANISTICA/  originales (NO se publican, ~1.4 GB; en .gitignore)
├── DESIGN.md · PROJECT-CONTEXT.md · IMPLEMENTATION-PLAN.md
```

- **Sin dependencias en producción.** `sharp` solo se usa localmente para generar imágenes.
- **Programación escrita a mano en HTML** como lista ordenada con `<time>`. Cada fila lleva `--s` y `--e` (horas en decimal) y `data-valor`, y el CSS calcula posición y ancho. Funciona sin JS y es indexable.
- **Despliegue:** carpeta estática lista para cualquier hosting (GitHub Pages, Netlify, Cloudflare Pages o servidor propio). Solo se publica lo que `index.html` referencia: nunca `FOTOS JORNADA HUMANISTICA/`.
- Los videos (≈ 780 MB) **no se usan** en la primera versión: pesan demasiado y no están pedidos.

## Tareas de la Fase 5

| # | Tarea | Estado |
|---|---|---|
| 5.1 | `package.json`, `.gitignore`, estructura de carpetas | ✅ |
| 5.2 | Fuentes Archivo y Newsreader en woff2 (subset latín) autoalojadas | ✅ |
| 5.3 | Script de optimización: 3 recortes de hero y 14 fotos de galería en AVIF, WebP y JPEG | ✅ `npm run optimize` |
| 5.4 | Logo recortado optimizado (WebP 96/480/960 y PNG 480) | ✅ |
| 5.5 | Tokens, base y accesibilidad (foco, contraste, reduced-motion) | ✅ |
| 5.6 | Numeral VIII con ventanas fotográficas y animación de apertura | ✅ |
| 5.7 | Sección "Sobre la jornada" | ✅ |
| 5.8 | Partitura (escritorio y tablet) y lista cronológica con mini barras (móvil) | ✅ |
| 5.9 | Valores con la rueda y resaltado por valor (en la programación) | ✅ |
| 5.10 | Galería: dos jornadas, retícula asimétrica, pies de foto | ✅ |
| 5.11 | Información, enlace a mapa y footer | ✅ |
| 5.12 | `.ics`, favicon (VIII), Open Graph, JSON-LD `Event`, `robots.txt`, `_headers` | ✅ (sin `sitemap.xml`: requiere dominio) |

### Cambios de arquitectura respecto al plan
- **CSS unido y minificado** en `css/site.min.css` (`tools/build-css.mjs`) para tener una sola petición bloqueante. Subió el rendimiento móvil de 68 a 97.
- `tools/serve.mjs` sirve con gzip y caché, y reconstruye el CSS al guardar.
- `tools/og-template.html` es la plantilla de la imagen para redes. Se abre a 1200×630 y se guarda como `assets/og.jpg`.
- Se podaron las variantes de imagen no usadas (`assets/img` pesa 12.7 MB en disco; cada visitante descarga solo las que necesita).

### Operación
```
npm install        # una vez
npm run dev        # http://localhost:4173, reconstruye el CSS al guardar
npm run optimize   # regenera assets/img desde "FOTOS JORNADA HUMANISTICA/"
npm run build      # genera css/site.min.css
```
Para **cambiar la programación**, editar los `<li class="row">` de `index.html`: `--c1` y `--c2` son las columnas de inicio y fin en unidades de 5 minutos (7:00 = 1, 12:00 = 61), `--c` es el color y `data-v` los valores.

## Fase 6: resultados

Evaluación hecha en navegador (Chromium) con capturas en 1920, 1440, 1024, 820 y 390 px.

| Prueba | Resultado |
|---|---|
| Lighthouse escritorio | Rendimiento 100 · Accesibilidad 100 · Buenas prácticas 100 · SEO 100 |
| Lighthouse móvil (CPU ×4, 4G lenta) | Rendimiento **97** · Accesibilidad 100 · Buenas prácticas 100 · SEO 100. LCP 2.5 s, CLS 0, TBT 0 ms |
| axe-core (WCAG 2.1 AA y buenas prácticas) | 0 violaciones en escritorio y móvil |
| Scroll horizontal | Ninguno en ningún ancho probado |
| Errores de consola o peticiones fallidas | Ninguno |
| Teclado | Foco visible de 3 px en todos los controles; menú móvil con Escape |
| `prefers-reduced-motion` | Las ventanas del hero aparecen abiertas de inmediato |
| Sin JavaScript | La programación, los textos y el calendario siguen disponibles |
| Nombres de docentes o responsables en el HTML | Ninguno |
| Referencias a `FOTOS JORNADA HUMANISTICA/` | Ninguna (el servidor local la bloquea) |
| Carga inicial en escritorio (sin scroll) | ≈ 400 KB en 11 peticiones |

Problemas encontrados y corregidos durante la evaluación: fotos del hero que solo llenaban la mitad (elemento `picture` en línea), fecha grande que se partía en tres líneas, texto del hero desalineado en 1920 px, `<dl>` inválido según axe, chips de valores en dos líneas, mini barras demasiado finas en móvil y rendimiento móvil de 68 por CSS encadenado e imágenes del hero sobredimensionadas.

Checklist original (referencia):
- Servidor local, capturas en 1440, 1024, 768 y 390 px; revisión visual de jerarquía, tipografía, espaciado, composición, legibilidad, imágenes, navegación.
- Lighthouse (rendimiento, accesibilidad, SEO, buenas prácticas) con objetivo ≥ 95 en todos.
- Prueba de teclado completa y de `prefers-reduced-motion`.
- Verificación de que no hay scroll horizontal y de que ningún nombre de docente o responsable aparece en el HTML.
- Verificación de que `FOTOS JORNADA HUMANISTICA/` no está referenciada por la página.
- Corrección de lo que falle y registro en este documento.

## Pendiente antes de publicar
| # | Tarea | Quién |
|---|---|---|
| 1 | Poner la URL pública en `og:image` (hoy es relativa y las redes la necesitan absoluta) y añadir `og:url` y `canonical` | Equipo, cuando haya dominio |
| 2 | Confirmar "Investigaciones" (plural) en el nombre del lugar | Cliente |
| 3 | Confirmar autorización de las personas que aparecen en las fotos | Cliente |
| 4 | Confirmar si el rótulo de la jornada de 2024 lleva número de edición | Cliente |
| 5 | Decidir sobre GREIP, "Vigilada MinEducación" y enlace de inscripción | Cliente |
| 6 | Sustituir el logo horizontal de baja resolución por el vector, si existe | Cliente |
| 7 | Configurar en el hosting el caché de `assets/` (ver `_headers`) y la compresión | Equipo |

## Riesgos
| Riesgo | Mitigación |
|---|---|
| Plazo de cuatro días | Estructura sin compilación; entregar un MVP completo y pulir después |
| Fotos de baja resolución en la VII | Usarlas a tamaño pequeño o medio; las grandes (hero, panorámica) salen de 2024 y de las 4000×1800 |
| Logo recortado desde JPEG | Se usa a tamaños moderados sobre blanco o `--papel`. Cambiar por el vector si aparece |
| Barras cortas (20 min) sin espacio para texto | El nombre cuelga hacia el espacio libre; se prueba en las capturas |
| Gente identificable en fotos | Pendiente de autorización del cliente (PROJECT-CONTEXT #3) |
