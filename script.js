const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

const dlg = document.getElementById('lightbox');
const img = document.getElementById('lightbox-img');
const cap = document.getElementById('lightbox-cap');
const closeBtn = dlg.querySelector('.close');

function openLightbox(src, caption) {
  img.src = src;
  img.alt = caption || '';
  cap.textContent = caption || '';
  try { dlg.showModal(); } catch { dlg.setAttribute('open', 'open'); }
}

function closeLightbox() {
  if (dlg.open && dlg.close) dlg.close();
  dlg.removeAttribute('open');
  img.src = '';
}

closeBtn.addEventListener('click', closeLightbox);
dlg.addEventListener('click', (e) => {
  const rect = dlg.getBoundingClientRect();
  const inside = e.clientY >= rect.top && e.clientY <= rect.bottom && e.clientX >= rect.left && e.clientX <= rect.right;
  if (!inside) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

document.querySelectorAll('figure.card').forEach(fig => {
  const imgEl = fig.querySelector('img');
  const caption = fig.querySelector('figcaption')?.innerText || '';
  const full = imgEl?.dataset.full || imgEl?.src;
  fig.addEventListener('click', () => openLightbox(full, caption));
  fig.addEventListener('keypress', (e) => { if (e.key === 'Enter') openLightbox(full, caption); });
});

const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaMotion.matches) {
  document.documentElement.style.setProperty('--shadow', 'none');
}
