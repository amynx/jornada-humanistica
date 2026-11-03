# VIII Jornada Humanística, Social y Cultural · UNIPAZ

Landing estática de la VIII Jornada Humanística, Social y Cultural de la Escuela de Ingeniería de Producción de UNIPAZ (sábado 7 de noviembre de 2026).

HTML, CSS y JavaScript planos, sin framework. El sistema visual está en [DESIGN.md](DESIGN.md) y el estado de las tareas en [IMPLEMENTATION-PLAN.md](IMPLEMENTATION-PLAN.md).

## Uso local
```
npm install        # una vez (solo para optimizar imágenes)
npm run dev        # http://localhost:4173, reconstruye el CSS al guardar
npm run build      # genera css/site.min.css
npm run optimize   # regenera assets/img desde las fotos originales (no incluidas en el repo)
```

## Despliegue
Cada push a `main` ejecuta `.github/workflows/pages.yml`, que genera el CSS y publica en GitHub Pages solo los archivos que usa la página.

## Cambiar la programación
Editar los `<li class="row">` de `index.html`. `--c1` y `--c2` son las columnas de inicio y fin en unidades de 5 minutos (7:00 = 1, 12:00 = 61), `--c` es el color y `data-v` los valores.
