// src/components/Products.jsx
import React from 'react';
import { categoryData } from '../data'; // Menggunakan data lokal sementara

const Products = ({ T, openCategoryModal }) => {
  // Mengambil keys (nama kategori mentah) dari data.js
  const categories = Object.keys(categoryData);

  // Mapping nama kategori mentah (keys) ke translation key
  const categoryKeys = {
    "Sayuran": "categoryVegetables",
    "Herbs & Spices": "categoryHerbs",
    "Buah-buahan": "categoryFruits",
    "Bahan Pangan Lain": "categoryStaples",
    "Frozen Food": "categoryFrozen",
  };
  
  // Fungsi helper untuk mendapatkan path gambar kategori
  const getCategoryImagePath = (category) => {
    // Meniru logika penamaan file yang Anda gunakan
    let fileName = category.toLowerCase().replace(/[\(\)& -]/g, '_').replace(/_+/g, '_').trim();
    // Penanganan khusus untuk Buah-buahan dan Bahan Pangan Lain (sesuai contoh HTML Anda)
    if (category === 'Buah-buahan') fileName = 'buah_buahan';
    if (category === 'Bahan Pangan Lain') fileName = 'bahan_pangan_lain';
    
    return `assets/categories/${fileName}.jpg`;
  };

  return (
    <section id="products" className="section-container">
      <h2 className="section-title" data-lang-key="productsTitle">{T('productsTitle')}</h2>
      <div className="product-grid">
        {categories.map((category) => (
          <div
            key={category}
            className="product-card"
            data-category={category}
            onClick={() => openCategoryModal(category)}
          >
            <img 
                src={getCategoryImagePath(category)} 
                alt={T(categoryKeys[category])} 
                loading="lazy" 
            />
            <h3 data-lang-key={categoryKeys[category]}>{T(categoryKeys[category])}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;