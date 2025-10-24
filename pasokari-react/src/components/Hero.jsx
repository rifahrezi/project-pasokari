// src/components/Hero.jsx
import React from 'react';

const Hero = ({ T }) => {
    return (
        <section id="home" className="hero-section">
            <div className="hero-content">
                <h1 data-lang-key="heroTitle">{T('heroTitle')}</h1>
                <p data-lang-key="heroSubtitle">{T('heroSubtitle')}</p>
                <a href="#products" className="cta-button" data-lang-key="heroCTA">
                    {T('heroCTA')}
                </a>
            </div>
        </section>
    );
};

export default Hero;