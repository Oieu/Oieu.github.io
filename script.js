'use strict';

// Keep the footer current without requiring an edit every year.
document.getElementById('year').textContent = new Date().getFullYear();

// Clipboard access can be unavailable when opened directly as a local file.
const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
copyButton.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('nunezaoieu@gmail.com');
    copyStatus.textContent = 'Email address copied.';
  } catch {
    copyStatus.textContent = 'Select and copy nunezaoieu@gmail.com, or click the address to email me.';
  }
});

// Project details use native HTML, so they also work without JavaScript.
// Indicate the current section in the navigation as the reader scrolls.
const navigation = [...document.querySelectorAll('nav a')];
if ('IntersectionObserver' in window) {
  const visible = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    }
    const active = navigation.find(link => visible.has(link.hash.slice(1)));
    navigation.forEach(link => {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-10% 0px -35% 0px', threshold: 0 });
  document.querySelectorAll('#experience, #work, #about, #contact').forEach(section => observer.observe(section));
}
