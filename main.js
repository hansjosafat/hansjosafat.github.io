const tabs = document.querySelectorAll('.tab');
const projects = document.querySelectorAll('.project');
const dividers = document.querySelectorAll('.gif-divider');
const backToTop = document.getElementById('back-to-top');
const aboutSection = document.getElementById('about-section');

function switchTab(activeTab) {
  const target = activeTab.dataset.tab;

  tabs.forEach(t => t.classList.toggle('active', t === activeTab));

  // about section is only visible on its own tab
  aboutSection.hidden = target !== 'about';

  projects.forEach(p => { p.hidden = p.dataset.tab !== target; });

  const matchingDividers = [...dividers].filter(d => d.dataset.tab === target);
  dividers.forEach(d => { d.hidden = true; });
  matchingDividers.forEach((d, i) => {
    d.hidden = i === matchingDividers.length - 1;
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab));
});

// category buttons jump to that tab
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = [...tabs].find(t => t.dataset.tab === btn.dataset.goto);
    if (targetTab) switchTab(targetTab);
  });
});

switchTab(document.querySelector('.tab.active'));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// set copyright year dynamically
document.getElementById('year').textContent = new Date().getFullYear();

// YouTube facade: swap thumbnail for live iframe on click
document.querySelectorAll('.yt-facade').forEach(facade => {
  facade.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${facade.dataset.vid}?autoplay=1`;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    facade.innerHTML = '';
    facade.appendChild(iframe);
    facade.classList.remove('yt-facade');
  }, { once: true });
});
