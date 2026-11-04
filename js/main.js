// Entradas al hacer scroll, menú móvil y resaltado por valor. La página funciona sin este archivo.

// Filas del programa y fotos de la galería: se activan una sola vez al entrar en pantalla.
(() => {
  const objetivos = [...document.querySelectorAll('.row, [data-reveal]')];
  if (!('IntersectionObserver' in window)) {
    objetivos.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entradas) => {
      entradas
        .filter((e) => e.isIntersecting)
        .forEach((e, i) => {
          e.target.style.setProperty('--d', `${i * 90}ms`); // escalonado dentro de un mismo lote
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        });
    },
    { threshold: 0.25, rootMargin: '0px 0px -8% 0px' }
  );
  objetivos.forEach((el) => io.observe(el));
})();

(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('menu');

  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  const score = document.getElementById('partitura');
  const chips = [...document.querySelectorAll('.chip')];
  if (!score || !chips.length) return;

  const rows = [...score.querySelectorAll('.row')];
  let pinned = null;

  const highlight = (valor) => {
    if (!valor) {
      delete score.dataset.hl;
      rows.forEach((r) => r.classList.remove('is-hl'));
      return;
    }
    score.dataset.hl = valor;
    rows.forEach((r) => r.classList.toggle('is-hl', r.dataset.v.split(' ').includes(valor)));
  };

  chips.forEach((chip) => {
    const valor = chip.dataset.valor;
    chip.addEventListener('click', () => {
      pinned = pinned === valor ? null : valor;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.valor === pinned)));
      highlight(pinned);
    });
    chip.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') highlight(valor);
    });
    chip.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse') highlight(pinned);
    });
  });
})();
