// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

// Terima prop isLoggedIn
const Footer = ({ T, isLoggedIn }) => {
    return (
        <footer className="footer">
            <p>
                © 2025 PASOKARI | <span data-lang-key="footerText">{T('footerText')}</span>

                {/* Ganti span teks Admin dengan Link ikon gembok */}
                <span style={{ marginLeft: '20px', borderLeft: '1px solid rgba(255, 255, 255, 0.5)', paddingLeft: '20px' }}>
                    {/* Tautan mengarah ke /admin/products jika sudah login, atau /login jika belum */}
                    <Link
                        to={isLoggedIn ? "/admin/products" : "/login"}
                        title={isLoggedIn ? "Kelola Produk" : "Login Admin"} // Tooltip
                        style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', verticalAlign: 'middle' }}
                    >
                        {/* Ikon Gembok SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '18px', height: '18px' }}>
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </span>
            </p>
        </footer>
    );
};

export default Footer;
