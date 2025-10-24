// src/App.jsx
import React, { useState, useEffect } from 'react';
import { categoryData, translations } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CategoryModal from './components/CategoryModal';
import ProductDetailModal from './components/ProductDetailModal';

function App() {
  // === STATE MANAGEMENT ===
  const [currentLang, setCurrentLang] = useState(document.documentElement.lang || 'id');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // === HANDLER FUNCTIONS ===
  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    document.documentElement.lang = lang;
  };
  
  // Fungsi Translate sederhana untuk React
  const T = (key) => {
    return translations[currentLang]?.[key] || translations['id']?.[key] || key;
  };

  // Logika Modal
  const openCategoryModal = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
    document.body.style.overflow = 'hidden'; // Nonaktifkan scroll
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    document.body.style.overflow = 'auto'; // Aktifkan scroll
  };
  
  const openProductDetailModal = (product) => {
      setSelectedProduct(product);
      setIsDetailModalOpen(true);
      // NOTE: Kita TIDAK menutup CategoryModal di sini,
      // karena kita ingin ketika ProductDetailModal ditutup, CategoryModal muncul lagi.
  };

  const closeProductDetailModal = () => {
      setIsDetailModalOpen(false);
      // Aktifkan kembali modal kategori setelah modal detail ditutup
      if (selectedCategory) {
          setIsCategoryModalOpen(true); 
      }
  };


  // === EFFECT HOOKS ===

  // Efek untuk Preloader (hanya pada load pertama)
  useEffect(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      // Tunggu hingga seluruh halaman dimuat (simulasi window.onload)
      const handleLoad = () => {
        preloader.classList.add('hidden');
      };
      // Jika halaman sudah dimuat (React sudah terpasang) segera sembunyikan
      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        // Cleanup event listener
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, []); // Hanya berjalan saat mount

  // Efek untuk menangani body scroll saat modal aktif/nonaktif
  useEffect(() => {
    if (isCategoryModalOpen || isDetailModalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    // Tambahan: Menonaktifkan scroll saat salah satu modal terbuka
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [isCategoryModalOpen, isDetailModalOpen]);


  return (
    <>
      {/* Preloader tetap di root untuk transisi CSS */}
      <div className="preloader">
        <img src="assets/logo.png" alt="Loading Logo" className="preloader-icon" />
      </div>

      <Navbar currentLang={currentLang} onLangChange={handleLanguageChange} T={T} />

      <main>
        <Hero T={T} />
        <Products T={T} openCategoryModal={openCategoryModal} />
        <About T={T} />
        <Contact T={T} />
      </main>

      <Footer T={T} />

      {/* MODAL KATEGORI */}
      {selectedCategory && (
        <CategoryModal
          isOpen={isCategoryModalOpen && !isDetailModalOpen} // Tampilkan hanya jika detail TIDAK terbuka
          onClose={closeCategoryModal}
          category={selectedCategory}
          categoryData={categoryData} // Menggunakan data lokal di fase ini
          currentLang={currentLang}
          T={T}
          openProductDetailModal={openProductDetailModal}
        />
      )}
      
      {/* MODAL DETAIL PRODUK */}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={isDetailModalOpen}
          onClose={closeProductDetailModal} // Akan membuka kembali modal kategori
          product={selectedProduct}
          T={T}
        />
      )}
    </>
  );
}

export default App;