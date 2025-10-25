// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ T, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // <-- PENTING untuk session cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal.');
      }

      if (onLoginSuccess) {
        onLoginSuccess(data.user); // Kirim data user ke App
      }
      navigate('/admin/products'); // Redirect ke halaman admin

    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="login-page" className="section-container" style={{ paddingTop: '100px', maxWidth: '400px', margin: '0 auto' }}>
      
      {/* Paksa warna jadi hitam agar terlihat */}
      <h2 className="section-title" style={{ color: 'black', textAlign: 'center' }}>
        {T('login_title')}
      </h2>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>
            {T('login_email')}:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>
            {T('login_password')}:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
        {error && <p style={{ color: 'red', margin: '0' }}>{error}</p>}
        <button
          type="submit"
          className="cta-button"
          style={{ marginTop: '10px', padding: '12px' }}
          disabled={isLoading}
        >
          {isLoading ? T('login_loading') : T('login_button')}
        </button>
      </form>
    </section>
  );
};

export default LoginPage;