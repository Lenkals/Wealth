/**
 * Thrivel Wealth — Shared Navigation Script
 * Handles: theme toggle (localStorage persistent), IST clock, mobile menu
 * Include at bottom of <body> on every page.
 * Add anti-flash inline script in <head>:
 *   <script>!function(){var t=localStorage.getItem('tw-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)}();</script>
 */
(function () {
  'use strict';

  const root   = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');

  /* ── Theme: read from localStorage, fall back to system preference ── */
  let theme = localStorage.getItem('tw-theme')
    || root.getAttribute('data-theme')
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  root.setAttribute('data-theme', theme);

  function setIcon(t) {
    if (!toggle) return;
    toggle.innerHTML = t === 'dark'
      ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    toggle.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
  }

  setIcon(theme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      localStorage.setItem('tw-theme', theme); /* persist across all pages */
      setIcon(theme);
    });
  }

  /* ── Live IST clock in nav chip ── */
  function updateNavClock() {
    const now = new Date();
    const ist = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600000);
    const hh  = String(ist.getHours()).padStart(2, '0');
    const mm  = String(ist.getMinutes()).padStart(2, '0');
    const ss  = String(ist.getSeconds()).padStart(2, '0');
    const nc  = document.getElementById('nav-clock');
    if (nc) nc.textContent = hh + ':' + mm + ':' + ss + ' IST';
  }
  updateNavClock();
  setInterval(updateNavClock, 1000);

  /* ── Mobile nav hamburger ── */
  const mobileBtn = document.getElementById('nav-mobile-btn');
  const navLinks  = document.getElementById('nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  /* ── Close mobile nav on outside click ── */
  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('open')) {
      if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    }
  });
})();
