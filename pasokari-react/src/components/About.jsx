// src/components/About.jsx
import React from 'react';

const About = ({ T }) => {
    return (
        <section id="about" className="section-container about-section">
            <div className="about-container">
                <div className="about-image">
                    <img src="assets/about-image.jpg" alt="Perkebunan Mitra Pasokari" />
                </div>
                <div className="about-text">
                    <h2 className="section-title" data-lang-key="aboutTitle">{T('aboutTitle')}</h2>
                    <p data-lang-key="aboutText1">{T('aboutText1')}</p>
                    <p data-lang-key="aboutText2">{T('aboutText2')}</p>
                </div>
            </div>
        </section>
    );
};

export default About;