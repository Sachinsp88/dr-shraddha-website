// Mobile nav toggle
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
if (nav && navToggle) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Stats counter on intersection
const counters = document.querySelectorAll('.stat-number');
let counted = false;
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting && !counted){
      counted = true;
      counters.forEach(el=>{
        const target = +el.getAttribute('data-target');
        let n = 0;
        const duration = 1200;
        const step = Math.max(1, Math.floor(target / (duration / 16)));
        const tick = ()=>{
          n += step;
          if (n >= target){ el.textContent = target.toLocaleString(); }
          else { el.textContent = n.toLocaleString(); requestAnimationFrame(tick); }
        };
        requestAnimationFrame(tick);
      });
    }
  });
}, {threshold:.3});
document.querySelectorAll('#stats').forEach(s => observer.observe(s));

// Simple slider
const slides = document.querySelector('.slides');
const slideEls = document.querySelectorAll('.slide');
let index = 0;
function show(i){
  index = (i + slideEls.length) % slideEls.length;
  slides.style.transform = `translateX(-${index*100}%)`;
  slides.style.transition = 'transform .4s ease';
}
document.querySelector('.slider .prev')?.addEventListener('click', ()=>show(index-1));
document.querySelector('.slider .next')?.addEventListener('click', ()=>show(index+1));
setInterval(()=> show(index+1), 6000);
