document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){ navigation.classList.remove('is-open'); menu.setAttribute('aria-expanded','false'); }
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true'; menu.setAttribute('aria-expanded',String(open)); navigation.classList.toggle('is-open',open);});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
const select=document.querySelector('#interest');
const contact=document.querySelector('#contact-whatsapp');
const messages={
 general:'Hola, quiero conocer Punto y Trama. ¿Me orientan sobre sus propuestas?',
 birthday:'Hola, me interesa organizar un cumpleaños artístico en Punto y Trama. ¿Me cuentan las propuestas y qué incluyen?',
 workshops:'Hola, me interesa Cerámica & Vino en Punto y Trama. ¿Me cuentan sobre el próximo encuentro?'
};
function updateContact(){const value=select.value; const message=messages[value] || `Hola, me interesa el taller de ${value} en Punto y Trama. ¿Me cuentan sobre los grupos y cómo coordinar la primera clase gratuita?`;contact.href='https://wa.me/5491154906108?text='+encodeURIComponent(message);}
select.addEventListener('change',updateContact);updateContact();

// Animate on entry without ever hiding content or changing its layout.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const entranceAnimations = new Set();
function animateEntrance(element, delay = 0) {
  if (reducedMotion.matches || !element.animate) return;
  const isPhoto = element.matches('figure, .photo-pair, .art-stage');
  const base = getComputedStyle(element).transform;
  const rest = base === 'none' ? '' : base;
  const side = element.matches('.ceramics-print, .birthday-grid figure') ? -1 : 1;
  const start = isPhoto
    ? `translate(${side * 18}px, 30px) rotate(${side * 1.8}deg) scale(.975) ${rest}`
    : `translateY(24px) ${rest}`;
  const animation = element.animate([
    { opacity: .68, transform: start },
    { opacity: 1, transform: `translate(0, 0) rotate(0) scale(1) ${rest}` }
  ], { duration: isPhoto ? 950 : 720, delay, easing: 'cubic-bezier(.16,1,.3,1)' });
  entranceAnimations.add(animation);
  animation.finished.finally(() => entranceAnimations.delete(animation)).catch(() => {});
}
if ('IntersectionObserver' in window && Element.prototype.animate) {
  const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
      observer.unobserve(entry.target);
      animateEntrance(entry.target, Math.min(index * 85, 255));
    });
  }, { threshold: .15 });
  document.querySelectorAll('.section-lead > h2, .section-lead > p, .journal-photo, .workshop-row, .learning-grid > div, .team-heading, .person, .birthday-grid > *, .workshop-teaser > *, .event-grid > *, .contact-grid > *').forEach(element => {
    if (element.getBoundingClientRect().top >= window.innerHeight * .85) observer.observe(element);
  });
  document.querySelectorAll('.hero h1, .hero .intro, .hero-actions, .art-stage').forEach((element, index) => animateEntrance(element, index * 100));
  reducedMotion.addEventListener('change', event => {
    if (event.matches) entranceAnimations.forEach(animation => animation.cancel());
  });
}
