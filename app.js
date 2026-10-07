const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = String(new Date().getFullYear());

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
let motionPaused = false;
motionButton.addEventListener('click', () => {
  motionPaused = !motionPaused;
  document.body.classList.toggle('motion-paused', motionPaused);
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.textContent = motionPaused ? 'Resume motion' : 'Pause motion';
});
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); revealObserver.unobserve(entry.target); }
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('is-pending');
      revealObserver.observe(element);
    }
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) document.querySelectorAll('.is-pending').forEach(element => element.classList.remove('is-pending'));
  });
}

const video = document.querySelector('#dex-video');
const showVideoError = () => { document.querySelector('#video-error').hidden = false; };
video.addEventListener('error', showVideoError);
video.querySelector('source').addEventListener('error', showVideoError);

const canvas = document.querySelector('#stars');
const context = canvas.getContext('2d');
if (context) {
  let width = 0, height = 0, frame = null, visible = true, particles = [];
  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * ratio; canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({ length: width < 700 ? 32 : 70 }, () => ({ x: width * (.35 + Math.random() * .65), y: Math.random() * height, r: .5 + Math.random() * 1.3, speed: .08 + Math.random() * .2, alpha: .15 + Math.random() * .5 }));
    draw(false);
  }
  function draw(move) {
    context.clearRect(0, 0, width, height);
    for (const p of particles) {
      if (move) { p.y -= p.speed; if (p.y < 0) p.y = height; }
      context.beginPath(); context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      context.fillStyle = `rgba(71,174,255,${p.alpha})`; context.fill();
    }
  }
  function animate() { frame = null; if (!visible || motionPaused || reducedMotion.matches || document.hidden) return; draw(true); frame = requestAnimationFrame(animate); }
  function sync() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    if (!motionPaused && !reducedMotion.matches && visible && !document.hidden) frame = requestAnimationFrame(animate);
    else draw(false);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  motionButton.addEventListener('click', sync);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }).observe(canvas);
  sync();
}
