// Scroll-triggered fade-up animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '-50px' }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Section divider line reveal
const dividerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('divider-visible');
        dividerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.has-divider').forEach(el => dividerObserver.observe(el));

// Service cards: on mobile, pop the single most-centered card
const serviceCards = document.querySelectorAll('.service-card');
const isMobile = () => window.innerWidth < 768;

function updateActiveCard() {
  if (!isMobile()) {
    serviceCards.forEach(card => card.classList.remove('in-view'));
    return;
  }

  let closest = null;
  let closestDist = Infinity;
  const center = window.innerHeight / 2;

  serviceCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.top + rect.height / 2;
    const dist = Math.abs(cardCenter - center);
    if (dist < closestDist) {
      closestDist = dist;
      closest = card;
    }
  });

  serviceCards.forEach(card => {
    card.classList.toggle('in-view', card === closest && closestDist < window.innerHeight * 0.4);
  });
}

window.addEventListener('scroll', updateActiveCard, { passive: true });

// Navbar scroll effect + scroll indicator fade + hero parallax
const navbar = document.querySelector('.navbar');
const scrollIndicator = document.querySelector('.scroll-indicator');
const heroBg = document.querySelector('.hero-bg');
const heroHeight = window.innerHeight;

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  navbar.classList.toggle('scrolled', y > 80);

  if (scrollIndicator) {
    scrollIndicator.style.opacity = y > 100 ? '0' : '1';
  }

  // Parallax: move hero bg at 40% scroll speed (only while hero is visible)
  if (heroBg && y < heroHeight) {
    heroBg.style.transform = `translateY(${y * 0.4}px)`;
  }
}, { passive: true });
