// ─── Scroll-triggered fade-in animations ───

document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in class to all animatable sections
  const animatable = document.querySelectorAll(
    '.section-kicker, .section-title, .section-desc, ' +
    '.pillar, .step, .qs-step, .arch-pkg, .principle, ' +
    '.terminal, .structure-block, .contrast-col, .contrast-divider, ' +
    '.commands-table-wrap, .arch-diagram'
  );

  animatable.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animatable.forEach(el => observer.observe(el));

  // ─── Nav background on scroll ───

  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll > 50) {
      nav.style.background = 'rgba(10, 10, 15, 0.92)';
    } else {
      nav.style.background = 'rgba(10, 10, 15, 0.75)';
    }
    lastScroll = scroll;
  }, { passive: true });

  // ─── Smooth scroll for anchor links ───

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Copy to clipboard ───

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Fallback for older browsers / non-HTTPS
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Swap icons: clipboard → checkmark
      const copyIcon = btn.querySelector('.copy-icon');
      const checkIcon = btn.querySelector('.check-icon');
      if (copyIcon) copyIcon.style.display = 'none';
      if (checkIcon) checkIcon.style.display = 'block';
      btn.classList.add('copied');

      setTimeout(() => {
        if (copyIcon) copyIcon.style.display = 'block';
        if (checkIcon) checkIcon.style.display = 'none';
        btn.classList.remove('copied');
      }, 2000);
    });
  });
});
