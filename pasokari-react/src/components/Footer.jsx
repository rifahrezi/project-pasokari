// src/components/Footer.jsx
import React from 'react';

const Footer = ({ T }) => {
    return (
        <footer className="footer">
            <p>© 2025 PASOKARI | <span data-lang-key="footerText">{T('footerText')}</span></p>
        </footer>
    );
};

export default Footer;