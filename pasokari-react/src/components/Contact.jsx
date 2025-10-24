// src/components/Contact.jsx

import React, { useState } from 'react'; // PASTIKAN useState di-IMPORT!

const Contact = ({ T }) => {
    // STATE UNTUK MENGELOLA FEEDBACK KEPADA PENGGUNA
    const [status, setStatus] = useState(''); 
    
    // FUNGSI INI HARUS BERADA DI DALAM SCOPE KOMPONEN SEBELUM RETURN
    const handleSubmit = async (e) => {
        e.preventDefault(); // MENGHENTIKAN PENGIRIMAN FORMULIR HTML (MEMUTUSKAN DARI FORMSPREE)
        
        // Mencegah double click
        if (status === 'Mengirim...') return; 
        
        setStatus('Mengirim...');

        const form = e.target;
        const data = {
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            message: form.message.value,
        };
        
        // URL API Flask yang baru dibuat (Pastikan server Flask berjalan di port 5000)
        const API_URL = 'http://127.0.0.1:5000/api/inquiry'; 

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.ok) {
                // Sukses (Status 200 dari Flask)
                setStatus(T('formSuccessMessage') || 'Pesan berhasil dikirim!'); 
                form.reset(); // Kosongkan formulir setelah sukses
            } else {
                // Gagal (Status 4xx atau 5xx dari Flask)
                setStatus(T('formErrorMessage') || `Gagal mengirim: ${responseData.message || 'Server error'}`);
            }
        } catch (error) {
            // Gagal (Masalah jaringan atau server Flask mati)
            console.error('Network Error:', error);
            setStatus(T('formNetworkError') || 'Koneksi gagal. Server Backend mungkin tidak berjalan.');
        }
    };

    return (
        <section id="contact" className="section-container contact-section">
            <h2 className="section-title" data-lang-key="contactTitle">{T('contactTitle')}</h2>
            <p className="contact-subtitle" data-lang-key="contactSubtitle">{T('contactSubtitle')}</p>
            <div className="contact-layout-grid">
                
                {/* Bagian Contact Info (Kiri) */}
                <div className="contact-info">
                    <h3 data-lang-key="contactInfoTitle">{T('contactInfoTitle')}</h3>
                    <div className="info-block">
                        <strong data-lang-key="contactAddressTitle">{T('contactAddressTitle')}</strong>
                        <p dangerouslySetInnerHTML={{ __html: T('contactAddressText') }}></p> 
                    </div>
                    <div className="info-block">
                        <strong data-lang-key="contactEmailTitle">{T('contactEmailTitle')}</strong>
                        <p><a href="mailto:sipasokari@gmail.com">sipasokari@gmail.com</a></p>
                    </div>
                    <div className="info-block">
                        <strong data-lang-key="contactSocialTitle">{T('contactSocialTitle')}</strong>
                        <div className="contact-social-icons">
                            <a href="https://wa.me/628111289655" target="_blank" aria-label="WhatsApp"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp" /></a>
                            <a href="mailto:sipasokari@gmail.com" aria-label="Email"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg" alt="Email" /></a>
                            <a href="https://instagram.com/" target="_blank" aria-label="Instagram"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" /></a>
                            <a href="https://tiktok.com/" target="_blank" aria-label="TikTok"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" alt="TikTok" /></a>
                        </div>
                    </div>
                </div>
                
                {/* Bagian Formulir (Kanan) */}
                <div className="contact-form-container">
                    <h3 data-lang-key="contactFormTitleAlt">{T('contactFormTitleAlt')}</h3>
                    <p data-lang-key="contactFormDescAlt">{T('contactFormDescAlt')}</p>
                    
                    {/* FORMULIR AKSI POST KE FLASK VIA JAVASCRIPT/FETCH */}
                    <form id="inquiryForm" onSubmit={handleSubmit}> 
                        <div className="form-group">
                            <input type="text" id="name" name="name" required placeholder={T('formNamePlaceholder')} />
                        </div>
                        <div className="form-group">
                            <input type="tel" id="phone" name="phone" required placeholder={T('formPhonePlaceholder')} />
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" name="email" required placeholder={T('formEmailPlaceholder')} />
                        </div>
                        <div className="form-group">
                            <textarea id="message" name="message" rows="5" required placeholder={T('formMessagePlaceholder')}></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="cta-button form-submit-btn" 
                            disabled={status === 'Mengirim...'} 
                        >
                            {status === 'Mengirim...' ? 'Mengirim...' : T('formSend')}
                        </button>
                        
                        {/* Area untuk menampilkan status kirim */}
                        {status && status !== 'Mengirim...' && (
                            <p style={{ 
                                marginTop: '15px', 
                                color: status.includes('berhasil') || status.includes('sukses') ? 'var(--green-primary)' : '#c0392b',
                                fontWeight: 500
                            }}>
                                {status}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;