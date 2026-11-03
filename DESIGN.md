# DESIGN.md — VIII Jornada Humanística, Social y Cultural · UNIPAZ

> **Estado: APROBADO e IMPLEMENTADO** (el cliente confirmó el 2026-11-03 y autorizó seguir sin nueva validación).
> Las decisiones marcadas con ✔ están cerradas. Los cambios respecto a la propuesta original están en §13.

---

## 1. Concepto

**"El día en cinco horas, vivido con diez valores."**

La identidad sale de dos cosas reales del material:

1. El logo es una **rueda de diez valores** en seis colores. El cronograma asigna a cada actividad uno de esos valores. Entonces **el color significa un valor**: aparece solo donde hay un valor, no como decoración.
2. El evento es una **mañana con tiempo medido** (7:00 a. m. – 12:00 m.) y actividades en paralelo. Entonces la programación se dibuja como una **partitura del día**, con tipografía y barras sobre un eje de horas.

**El gesto memorable (se gasta aquí, no en otro sitio):** un **VIII construido a medida** en el hero. La V es sólida, en azul institucional. Los tres palos **I I I son ventanas verticales a fotografías reales de ediciones anteriores**. El número de la edición es, literalmente, un acceso al archivo fotográfico de la comunidad.

Todo lo demás es deliberadamente quieto: mucho blanco, tipografía, líneas finas, fotografía sin filtros.

### Por qué esta dirección (y no otra)
- Cubre "editorial académica contemporánea + cultura universitaria": serif de lectura (academia) contra sans condensada pesada (energía deportiva y cultural).
- No repite el afiche de la VII Jornada (todo azul eléctrico, cian, script, cápsulas). Mantiene el azul como ancla de marca, pero lo usa como campo de contraste, no como fondo permanente.
- La paleta sale del logo medido, no de una preferencia previa.
- Evita el patrón "evento": nada de tarjetas repetidas, iconos de relleno, degradados decorativos ni cuenta atrás.

---

## 2. Revisión contra los defaults (qué se descartó)

| Primer impulso | Por qué era genérico | Decisión final |
|---|---|---|
| Hero azul pleno con "VIII" en contorno gigante | Es el afiche de la VII con otra fecha | VIII geométrico con 3 ventanas fotográficas sobre papel claro |
| Fondo crema + serif + acento terracota | Combinación más repetida de páginas generadas | Papel azul-blanco frío (`#F2F4F8`) y tinta azul marino de marca |
| Programa en tarjetas por actividad | Repetición de tarjetas, estética de dashboard | Partitura tipográfica: nombre + barra sobre eje horario, sin cajas |
| Galería en masonry con esquinas redondeadas | Plantilla de portafolio | Ensayo fotográfico con corte recto, dos "ediciones" y pies de foto sobrios |
| Etiquetas en MAYÚSCULAS sobre cada título, `01 / 02 / 03` | Chrome de plantilla; las secciones no son una secuencia | Sin eyebrows. La numeración existe solo donde hay secuencia real: las **horas** |
| Rombo como máscara de todas las fotos | Literal y recorta mal las imágenes | El rombo solo vive en el logo. Las fotos van rectangulares |
| Animaciones de entrada en cada sección | Señal típica de página generada | **Un** momento orquestado: la apertura de las tres ventanas del hero |

---

## 3. Sistema de color ✔ (derivado del logo medido)

Valores medidos por histograma sobre `logo-jornada-humanistica.jpeg`. Dos se ajustaron por accesibilidad (marcados).

### Base
| Rol | Token | Hex | Uso |
|---|---|---|---|
| Principal | `--azul` | `#013390` | Azul institucional. V del hero, campos de contraste, enlaces |
| Secundario | `--azul-profundo` | `#012A7B` | Fondo de la sección oscura |
| Secundario | `--tinta` | `#031D61` | Texto principal (azul marino de marca, no negro) |
| Secundario | `--papel` | `#F2F4F8` | Fondo general (blanco frío con matiz azul) |
| Secundario | `--blanco` | `#FFFFFF` | Texto sobre azul, planos de logo |
| Acentos | `--v-*` | ver tabla siguiente | Un acento por segmento del logo (solo para valores) |

### Color = valor
Cada valor hereda el color del segmento del logo donde vive.

| Segmento del logo | Valores | Token | Hex | Texto sobre la barra |
|---|---|---|---|---|
| Naranja | Pertenencia | `--v-naranja` | `#F16602` | tinta (4.91:1) |
| Amarillo | Diligencia · Imparcialidad · Honestidad | `--v-amarillo` | `#F5B902` | tinta (8.74:1) |
| Magenta | Justicia · Transparencia | `--v-magenta` | `#921275` | blanco (8.19:1) |
| Azul cielo | Respeto · Tolerancia | `--v-cielo` | `#0270B8` ⚠ ajustado desde `#0276BF` | blanco (5.23:1) |
| Verde | Responsabilidad · Compromiso | `--v-verde` | `#2A7D23` ⚠ ajustado desde `#318B2A` | blanco (5.18:1) |

⚠ Los dos ajustes oscurecen ~10 % el tono del logo solo para alcanzar contraste AA con texto blanco. A la vista siguen leyéndose como el color del logo.

**Reglas**
- Los colores de valor **solo** aparecen en barras de programación, el selector de valores y la rueda. Nunca como fondo de sección ni en botones.
- "Los diez valores" (apertura, Bobcamp) se muestra con una barra de seis franjas, en el orden del anillo del logo.
- Sin degradados.

---

## 4. Tipografía ✔ (a confirmar al implementar con prueba visual)

Dos familias, muy distintas, autoalojadas (woff2, subset latín).

| Rol | Familia | Por qué |
|---|---|---|
| Display y titulares | **Archivo** (variable, eje de ancho 62–125, peso 100–900) | Permite una condensada pesada de carácter deportivo, afín al afiche de la VII, sin caer en la fuente "de cartel" por defecto. El eje de ancho da contraste dentro de la misma familia |
| Lectura, pies y textos | **Newsreader** (variable, con cursiva y tamaño óptico) | Serif editorial pensada para lectura, con cursiva expresiva. Resuena con la serif de contraste del wordmark UNIPAZ |

Escala (razón ≈ 1.333, base 18 px para serif):
`12 · 14 · 18 · 24 · 32 · 42 · 56 · 76 · clamp(…, 12vw, 200)` (este último solo para el numeral).

- **Titulares:** Archivo, ancho 62–75, peso 800–900, interlínea 0.92–1.0, tracking −0.01em. Sentence case.
- **Texto:** Newsreader 18/28, máximo ~62 caracteres por línea. Alineado a la izquierda, sin justificar.
- **Horas y datos:** Archivo ancho 100, peso 600, números tabulares.
- **Prohibido:** mayúsculas sostenidas en etiquetas, un solo vocablo resaltado en cursiva o color dentro de un titular, flechas `→` en enlaces.

---

## 5. El VIII ✔ (uso creativo del número)

**VIII construido** en SVG/CSS, no en fuente: así el sistema no depende de la tipografía.

```
 ╲      ╱   ┃┃  ┃┃  ┃┃
  ╲    ╱    ┃┃  ┃┃  ┃┃     V = sólida, --azul
   ╲  ╱     ┃┃  ┃┃  ┃┃     I I I = tres ventanas (fotos)
    ╲╱      ┃┃  ┃┃  ┃┃
```

- Proporciones (sobre altura H): trazo 0.24 H · ancho de V 0.62 H · hueco entre palos 0.08 H. Ancho total ≈ 1.58 H.
- El trazo diagonal de la V tiene el mismo grosor que los palos.
- **Hero:** el VIII ocupa unos 8 de 12 columnas, sangra por el borde inferior y se recorta ligeramente. Cada palo muestra una foto distinta (recorte vertical).
- **Eco discreto:** el mismo sistema, en pequeño y sólido, como sello de edición sobre la galería ("VII", "VI") y como favicon. Sin más repeticiones.
- Referencia al logo: la V es media rombo (V + Λ = el rombo de la rueda). Es un detalle para quien lo vea, no se explica en la página.

**Movimiento:** un solo lenguaje, "algo que se abre", usado donde comunica algo y una sola vez por elemento. Sin parallax ni bucles.

| Dónde | Qué hace | Qué comunica |
|---|---|---|
| Portada | La V baja; luego las tres ventanas se abren de arriba abajo en escalera; al final la cinta de valores se extiende | Presenta el VIII como una pieza que se arma |
| Programa | Cada barra se dibuja de izquierda a derecha al entrar en pantalla, con 90 ms de escalón; el nombre del valor aparece después | El largo de la barra se lee como tiempo transcurrido |
| Galería | Cada foto se abre como una ventana del VIII y la imagen se asienta de 108 % a 100 % | Las fotos son las ventanas del numeral |

Los textos no se animan. Respuestas a una acción (resaltado por valor, botones) usan transiciones de 150 ms.

Con `prefers-reduced-motion` o sin JavaScript todo aparece ya en su estado final.

---

## 6. Lenguaje gráfico

- **Retícula:** 12 columnas, márgenes de 5 vw, canal de 24 px. Composición asimétrica: texto en cols 1–5 o 7–12, nunca centrado.
- **Líneas:** filetes de 1 px en `--tinta` al 25 %. Las líneas verticales de las horas son la única estructura visible.
- **Barras de programación:** rectángulos rectos de 28 px de alto (sin radio). Sin sombras.
- **Plan de lluvia:** barra con contorno discontinuo y relleno claro, más la nota "Solo si llueve". Se distingue sin depender del color.
- **Texturas:** ninguna. Superficies planas, sin grano, trama ni degradados. La textura de la página la ponen las fotografías (arena, follaje, cancha) y el filete fino.
- **Esquinas:** rectas en toda la página. La única forma redondeada es la del logo.
- **Iconografía:** ninguna. Los iconos del logo viven dentro del logo.
- **Numeración:** solo las horas (7 · 8 · 9 · 10 · 11 · 12). Es una secuencia real.

### Logo
- `assets/brand/logo-rueda-valores.png`: recorte con transparencia hecho a partir del JPEG original (flood-fill de fondo + limpieza de sombra). El JPEG original **no se toca**.
- **Uso:** sello pequeño en la cabecera y pieza central de la sección de valores. Nunca recoloreado, deformado ni sobre fondo que le reste contraste (blanco o `--papel`).
- **Distancia mínima:** media altura de un rombo en cada lado.
- `assets/brand/logo-unipaz-eipr-horizontal-lowres.jpg`: logo horizontal UNIPAZ | Escuela de Ingeniería de Producción, extraído del xlsx (591×128 px, fondo blanco). Solo para el footer, hasta 280 px de ancho CSS. Se reemplaza si llega el vector.

---

## 7. Tratamiento fotográfico ✔

- **Fotografía documental real, sin stock.** Fuentes: jornada del 28-sep-2024 (57 fotos, alta resolución) y VII Jornada del 28-mar-2026 (105 fotos, mayormente 1200–1600 px).
- **Color natural.** Sin filtros ni duotono. Los azules de la cancha, el verde del follaje y la arena blanca ya hablan con la paleta.
- **Recortes rectos**, sin máscaras de forma. Relaciones: 3:2, 4:5, y una panorámica 20:9 (las de 4000×1800).
- **Hero:** tres recortes verticales (~0.24) de personas en acción.
- **Pies de foto** en Newsreader cursiva, con fecha de la jornada. Sin numeración.
- **Privacidad:** se evitan primeros planos de personas identificables sin confirmar autorización de uso (ver PROJECT-CONTEXT.md).
- **Optimización:** AVIF + WebP + JPEG fallback, `srcset` a 480/960/1600 px, `loading="lazy"` salvo el hero, `decoding="async"`, dimensiones explícitas.

Preselección (a confirmar en pantalla durante la implementación):

| Uso | Candidatas |
|---|---|
| Hero (recortes verticales) | 2024: `IMG_20240928_081939` (instructor), `…_081921` (rumba), `…_114117` (grupo) |
| Galería 2024 | `…_080555`, `…_081756`, `…_091526`, `…_092015` (puesto de fruta), `…_110616`, `…_111256`, `…_112559`, `…_115724`, `…_120732` |
| Galería VII (2026) | `IMG-20260328-WA0123`/`WA0125` (pasarela llena), `IMG_20260328_100432`/`100447` (panorámica crossfit), `IMG-20260328-WA0100`, `IMG-20260406-WA0036`, `IMG-20260328-WA0060` (ajedrez), `IMG-20260328-WA0062` (tenis de mesa), `IMG_20260328_103359` (medallas) |
| Panorámica de sección | `IMG_20260328_100447` (4000×1800) |

El afiche de la VII (`VII Jornada Humanística - Producción.jpg`) es **referencia**, no material de galería.

---

## 8. Estructura de la landing ✔ (propuesta modificada)

Cambio respecto a la estructura inicial: **se fusionan "Experiencia universitaria" y "Galería"**. No hay texto institucional sobre la experiencia y no se inventa. La dimensión humana la cuentan las fotos, con pies de foto reales.

| # | Sección | Contenido (todo con fuente real) |
|---|---|---|
| 0 | Cabecera mínima | Sello (rueda) + "VIII" pequeño · enlaces: Programa, Valores, Galería, Lugar · "Agregar al calendario" |
| 1 | Hero | VIII construido con 3 ventanas · "Jornada Humanística, Social y Cultural" · lema *Compite, conecta, transforma* · sábado 7 de noviembre de 2026 · 7:00 a. m. – 12:00 m. · Centro de Investigaciones Santa Lucía |
| 2 | Sobre la jornada | Texto compuesto desde el cronograma (ver §10): organiza, qué se vive, valor por actividad, cierre con gratitud |
| 3 | Programación | Partitura 7:00–12:00 · 13 filas · color = valor · plan de lluvia · lista accesible equivalente |
| 4 | Valores | La rueda del logo como leyenda: qué actividad vive cada valor |
| 5 | Galería | Ensayo fotográfico: dos jornadas (28-mar-2026 y 28-sep-2024) con sello de edición |
| 6 | Lugar e información | Fecha, hora, dirección, "Cómo llegar" (enlace a mapa), organiza, con el apoyo de |
| 7 | Footer | Logo horizontal UNIPAZ | Escuela de Ingeniería de Producción · "Vigilada MinEducación" **(solo si se confirma)** |

### Jerarquía
1. VIII + fecha + hora + lugar (qué, cuándo, dónde, en un golpe de vista).
2. Programación (la razón de volver a la página).
3. Valores y galería (identidad).
4. Información práctica y footer.

---

## 9. Wireframes

### Escritorio (≥ 1100 px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ (rueda) VIII    Programa  Valores  Galería  Lugar        Agregar al calendario │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Jornada Humanística,           ╲        ╱  ┃░░┃  ┃░░┃  ┃░░┃            │
│  Social y Cultural               ╲      ╱   ┃░░┃  ┃░░┃  ┃░░┃            │
│                                   ╲    ╱    ┃▒▒┃  ┃▒▒┃  ┃▒▒┃  ← fotos   │
│  Compite, conecta,                ╲  ╱      ┃▒▒┃  ┃▒▒┃  ┃▒▒┃            │
│  transforma.                       ╲╱       ┃▓▓┃  ┃▓▓┃  ┃▓▓┃  (sangra)  │
│                                                                          │
│  Sábado 7 de noviembre de 2026 · 7:00 a. m. – 12:00 m.                   │
│  Centro de Investigaciones Santa Lucía                                   │
├──────────────────────────────────────────────────────────────────────────┤
│ cols 1-4: titular             cols 6-11: texto de lectura (62 car.)      │
│ "Una mañana para …"                                                      │
├──────────────────────────────────────────────────────────────────────────┤
│  7        8        9        10        11        12    ← eje con filetes  │
│  ┊        ┊        ┊         ┊         ┊         ┊                      │
│  Apertura: música en vivo y mensaje  ┊                                  │
│  ▇▇▇▇▇▇▇▇▇▇ (6 franjas = 10 valores) ┊                                 │
│          Rumbaterapia y acondicionamiento físico                         │
│          ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ Respeto                                      │
│          Bobcamp ………………………………………………… (10 valores)              │
│               Talento con propósito …                                    │
│                   Microfútbol · Vóley playa (Honestidad / Imparcialidad) │
│                       Crossfit · Tenis de mesa · Tejo …                  │
│                       ╌╌╌ Plan B ╌╌╌  ╌╌╌ Plan C ╌╌╌  (solo si llueve)   │
│                                                         Premiación ▇     │
│                                                  Asistencia y encuesta ▇ │
├──────────────────────────────────────────────────────────────────────────┤
│ (fondo --azul-profundo)                                                  │
│   rueda del logo (grande, izq.)      lista valor → actividad (der.)      │
├──────────────────────────────────────────────────────────────────────────┤
│ [VII] 28 de marzo de 2026   fotos en retícula asimétrica + 1 panorámica  │
│ [VI?] 28 de septiembre de 2024   fotos en retícula asimétrica            │
├──────────────────────────────────────────────────────────────────────────┤
│ Fecha y hora │ Lugar + dirección + Cómo llegar │ Organiza │ Con el apoyo de │
├──────────────────────────────────────────────────────────────────────────┤
│ logo horizontal  ·  Vigilada MinEducación (si se confirma)               │
└──────────────────────────────────────────────────────────────────────────┘
```

### Móvil (≤ 600 px)

```
┌───────────────────┐
│ (rueda) VIII   ☰  │
├───────────────────┤
│ ╲  ╱ ┃▒┃ ┃▒┃ ┃▒┃  │  VIII a ancho completo,
│  ╲╱  ┃▒┃ ┃▒┃ ┃▒┃  │  alto ~48 svh
│                   │
│ Jornada Humanís-  │
│ tica, Social y    │
│ Cultural          │
│ Sáb 7 nov 2026    │
│ 7:00 – 12:00      │
│ Centro de Invest. │
├───────────────────┤
│ Programa          │   Cambia de partitura a lista:
│ 7:00              │   cada fila = hora de inicio,
│ Apertura          │   nombre, valor y una mini barra
│ ▇▇ 7:00–7:20      │   proporcional (7→12) que conserva
│ 7:30              │   la lectura del tiempo.
│ Rumbaterapia      │
│ ▁▇▇▇▁▁ Respeto    │
│ …                 │
└───────────────────┘
```

### Comportamiento responsive

| Ancho | Hero | Programación | Galería |
|---|---|---|---|
| ≥ 1100 | VIII a 8 col., texto a la izquierda | Partitura horizontal completa | Retícula asimétrica 12 col. |
| 700–1099 | VIII a 10 col., texto debajo | Partitura con tipografía reducida (nombres sobre la barra) | 6 col., 2 filas de ritmo |
| ≤ 699 | VIII a ancho completo, texto debajo | **Lista cronológica** con mini barras | 1–2 col., sin retículas complejas |

---

## 10. Programación: reglas editoriales

**Se muestra:** actividad, horario, valor. **No se muestra:** nombres de docentes o líderes, roles, responsabilidades, recursos, departamentos de apoyo por actividad (decisión del cliente).

Fuente: `Cronograma VIII Jornada Humanistíca - copia.xlsx`.

| Hora | Actividad (texto público propuesto) | Valor | Color |
|---|---|---|---|
| 7:00–7:20 | Apertura con música en vivo (rock colombiano) y mensaje de apertura | Los diez | 6 franjas |
| 7:30–8:30 | Rumbaterapia y acondicionamiento físico | Respeto | cielo |
| 7:30–11:00 | Bobcamp: pista de inmersión práctica en Seguridad y Salud en el Trabajo | Los diez | 6 franjas |
| 8:00–9:00 | Talento con propósito | Compromiso | verde |
| 8:30–11:00 | Microfútbol | Honestidad | amarillo |
| 8:30–11:00 | Vóley playa | Imparcialidad | amarillo |
| 9:00–11:00 | Crossfit | Pertenencia | naranja |
| 9:00–11:00 | Tenis de mesa | Transparencia | magenta |
| 9:00–11:00 | Tejo | Responsabilidad | verde |
| 9:00–11:00 | Plan B, solo si llueve: stop y dominó | Justicia | magenta, discontinua |
| 9:00–11:00 | Plan C, solo si llueve: batalla de barras y ajedrez | Respeto | cielo, discontinua |
| 11:40–12:00 | Momento de premiación | Gratitud | (ver nota) |
| 11:40–12:00 | Asistencia y encuesta por QR | Transparencia | magenta |

Notas editoriales:
- "Apertura" y "Mensaje de apertura" comparten horario (7:00–7:20): se muestran en **una** fila.
- Se omite "(tipo Juegos Olímpicos)", que es una nota interna.
- "Gratitud" **no es** uno de los diez valores del logo. En el cronograma figura como "Momento de gratitud – premiación". Propuesta: barra en `--azul` con la etiqueta "Gratitud".
- Entre 11:00 y 11:40 no hay nada programado. El eje lo muestra como espacio vacío (sin rellenar).
- Tolerancia y Diligencia no tienen actividad asignada: aparecen en la rueda y en la lista de valores como "presentes en la apertura y el Bobcamp" (así figura en el cronograma).
- Corrección de typos: "Humanistíca" → "Humanística"; horas escritas "12.:00" o "11: 40" se normalizan.

### Texto base de "Sobre la jornada" (a revisar por el cliente)

> **Una mañana para competir, conectar y transformar**
>
> La VIII Jornada Humanística, Social y Cultural, organizada por la Escuela de Ingeniería de Producción de UNIPAZ, reúne deporte, música, juegos de mesa y una pista de inmersión práctica en Seguridad y Salud en el Trabajo.
>
> Cada actividad tiene un valor institucional como eje de lo que se vive: respeto, compromiso, honestidad, imparcialidad, pertenencia, transparencia, responsabilidad y justicia. Al final, cada equipo reconoce en público tres aspectos positivos de quienes participaron y destaca el valor de su actividad.

Todas las afirmaciones salen del cronograma. No se afirma quién puede asistir ni cuál es el propósito formal hasta que el cliente lo aporte.

---

## 11. Componentes

| Componente | Descripción | Reutilizado en |
|---|---|---|
| `numeral-viii` | SVG/CSS del VIII con slots de foto | Hero, sello de edición, favicon |
| `score-row` | Fila de programación: nombre + barra + valor, con `--s` (inicio) y `--e` (fin) | Partitura, lista móvil |
| `value-bar` | Barra de color por valor, o 6 franjas | Partitura, leyenda |
| `value-legend` | Rueda + lista valor → actividad, con resaltado al enfocar/pasar | Sección de valores |
| `plate` | Foto + pie en cursiva | Galería |
| `edition-mark` | Numeral romano pequeño + fecha | Galería |
| `fact` | Dato clave (término + valor), sin caja | Hero, información |

**Interacción (responde a una acción del usuario, permitida):** al enfocar o pasar el cursor sobre un valor en la leyenda, se resaltan las barras de ese valor en la partitura y se atenúan las demás. Funciona con teclado y sin JS la lista sigue siendo completa.

---

## 12. Requisitos de calidad (suelo, no negociable)

- Responsive de 360 a 1920 px, sin scroll horizontal.
- Foco de teclado visible (contorno de 3 px en `--azul`, offset 3 px).
- `prefers-reduced-motion` respetado.
- Contraste AA mínimo en todo el texto (ver §3).
- HTML semántico: `header`, `main`, `section` con encabezados, `nav`, `figure`/`figcaption`, la partitura como **lista ordenada** con `<time>`, no como imagen.
- Imágenes con `alt` descriptivo, sin texto decorativo en imagen.
- SEO básico: `title`, `meta description`, Open Graph, `lang="es-CO"`, datos estructurados `Event` (JSON-LD), canonical.
- Presupuesto: HTML + CSS + JS < 60 KB comprimido, hero ≤ 250 KB, LCP < 2.5 s en 4G.

---

## 13. Ajustes durante la implementación

Cambios respecto a lo propuesto, decididos al ver la página real:

| Tema | Propuesta | Implementado | Motivo |
|---|---|---|---|
| Filtro por valor | En la sección Valores | En la **programación** (diez botones sobre la partitura) | Resaltar en el mismo lugar donde está el dato; Valores queda como pieza de identidad |
| Cinta de seis franjas | Solo en las barras de "los diez valores" | También como **filete bajo la portada** y sobre el footer | Motivo de unión entre secciones, con el mismo significado (orden del anillo del logo) |
| Fondo de Valores | Azul profundo | **Blanco** | El logo no debe ir sobre azul (ver §6); el azul profundo pasa a la galería |
| Sección "Sobre la jornada" | Papel | **Azul institucional** con texto blanco | Primer contraste fuerte tras la portada |
| Hero en tablet y móvil | Numeral y luego texto | Igual, con el numeral **sangrando** a ambos lados | Aprovecha el ancho útil |
| Plan de lluvia | Contorno discontinuo y nota | Igual, más muestra de la barra discontinua junto a la nota | Se entiende sin leer el color |
| Espaciado de titulares | Sin especificar | `word-spacing: 0.06em` en Archivo condensada | Las palabras quedaban pegadas |
| Fotos del hero | Recortes de 2024 | Tres recortes 2:5 de la jornada 2024 | Son las de mayor resolución |
| Footer | Con "Vigilada MinEducación" si se confirmaba | **Sin** esa línea | Sin confirmar; ver PROJECT-CONTEXT |
| Movimiento | Una sola animación (portada) | Tres usos de un mismo lenguaje (portada, barras, galería); ver §5 | El cliente pidió animaciones pertinentes; se limitaron a lo que comunica algo |
| Imagen para redes | Sin especificar | `assets/og.jpg` generada desde `tools/og-template.html` | Mismo lenguaje del hero |

### CSS
Fuentes en `css/tokens.css`, `css/base.css` y `css/sections.css`. `css/site.min.css` es **generado** (`npm run build`, o `npm run dev`, que lo reconstruye al guardar). La página carga solo `site.min.css`.
