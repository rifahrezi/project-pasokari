// Menunggu seluruh konten halaman (termasuk gambar) dimuat
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  // Tambahkan kelas 'hidden' untuk memicu transisi fade-out
  preloader.classList.add('hidden');
});

// Kode modal dan language switcher Anda (tetap sama dan berfungsi baik)
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.getElementById('closeModal');

const descriptions = {
  "Sayuran": "Pilihan sayuran terbaik dari petani lokal untuk hidangan sehat Anda.",
  "Herbs & Spices": "Ragam bumbu segar yang menambah aroma dan cita rasa alami.",
  "Buah-buahan": "Buah segar penuh vitamin untuk setiap momen.",
  "Bahan Pangan Lain": "Kacang, telur, tahu, dan bahan pokok berkualitas.",
  "Frozen Food": "Solusi cepat untuk hidangan praktis dan lezat."
};

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;
    modalTitle.textContent = category;
    modalDesc.textContent = descriptions[category];
    modal.style.display = 'flex';
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

document.getElementById('langBtn').addEventListener('click', () => {
  const btn = document.getElementById('langBtn');
  const heroH1 = document.querySelector('.hero-content h1');
  const heroP = document.querySelector('.hero-content p');

  if (btn.textContent === 'ID') {
    btn.textContent = 'EN';
    heroH1.textContent = 'Your Trusted Partner for Fresh Vegetables & Fruits';
    heroP.textContent = 'Ensuring premium quality and freshness from local farmers.';
  } else {
    btn.textContent = 'ID';
    heroH1.textContent = 'Mitra Terpercaya Rantai Pasok Sayur & Buah Segar';
    heroP.textContent = 'Menjamin kesegaran dan kualitas premium dari petani lokal terpercaya.';
  }
});

// ==== KODE BARU UNTUK NAVBAR RESPONSIVE ====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  // Toggle kelas 'active' pada menu navigasi untuk memunculkannya
  navLinks.classList.toggle('active');
  
  // Toggle kelas 'open' pada tombol hamburger untuk animasi menjadi 'X'
  menuToggle.classList.toggle('open');
});