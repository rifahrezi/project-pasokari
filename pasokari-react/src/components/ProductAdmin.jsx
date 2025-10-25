// src/components/ProductAdmin.jsx
import React, { useState, useEffect } from 'react';

// Menambahkan beberapa CSS dasar untuk tabel agar lebih rapi
const styles = `
  #product-admin-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  #product-admin-table th,
  #product-admin-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  #product-admin-table th {
    background-color: #f4f4f4;
  }
  #product-admin-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  #product-admin-table input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box; /* Pastikan padding tidak merusak layout */
  }
  .admin-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    background-color: #fcfcfc;
    border: 1px solid #eee;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  .admin-form input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .admin-actions {
    display: flex;
    gap: 10px;
  }
  .admin-actions button {
    padding: 5px 10px;
    cursor: pointer;
  }
  .btn-delete {
    background-color: #e74c3c;
    color: white;
    border: none;
  }
  .btn-edit {
    background-color: #3498db;
    color: white;
    border: none;
  }
  .btn-save {
    background-color: #2ecc71;
    color: white;
    border: none;
  }
  .btn-cancel {
    background-color: #95a5a6;
    color: white;
    border: none;
  }
`;

const ProductAdmin = ({ T, user }) => {
  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk form "Tambah Produk Baru"
  const [newProduct, setNewProduct] = useState({
    category: '',
    name_id: '',
    name_en: '',
  });

  // State untuk melacak produk mana yang sedang di-edit
  const [editingProduct, setEditingProduct] = useState(null);

  // --- API URL ---
  const API_URL = 'http://127.0.0.1:5000/api/products';

  // --- EFFECTS ---
  // Ambil data produk saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProducts();
  }, []);

  // --- API HANDLERS (CRUD) ---

  // R: READ (Ambil semua produk)
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL); // GET publik tidak perlu credentials
      if (!response.ok) {
        throw new Error('Gagal mengambil data produk.');
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // C: CREATE (Tambah produk baru)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError(null);

    if (!newProduct.category || !newProduct.name_id || !newProduct.name_en) {
      setError('Semua field wajib diisi.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // Tambahan untuk beberapa kasus CORS/Cookie
        },
        body: JSON.stringify(newProduct),
        credentials: 'include', // <-- PENTING: Untuk kirim session cookie
      });

      const data = await response.json();
      if (!response.ok) {
        // PENTING: data.message berisi pesan "Otentikasi diperlukan" jika 401
        throw new Error(data.message || 'Gagal menambah produk.');
      }

      setProducts([...products, data]);
      setNewProduct({ category: '', name_id: '', name_en: '' });
    } catch (err) {
      setError(err.message);
      console.error('Add product error:', err);
    }
  };

  // U: UPDATE (Simpan perubahan produk)
  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    setError(null);

    try {
      const response = await fetch(`${API_URL}/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(editingProduct),
        credentials: 'include', // <-- PENTING: Untuk kirim session cookie
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Gagal memperbarui produk.');
      }

      setProducts(
        products.map((p) => (p.id === editingProduct.id ? data : p))
      );
      setEditingProduct(null);
    } catch (err) {
      setError(err.message);
      console.error('Update product error:', err);
    }
  };

  // D: DELETE (Hapus produk)
  const handleDeleteProduct = async (productId) => {
    // Gunakan T untuk konfirmasi
    if (!window.confirm(T('admin_confirm_delete') || 'Apakah Anda yakin ingin menghapus produk ini?')) {
      return;
    }
    setError(null);

    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: 'DELETE',
        credentials: 'include', // <-- PENTING: Untuk kirim session cookie
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Gagal menghapus produk.');
      }

      setProducts(products.filter((p) => p.id !== productId));
    } catch (err) {
      setError(err.message);
      console.error('Delete product error:', err);
    }
  };

  // --- UI HANDLERS ---
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProductChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (product) => {
    setEditingProduct({ ...product });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  // --- RENDER ---
  return (
    <>
      <style>{styles}</style>
      <section id="product-admin" className="section-container" style={{ paddingTop: '100px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 className="section-title">{T('admin_title')}</h2>
        <p style={{ marginBottom: '20px' }}>
          {T('admin_welcome')}, <strong>{user.email}</strong>!
        </p>

        {/* --- FORM TAMBAH PRODUK --- */}
        <h3>{T('admin_add_new')}</h3>
        <form onSubmit={handleAddProduct} className="admin-form">
          <input
            type="text"
            name="category"
            placeholder={T('admin_category')}
            value={newProduct.category}
            onChange={handleNewProductChange}
            required
          />
          <input
            type="text"
            name="name_id"
            placeholder={T('admin_name_id')}
            value={newProduct.name_id}
            onChange={handleNewProductChange}
            required
          />
          <input
            type="text"
            name="name_en"
            placeholder={T('admin_name_en')}
            value={newProduct.name_en}
            onChange={handleNewProductChange}
            required
          />
          <button type="submit" className="cta-button" style={{ alignSelf: 'flex-start' }}>
            {T('admin_add_button')}
          </button>
        </form>

        {/* Tampilkan pesan error global jika ada */}
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>}

        {/* --- TABEL DAFTAR PRODUK --- */}
        <h3>{T('admin_product_list')}</h3>
        {isLoading ? (
          <p>{T('admin_loading')}</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table id="product-admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{T('admin_category')}</th>
                  <th>{T('admin_name_id')}</th>
                  <th>{T('admin_name_en')}</th>
                  <th>{T('admin_actions')}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) =>
                  editingProduct && editingProduct.id === product.id ? (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <input
                          type="text"
                          name="category"
                          value={editingProduct.category}
                          onChange={handleEditProductChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="name_id"
                          value={editingProduct.name_id}
                          onChange={handleEditProductChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="name_en"
                          value={editingProduct.name_en}
                          onChange={handleEditProductChange}
                        />
                      </td>
                      <td className="admin-actions">
                        <button onClick={handleUpdateProduct} className="btn-save">{T('admin_save')}</button>
                        <button onClick={cancelEditing} className="btn-cancel">{T('admin_cancel')}</button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.category}</td>
                      <td>{product.name_id}</td>
                      <td>{product.name_en}</td>
                      <td className="admin-actions">
                        <button onClick={() => startEditing(product)} className="btn-edit">{T('admin_edit')}</button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="btn-delete">{T('admin_delete')}</button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductAdmin;