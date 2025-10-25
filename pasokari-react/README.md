# Project Pasokari: Full-Stack E-Commerce B2B Produk Segar

## Deskripsi Proyek 🥕

**Pasokari** adalah platform *e-commerce* Business-to-Business (B2B) yang bertujuan untuk menyediakan solusi rantai pasok produk pertanian segar (sayuran, buah-buahan, rempah-rempah, dan bahan pangan) dengan fokus pada kualitas dan kemudahan manajemen admin. Proyek ini diimplementasikan sebagai arsitektur *full-stack* dengan pemisahan tegas antara *frontend* dan *backend*.

## Teknologi yang Digunakan 💻

Proyek ini dibangun menggunakan *stack* modern dan *open-source*:

### Frontend (`pasokari-react`)
* **React.js (dengan Vite):** Untuk membangun antarmuka pengguna yang cepat dan dinamis.
* **React Router DOM:** Untuk navigasi dan manajemen rute, termasuk rute admin yang diproteksi.
* **JavaScript (ES6+):** Logika utama di sisi klien.

### Backend (`pasokari-backend`)
* **Flask (Python):** Kerangka kerja *micro-framework* Python untuk membangun RESTful API.
* **Flask-SQLAlchemy:** *Object-Relational Mapper* (ORM) untuk berinteraksi dengan database.
* **Flask-Login:** Untuk manajemen sesi dan autentikasi admin.
* **Flask-CORS:** Untuk menangani *Cross-Origin Resource Sharing* antara frontend dan backend.
* **werkzeug.security:** Untuk *hashing* kata sandi admin.
* **Gunicorn:** (Akan digunakan untuk deployment) Server WSGI produksi.

### Database
* **PostgreSQL:** Database relasional yang andal untuk menyimpan data produk dan *inquiries*.

## Cara Menjalankan Proyek (Lokal)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek Pasokari secara lokal.

### ⚠️ Persyaratan Awal

1.  **Python 3.x** terinstal.
2.  **Node.js & npm/yarn** terinstal.
3.  **PostgreSQL** *server* berjalan secara lokal (dengan kredensial yang cocok di `app.py`).

---

### Langkah 1: Setup Backend (`pasokari-backend`)

1.  **Navigasi:** Masuk ke direktori backend.
    ```bash
    cd pasokari-backend
    ```
2.  **Buat Virtual Environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  **Instal Dependensi:**
    ```bash
    pip install -r requirements.txt
    # Jika requirements.txt belum dibuat:
    # pip install Flask Flask-SQLAlchemy Flask-CORS Flask-Login werkzeug psycopg2-binary
    ```
4.  **Jalankan Server Flask:**
    ```bash
    python3 app.py
    ```
    *Server akan berjalan di `http://127.0.0.1:5000`.* Server akan otomatis membuat tabel database dan mengisi data produk awal (seeding).

---

### Langkah 2: Setup Frontend (`pasokari-react`)

1.  **Navigasi:** Buka tab terminal baru dan masuk ke direktori frontend.
    ```bash
    cd ../pasokari-react
    ```
2.  **Instal Dependensi:**
    ```bash
    npm install
    # atau yarn install
    ```
3.  **Jalankan Aplikasi React:**
    ```bash
    npm run dev
    ```
    *Aplikasi akan terbuka di `http://localhost:5173`.*

### Akses Admin

Setelah kedua server berjalan, Anda dapat mengakses halaman admin dan menguji fungsionalitas CRUD:
* **URL Admin:** `http://localhost:5173/login`
* **Email:** `sipasokari@gmail.com`
* **Password:** `Admin123`