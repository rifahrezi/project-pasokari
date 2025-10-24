// src/components/ProductDetailModal.jsx
import React from 'react';

const ProductDetailModal = ({ isOpen, onClose, product, T }) => {

    if (!isOpen || !product) return null;

    // Fungsi untuk menutup modal detail dan kembali ke modal kategori
    const handleClose = () => {
        onClose(); // Menutup modal detail
        // Catatan: Logika untuk membuka kembali modal kategori harus ada di App.jsx
    };

    return (
        <div id="productDetailModal" className="modal product-detail-modal" style={{ display: isOpen ? 'flex' : 'none' }} onClick={(e) => {
            // Tutup jika klik di luar modal-content
            if (e.target.id === 'productDetailModal') handleClose();
        }}>
            <div className="modal-content product-detail-content">
                <span id="productDetailClose" className="close-btn" onClick={handleClose}>&times;</span>
                <img 
                    src={product.imgPath} 
                    alt={product.name} 
                    id="productDetailImage"
                    onError={(e) => {
                        e.target.style.backgroundColor='#eee'; 
                        e.target.src=''; 
                        e.target.alt='Image not found';
                    }}
                />
                <h3 id="productDetailTitle">{product.name}</h3>
                <a href="#contact" className="cta-button modal-cta" data-lang-key="productDetailCTA" onClick={handleClose}>
                    {T('productDetailCTA')}
                </a>
            </div>
        </div>
    );
};

export default ProductDetailModal;