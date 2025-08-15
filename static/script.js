// nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navClose = document.getElementById('navClose');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', function(){
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open? 'true':'false');
  navMenu.setAttribute('aria-hidden', open? 'false':'true');
});
navClose && navClose.addEventListener('click', ()=>{ navMenu.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); navMenu.setAttribute('aria-hidden','true'); });

// Close menu on link click and scroll to section
navLinks.forEach(a=> a.addEventListener('click', (e)=>{
  e.preventDefault();
  const id = a.getAttribute('href').slice(1);
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
  navMenu.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); navMenu.setAttribute('aria-hidden','true');
}));

// Highlight active link on scroll
const sections = document.querySelectorAll('.page-section');
function onScroll(){
  const y = window.scrollY + 120;
  sections.forEach(sec=>{
    const top = sec.offsetTop;
    const h = sec.offsetHeight;
    const id = sec.id;
    const link = document.querySelector('.nav-link[href="#'+id+'"]');
    if(y >= top && y < top + h){ link && link.classList.add('active'); } else { link && link.classList.remove('active'); }
  });
}
window.addEventListener('scroll', onScroll);
onScroll();

// Home slideshow (use .active class for fade)
(function(){
  const slides = document.querySelectorAll('.hero-bg #homeSlides .slide');
  let i=0;
  if(slides.length===0) return;
  slides.forEach((s,idx)=> s.classList.toggle('active', idx===0));
  setInterval(()=>{
    slides[i].classList.remove('active');
    i = (i+1) % slides.length;
    slides[i].classList.add('active');
  }, 3500);
})();

// Gallery image modal
// In-place zoom for gallery images
// Modal for gallery images: show on long press, close on release
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
let pressTimer = null;

function showModal(src, caption) {
  modalImg.src = src;
  modalCaption.textContent = caption || '';
  modal.style.display = 'flex';
}
function hideModal() {
  modal.style.display = 'none';
  modalImg.src = '';
  modalCaption.textContent = '';
}

document.querySelectorAll('.photo-inner[data-img]').forEach(function(el){
  // Mouse events
  el.addEventListener('mousedown', function(e){
    e.preventDefault();
    pressTimer = setTimeout(function(){
      showModal(el.getAttribute('data-img'), el.getAttribute('data-caption'));
    }, 400); // 400ms long press
  });
  el.addEventListener('mouseup', function(e){
    clearTimeout(pressTimer);
    hideModal();
  });
  el.addEventListener('mouseleave', function(e){
    clearTimeout(pressTimer);
    hideModal();
  });
  // Touch events
  el.addEventListener('touchstart', function(e){
    pressTimer = setTimeout(function(){
      showModal(el.getAttribute('data-img'), el.getAttribute('data-caption'));
    }, 400);
  });
  el.addEventListener('touchend', function(e){
    clearTimeout(pressTimer);
    hideModal();
  });
  el.addEventListener('touchcancel', function(e){
    clearTimeout(pressTimer);
    hideModal();
  });
});

// Simple contact form handler (sends to local Flask endpoint if available)
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formMsg.textContent = 'Sending...';
  const data = new FormData(form);
  try {
    const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(data)), headers: {'Content-Type':'application/json'} });
    if(res.ok) { formMsg.textContent = 'Message sent — thank you!'; form.reset(); }
    else { formMsg.textContent = 'Failed to send message.'; }
  } catch (err) {
    formMsg.textContent = 'No server — this demo only simulates sending.';
  }
});
