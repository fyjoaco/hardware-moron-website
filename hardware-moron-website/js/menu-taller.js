// En el celu, tocás las tres rayitas para abrir el menú.
const menu = document.querySelector('.site-nav');
const button = menu.querySelector('button');
function setOpen(open) {
  button.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('open', open);
  button.classList.toggle('collapsed', !open);
}
button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', event => {
  if (event.target.closest('a')) setOpen(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    setOpen(false);
    button.focus();
  }
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
// Acá cambiás cada cuánto pasa la foto (en milisegundos).
const slides = Array.from(document.querySelectorAll('.slides img'));
if (slides.length > 1) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  function syncRotation() {
    clearInterval(timer);
    if (motion.matches || document.hidden) return;
    timer = setInterval(() => {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 6500);
  }
  motion.addEventListener('change', syncRotation);
  document.addEventListener('visibilitychange', syncRotation);
  syncRotation();
}

// Pintamos en el menú la parte que estás mirando.
const links = Array.from(menu.querySelectorAll('#navitems a'));
const onHomepage = Boolean(document.querySelector('.splash'));
function highlight(id) {
  links.forEach(link => {
    if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
if (onHomepage) {
  const sections = Array.from(document.querySelectorAll('main > section[id], footer[id]'));
  const header = document.querySelector('.mast');
  function updateSection() {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      highlight('contact');
      return;
    }
    const top = header.getBoundingClientRect().bottom + 10;
    const current = sections.filter(section => section.getBoundingClientRect().top <= top).pop();
    highlight(current ? current.id : 'index');
  }
  window.addEventListener('scroll', updateSection, {passive:true});
  window.addEventListener('resize', updateSection);
  window.addEventListener('load', updateSection);
  updateSection();
} else {
  highlight('service');
  const observer = new IntersectionObserver(([entry]) => highlight(entry.isIntersecting ? 'contact' : 'service'));
  observer.observe(document.getElementById('contact'));
}
