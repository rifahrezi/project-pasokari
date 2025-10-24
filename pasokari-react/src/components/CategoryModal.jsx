// src/components/CategoryModal.jsx
import React, { useMemo } from 'react';

// Fungsi helper untuk mendapatkan path gambar produk (dibuat di sini untuk kemudahan)
const getProductImageDetails = (category, productNameID, index, productsDisplay) => {
    const folderName = category.toLowerCase().replace(/[\(\)\/& -]/g, '_').replace(/_+/g, '_');
    const cleanProductNameID = productNameID.toLowerCase().replace(/[\(\)\/]/g, '').replace(/ /g, '_').replace(/,/g, '.');
    const imgName = `${cleanProductNameID}.jpg`;
    const imgPath = `assets/katalog/${folderName}/${imgName}`;
    const displayProductName = productsDisplay[index] || productNameID;
    
    return { imgPath, displayProductName };
};


const CategoryModal = ({ isOpen, onClose, category, categoryData, currentLang, T, openProductDetailModal }) => {
  
  // Tentukan judul, deskripsi, dan daftar produk
  const { titleKey, descKey, productsID, productsDisplay } = useMemo(() => {
    if (!category || !categoryData[category]) return {};
    
    let tKey, dKey;
    if (category === 'Sayuran') { tKey = 'categoryVegetables'; dKey = 'modalSayuranDesc'; }
    else if (category === 'Herbs & Spices') { tKey = 'categoryHerbs'; dKey = 'modalHerbsDesc'; }
    else if (category === 'Buah-buahan') { tKey = 'categoryFruits'; dKey = 'modalBuahDesc'; }
    else if (category === 'Bahan Pangan Lain') { tKey = 'categoryStaples'; dKey = 'modalPanganDesc'; }
    else if (category === 'Frozen Food') { tKey = 'categoryFrozen'; dKey = 'modalFrozenDesc'; }

    return {
      titleKey: tKey,
      descKey: dKey,
      // Default ke 'id' jika terjemahan bahasa saat ini tidak ada
      productsID: categoryData[category].id.products, 
      productsDisplay: categoryData[category][currentLang]?.products || categoryData[category].id.products,
    };
  }, [category, categoryData, currentLang]);

  if (!isOpen || !category) return null;

  return (
    // Gunakan class 'modal' yang sudah diatur di style.css, dan tampilkan/sembunyikan via style
    <div id="categoryModal" className="modal" style={{ display: isOpen ? 'flex' : 'none' }} onClick={(e) => {
        // Tutup jika klik di luar modal-content
        if (e.target.id === 'categoryModal') onClose();
    }}>
      <div className="modal-content category-modal-content">
        <span id="closeModal" className="close-btn" onClick={onClose}>&times;</span>
        <h2 id="modalTitle" data-lang-key={titleKey}>{T(titleKey)}</h2>
        <p id="modalDesc">{T(descKey)}</p>
        <hr className="modal-divider" />
        <h3 data-lang-key="modalProductsTitle">{T('modalProductsTitle')}</h3>
        <div id="modalProductList" className="modal-product-grid">
            {productsID && productsID.map((productNameID, index) => {
                const { imgPath, displayProductName } = getProductImageDetails(category, productNameID, index, productsDisplay);

                return (
                    <div 
                        key={productNameID} 
                        className="modal-product-item"
                        onClick={() => openProductDetailModal({ imgPath, name: displayProductName })}
                    >
                        <img 
                            src={imgPath} 
                            alt={displayProductName} 
                            onError={(e) => {
                                // Fallback jika gambar tidak ditemukan
                                e.target.style.backgroundColor='#eee'; 
                                e.target.src=''; 
                                e.target.alt='Image not found';
                            }}
                        />
                        <p>{displayProductName}</p>
                    </div>
                );
            })}
        </div>
        <a href="#contact" className="cta-button modal-cta" data-lang-key="modalCTA" onClick={onClose}>
            {T('modalCTA')}
        </a>
      </div>
    </div>
  );
};

export default CategoryModal;