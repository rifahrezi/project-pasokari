// src/components/Navbar.jsx
import React, { useState } from 'react';

const Navbar = ({ currentLang, onLangChange, T }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleLangDropdown = (e) => {
        e.stopPropagation();
        setIsLangDropdownOpen(!isLangDropdownOpen);
    };

    const handleLangClick = (lang) => {
        onLangChange(lang);
        setIsLangDropdownOpen(false);
    };

    const navLinks = [
        { id: 'home', key: 'navHome' },
        { id: 'products', key: 'navProducts' },
        { id: 'about', key: 'navAbout' },
        { id: 'contact', key: 'navContact' },
    ];

    return (
        <header className="navbar">
            <div className="nav-left">
                <a href="#home" className="logo-container" onClick={() => {
                    // Smooth scroll to top for logo
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsMenuOpen(false);
                }}>
                    <img src="assets/logo.png" alt="Pasokari Logo" className="logo" />
                    <span className="brand-name">PASOKARI</span>
                </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="nav-center">
                {navLinks.map(link => (
                    <a key={link.id} href={`#${link.id}`} data-lang-key={link.key}>
                        {T(link.key)}
                    </a>
                ))}
            </nav>

            <div className="nav-right">
                {/* Language Switcher */}
                <div className="language-switcher">
                    <button className="lang-btn" onClick={toggleLangDropdown}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="globe-icon"><path d="M10 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 3zM10 8.5a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75zM9.25 7.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM12.25 7.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM15.25 7.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM6.25 7.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 11.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM12 11.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM15 11.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM6 11.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" /></svg>
                        <span id="currentLangText">{currentLang.toUpperCase()}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="caret-icon"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                    </button>
                    <div className={`lang-dropdown ${isLangDropdownOpen ? 'active' : ''}`}>
                        <a href="#" className="lang-option" data-lang="id" onClick={() => handleLangClick('id')}><span className="flag-icon">🇮🇩</span> Indonesia</a>
                        <a href="#" className="lang-option" data-lang="en" onClick={() => handleLangClick('en')}><span className="flag-icon">🇺🇸</span> English</a>
                    </div>
                </div>
                
                {/* Mobile Menu Toggle */}
                <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span></span><span></span><span></span>
                </button>
            </div>
            
            {/* Mobile Navigation */}
            <nav className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
                {navLinks.map(link => (
                    <a key={link.id} href={`#${link.id}`} onClick={toggleMenu} data-lang-key={link.key}>
                        {T(link.key)}
                    </a>
                ))}
            </nav>
        </header>
    );
};

export default Navbar;