// src/components/CategoryModal.jsx
import React, { useMemo } from 'react';

// Helper function to get image path (can be moved to a utils file)
const getProductImageDetails = (category, productNameID, productNameEN) => {
    const folderName = category.toLowerCase().replace(/[\(\)\/& -]/g, '_').replace(/_+/g, '_');
    const cleanProductNameID = productNameID.toLowerCase().replace(/[\(\)\/]/g, '').replace(/ /g, '_').replace(/,/g, '.');
    const imgName = `${cleanProductNameID}.jpg`;
    const imgPath = `/assets/katalog/${folderName}/${imgName}`; // Absolute path from public
    const displayProductName = productNameEN || productNameID; // Display EN, fallback to ID

    return { imgPath, displayProductName };
};

// Component receives 'allProducts' and the selected 'category' name
const CategoryModal = ({ isOpen, onClose, category, allProducts, currentLang, T, openProductDetailModal }) => {

  // Determine title and description keys based on the selected 'category'
  const { titleKey, descKey } = useMemo(() => {
    if (!category) return {};
    let tKey, dKey;
    if (category === 'Sayuran') { tKey = 'categoryVegetables'; dKey = 'modalSayuranDesc'; }
    else if (category === 'Herbs & Spices') { tKey = 'categoryHerbs'; dKey = 'modalHerbsDesc'; }
    else if (category === 'Buah-buahan') { tKey = 'categoryFruits'; dKey = 'modalBuahDesc'; }
    else if (category === 'Bahan Pangan Lain') { tKey = 'categoryStaples'; dKey = 'modalPanganDesc'; }
    else if (category === 'Frozen Food') { tKey = 'categoryFrozen'; dKey = 'modalFrozenDesc'; }
    return { titleKey: tKey, descKey: dKey };
  }, [category]);

  // Filter products FROM 'allProducts' based on the selected 'category'
  const productsInCategory = useMemo(() => {
    if (!allProducts || !category) return [];
    return allProducts.filter(product => product.category === category);
  }, [allProducts, category]);


  if (!isOpen || !category) return null; // Don't render if not open or no category selected

  return (
    <div id="categoryModal" className="modal" style={{ display: isOpen ? 'flex' : 'none' }} onClick={(e) => {
        // Close if backdrop is clicked
        if (e.target.id === 'categoryModal') onClose();
    }}>
      <div className="modal-content category-modal-content">
        <span id="closeModal" className="close-btn" onClick={onClose}>&times;</span>
        <h2 id="modalTitle" data-lang-key={titleKey}>{T(titleKey)}</h2>
        <p id="modalDesc">{T(descKey)}</p>
        <hr className="modal-divider" />
        <h3 data-lang-key="modalProductsTitle">{T('modalProductsTitle')}</h3>
        <div id="modalProductList" className="modal-product-grid">
            {/* Loop through the filtered 'productsInCategory' */}
            {productsInCategory.length === 0 ? (
                <p style={{ fontStyle: 'italic', color: '#888', gridColumn: '1 / -1' }}>Tidak ada produk dalam kategori ini.</p> // Span across grid if empty
            ) : (
                productsInCategory.map((product) => {
                    // Determine display name based on current language
                    const displayName = currentLang === 'en' ? product.name_en : product.name_id;
                    const { imgPath } = getProductImageDetails(product.category, product.name_id, product.name_en);

                    return (
                        <div
                            key={product.id} // Use unique ID from database
                            className="modal-product-item"
                            onClick={() => openProductDetailModal({ imgPath, name: displayName })}
                        >
                            <img
                                src={imgPath}
                                alt={displayName}
                                onError={(e) => { // Image fallback
                                    e.target.style.backgroundColor='#eee';
                                    e.target.src='';
                                    e.target.alt='Image not found';
                                }}
                            />
                            {/* Display name based on language */}
                            <p>{displayName}</p>
                        </div>
                    );
                })
            )}
        </div>
        {/* CTA Button */}
        <a href="#contact" className="cta-button modal-cta" data-lang-key="modalCTA" onClick={onClose}>
            {T('modalCTA')}
        </a>
      </div>
    </div>
  );
};

export default CategoryModal;