// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- Import useNavigate

const Navbar = ({ currentLang, onLangChange, T, isLoggedIn, onLogout, currentUserEmail }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const navigate = useNavigate(); // <-- Dapatkan fungsi navigate

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false); // Fungsi baru untuk menutup menu

    const toggleLangDropdown = (e) => {
        e.stopPropagation();
        setIsLangDropdownOpen(!isLangDropdownOpen);
    };

    const handleLangClick = (lang) => {
        onLangChange(lang);
        setIsLangDropdownOpen(false);
    };

    // Definisikan Link Navigasi (tetap sama)
    const navLinks = [
        { path: '/', key: 'navHome', label: T('navHome') },
        { path: '/#products', key: 'navProducts', label: T('navProducts'), isHashLink: true }, // Tautan Produk
        { path: '/#about', key: 'navAbout', label: T('navAbout'), isHashLink: true },      // Tautan Tentang
        { path: '/#contact', key: 'navContact', label: T('navContact'), isHashLink: true },
    ];

    // Handler BARU untuk hash link (smooth scroll)
    const handleHashLinkClick = (hash) => {
        closeMenu(); // Tutup menu mobile
        const targetId = hash.substring(hash.indexOf('#') + 1); // Ambil ID ('products', 'about', 'contact')

        // Jika sudah di halaman utama, scroll langsung
        if (window.location.pathname === '/') {
            const element = document.getElementById(targetId);
            if (element) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                // Hitung posisi elemen relatif terhadap viewport, lalu tambahkan scroll Y saat ini
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Element with ID "${targetId}" not found on the current page.`);
            }
        } else {
            // Jika TIDAK di halaman utama, navigasi ke halaman utama DULU,
            // lalu scroll SETELAH halaman dimuat
            navigate('/'); // Navigasi ke '/'
            // Gunakan timeout kecil untuk memberi waktu React merender elemen target
            setTimeout(() => {
                const element = document.getElementById(targetId);
                 if (element) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navbarHeight;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                 } else {
                     console.warn(`Element with ID "${targetId}" not found after navigating home.`);
                 }
            }, 100); // Waktu tunggu 100ms
        }
    };


    return (
        <header className="navbar">
            <div className="nav-left">
                {/* Gunakan Link untuk logo */}
                <Link to="/" className="logo-container" onClick={closeMenu}>
                    <img src="/assets/logo.png" alt="Pasokari Logo" className="logo" />
                    <span className="brand-name">PASOKARI</span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="nav-center">
                 {navLinks.map(link => (
                    link.isHashLink ? (
                        // Gunakan <a> tapi panggil handler JavaScript
                        <a key={link.key} href={link.path} onClick={(e) => {e.preventDefault(); handleHashLinkClick(link.path);}}>
                            {link.label}
                        </a>
                    ) : (
                        // Gunakan Link untuk navigasi normal
                        <Link key={link.key} to={link.path}>
                            {link.label}
                        </Link>
                    )
                ))}
                {/* Tampilkan link ke Admin jika sudah login */}
                {isLoggedIn && (
                    <Link to="/admin/products" style={{ color: 'orange', fontWeight: 'bold' }}>
                        Kelola Produk
                    </Link>
                )}
            </nav>

            <div className="nav-right">
                {/* Language Switcher */}
                <div className="language-switcher">
                     <button className="lang-btn" onClick={toggleLangDropdown}>
                        {/* Ganti dengan ikon SVG asli Anda */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="globe-icon"><path d="M10 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 3zM10 8.5a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75zM9.25 7.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM12.25 7.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM15.25 7.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM6.25 7.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 11.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM12 11.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM15 11.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM6 11.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" /></svg>
                        <span id="currentLangText">{currentLang.toUpperCase()}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="caret-icon"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                    </button>
                    <div className={`lang-dropdown ${isLangDropdownOpen ? 'active' : ''}`} id="langDropdown"> {/* Tambahkan ID jika belum ada */}
                        <a href="#" className="lang-option" data-lang="id" onClick={(e) => { e.preventDefault(); handleLangClick('id'); }}><span className="flag-icon">🇮🇩</span> Indonesia</a>
                        <a href="#" className="lang-option" data-lang="en" onClick={(e) => { e.preventDefault(); handleLangClick('en'); }}><span className="flag-icon">🇺🇸</span> English</a>
                    </div>
                </div>

                {/* Tampilkan Email & Tombol Logout jika login */}
                {isLoggedIn && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px' }}>
                         <span style={{ fontSize: '0.8em', color: '#555' }}>{currentUserEmail}</span>
                         <button onClick={onLogout} className='lang-btn' style={{ padding: '6px 10px', backgroundColor: '#e74c3c' }}>Logout</button>
                    </div>
                 )}

                {/* Mobile Menu Toggle */}
                <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} id="menuToggle" onClick={toggleMenu}> {/* Tambahkan ID jika belum ada */}
                    <span></span><span></span><span></span>
                </button>
            </div>

            {/* Mobile Navigation */}
            <nav className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
                {navLinks.map(link => (
                     link.isHashLink ? (
                        <a key={link.key} href={link.path} onClick={(e) => {e.preventDefault(); handleHashLinkClick(link.path);}}>
                            {link.label}
                        </a>
                     ) : (
                        <Link key={link.key} to={link.path} onClick={closeMenu}> {/* Tutup menu saat klik Link biasa */}
                            {link.label}
                        </Link>
                     )
                ))}
                 {/* Tampilkan link Admin & Logout di mobile jika login */}
                 {isLoggedIn && (
                    <>
                        <Link to="/admin/products" onClick={closeMenu} style={{ color: 'orange', fontWeight: 'bold' }}>
                            Kelola Produk
                        </Link>
                        <button onClick={() => { onLogout(); closeMenu(); }} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: '1.2rem', padding: '1rem 0', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </>
                 )}
            </nav>
        </header>
    );
};

export default Navbar;

