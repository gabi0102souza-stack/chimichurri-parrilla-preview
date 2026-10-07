const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#nav');
function closeNav() {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) closeNav();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeNav();
    toggle.focus();
  }
});
const desktop = window.matchMedia('(min-width: 761px)');
desktop.addEventListener('change', closeNav);
