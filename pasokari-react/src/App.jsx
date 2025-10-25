// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
// Import 'Navigate' untuk ProtectedRoute
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { translations } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CategoryModal from './components/CategoryModal';
import ProductDetailModal from './components/ProductDetailModal';
import ProductAdmin from './components/ProductAdmin';
import LoginPage from './components/LoginPage'; 

// === KONFIGURASI API BASE URL ===
// Gunakan environment variable (VITE_API_BASE_URL) jika tersedia, 
// atau fallback ke localhost untuk pengembangan.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

// Komponen MainPage Anda (tidak berubah)
const MainPage = ({ T, openCategoryModal, categoryData, allProducts }) => (
  <>
    <Hero T={T} />
    <Products T={T} openCategoryModal={openCategoryModal} categoryData={categoryData} />
    <About T={T} />
    <Contact T={T} />
  </>
);

// Komponen Helper untuk Proteksi Route
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  // === STATE ===
  const [currentLang, setCurrentLang] = useState(document.documentElement.lang || 'id');
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  
  const [currentUser, setCurrentUser] = useState(null); 
  const [isAuthLoading, setIsAuthLoading] = useState(true); 

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // === HANDLERS ===
  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    document.documentElement.lang = lang;
  };

  const T = (key) => {
    return translations[currentLang]?.[key] || translations['id']?.[key] || key;
  };

  const openCategoryModal = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const openProductDetailModal = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const closeProductDetailModal = () => {
    setIsDetailModalOpen(false);
    if (selectedCategory) {
      setIsCategoryModalOpen(true);
    }
  };
  
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  // Handler untuk logout - MENGGUNAKAN API_BASE_URL
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include', 
      });
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      setCurrentUser(null); 
    }
  };

  // === EFFECTS ===
  // Fetch Product Data - MENGGUNAKAN API_BASE_URL
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load product data (Status: ${response.status})`);
        return response.json();
      })
      .then(data => {
        setAllProducts(data);
        setIsLoading(false); 
      })
      .catch(error => {
        console.error("Error Fetching Product Data:", error);
        setIsLoading(false);
      });
    
    document.documentElement.lang = currentLang;
    
    // Logika Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      const handleLoad = () => { preloader.classList.add('hidden'); };
      if (document.readyState === 'complete') { handleLoad(); }
      else { window.addEventListener('load', handleLoad); }
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []); 

  // Effect baru: Cek status login saat App pertama kali dimuat - MENGGUNAKAN API_BASE_URL
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/check_auth`, {
          credentials: 'include', 
        });
        const data = await response.json();
        if (data.isLoggedIn) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Gagal mengecek status auth:", err);
        setCurrentUser(null);
      } finally {
        setIsAuthLoading(false); 
      }
    };
    
    checkAuthStatus();
  }, []); 

  // Body scroll management (tidak berubah)
  useEffect(() => {
    if (isCategoryModalOpen || isDetailModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCategoryModalOpen, isDetailModalOpen]);

  // Reconstruct categoryData (tidak berubah)
  const categoryData = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return {};
    const groupedData = {};
    allProducts.forEach(product => {
      if (!groupedData[product.category]) {
        groupedData[product.category] = { id: { products: [] }, en: { products: [] } };
      }
      groupedData[product.category].id.products.push(product.name_id);
      groupedData[product.category].en.products.push(product.name_en);
    });
    return groupedData;
  }, [allProducts]);

  // === RENDER ===
  if (isLoading || isAuthLoading) {
    return (
      <div className="preloader" style={{ opacity: 1, visibility: 'visible' }}>
        <img src="/assets/logo.png" alt="Loading Logo" className="preloader-icon" />
        <p style={{ marginTop: '20px', color: 'var(--green-primary)' }}>
          {isAuthLoading ? 'Checking session...' : 'Loading Data...'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="preloader">
        <img src="/assets/logo.png" alt="Loading Logo" className="preloader-icon" />
      </div>

      <Navbar 
        currentLang={currentLang} 
        onLangChange={handleLanguageChange} 
        T={T} 
        user={currentUser}
        onLogout={handleLogout}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={<MainPage
                       T={T}
                       openCategoryModal={openCategoryModal}
                       categoryData={categoryData}
                       allProducts={allProducts}
                     />}
          />
          
          <Route
            path="/login"
            element={<LoginPage T={T} onLoginSuccess={handleLoginSuccess} />}
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute user={currentUser}>
                <ProductAdmin T={T} user={currentUser} />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </main>

      <Footer T={T} />

      {/* Modals (tidak berubah) */}
      {selectedCategory && (
        <CategoryModal
          isOpen={isCategoryModalOpen && !isDetailModalOpen}
          onClose={closeCategoryModal}
          category={selectedCategory}
          allProducts={allProducts}
          currentLang={currentLang}
          T={T}
          openProductDetailModal={openProductDetailModal}
        />
      )}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={isDetailModalOpen}
          onClose={closeProductDetailModal}
          product={selectedProduct}
          T={T}
        />
      )}
    </>
  );
}

export default App;