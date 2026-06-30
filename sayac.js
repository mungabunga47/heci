const $ = (name) => document.querySelector(name);

const openModal = [
{ transform: "scaleY(0) scaleX(0)" },
{ transform: "scaleY(1) scaleX(0.01)", offset: 0.3, easing: "ease-in" },
{ transform: "scaleX(0.01)", offset: 0.3, easing: "ease-out" },
{ transform: "scaleX(1)", offset: 1 }
];

const openModalSettings = {
duration: 1000,
iterations: 1,
easing: "ease-out",
fill: "both"
};

document.addEventListener('DOMContentLoaded', () => {
const panel = document.getElementById('sayac-panel');
const overlay = document.getElementById('sayac-overlay');
const link = document.getElementById('counter-link');
const counterEl = document.getElementById('modal-counter');
const sayacZiyaretci = document.getElementById('sayac-ziyaretci');

panel.classList.remove('open');
panel.hidden = false;
overlay.hidden = true;

link.addEventListener('click', (e) => {
e.preventDefault();
panel.style.display = 'block';
overlay.hidden = false;
panel.animate(openModal, openModalSettings).onfinish = () => {
panel.classList.add('open');
};
});

overlay.addEventListener('click', () => {
panel.classList.remove('open');
overlay.hidden = true;
});

window.addEventListener('keydown', (e) => {
if (e.key === 'Escape' && panel.classList.contains('open')) {
panel.classList.remove('open');
overlay.hidden = true;
}
});

fetch('counter.php')
.then(res => res.json())
.then(data => {
const count = data.count;
counterEl.textContent = count;
sayacZiyaretci.textContent = `Ziyaretçi Sayısı: ${count}`;
})
.catch(() => {
counterEl.textContent = '0';
sayacZiyaretci.textContent = 'Ziyaretçi Sayısı:';
});
});

document.addEventListener('DOMContentLoaded', () => {
const panel = document.getElementById('sayac-panel');
const overlay = document.getElementById('sayac-overlay'); // varsa
const link = document.getElementById('counter-link');

if (overlay) overlay.hidden = true;
panel.classList.remove('open');
panel.hidden = false;

link.addEventListener('click', (e) => {
e.preventDefault();
panel.classList.add('open');
if (overlay) overlay.hidden = false;
});


const closeIfOutside = (e) => {
if (!panel.classList.contains('open')) return;
if (overlay && (e.target === overlay || !panel.contains(e.target))) {
panel.classList.remove('open');
if (overlay) overlay.hidden = true;
}
};

document.addEventListener('mousedown', closeIfOutside);
if (overlay) overlay.addEventListener('mousedown', closeIfOutside);


window.addEventListener('keydown', (e) => {
if (e.key === 'Escape' && panel.classList.contains('open')) {
panel.classList.remove('open');
if (overlay) overlay.hidden = true;
}
});
});