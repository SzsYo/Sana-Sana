// ============================================================
// SANA SANA — main.js
// Scroll reveal, nav activa por sección, verificación de edad
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 2. Nav vertical: sección activa ---------- */
  const tracks = document.querySelectorAll('.sidenav__track[data-target]');
  const sections = Array.from(tracks)
    .map(t => document.getElementById(t.getAttribute('data-target')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window){
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const track = document.querySelector(`.sidenav__track[data-target="${id}"]`);
        if (!track) return;
        if (entry.isIntersecting){
          tracks.forEach(t => t.classList.remove('is-active'));
          track.classList.add('is-active');
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(sec => navIO.observe(sec));
  }

  /* ---------- 3. Gate de verificación de edad ---------- */
  const gate = document.getElementById('age-gate');
  if (gate){
    const already = sessionStorage.getItem('zl_age_ok');
    if (already === 'yes'){
      gate.remove();
    } else {
      document.body.style.overflow = 'hidden';
      const yes = gate.querySelector('[data-age-yes]');
      const no = gate.querySelector('[data-age-no]');

      yes?.addEventListener('click', () => {
        sessionStorage.setItem('zl_age_ok', 'yes');
        gate.classList.add('is-leaving');
        document.body.style.overflow = '';
        setTimeout(() => gate.remove(), 500);
      });

      no?.addEventListener('click', () => {
        window.location.href = 'https://www.who.int/';
      });
    }
  }

  /* ---------- 4. Header de scroll compacto (opcional, si existe) ---------- */
  const hero = document.querySelector('.hero');
  if (hero){
    const onScroll = () => {
      const ring = document.querySelector('.sidenav__ring');
      if (!ring) return;
      const y = window.scrollY;
      const scale = Math.min(1 + y / 4000, 1.15);
      ring.style.transform = `scale(${scale})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

});
