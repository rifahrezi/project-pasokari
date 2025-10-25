# app.py

from flask import Flask, jsonify, request, session, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os # <-- IMPORT WAJIB UNTUK DEPLOYMENT
from datetime import datetime, timezone
import json

from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

# Data seeding dari file lokal
from data import CATEGORY_DATA, ADMIN_CREDENTIALS # Pastikan Anda memiliki file data.py

# --- 1. SETUP ENVIRONMENT & APP ---
app = Flask(__name__)

# Kunci Rahasia Flask (Ambil dari ENV, atau pakai hardcode untuk lokal)
SECRET_KEY = os.environ.get(
    'SECRET_KEY', 
    'f7j8gH2q*P9wL1sA@eB0xY4z!C6tV3n&M5kU#dR7iO$q2pA0cT8yX6fS4wJ1z3eI9oU7yW5rT3vB1nQ0dE'
)
app.config['SECRET_KEY'] = SECRET_KEY


# Konfigurasi CORS (PENTING untuk frontend React)
# Di produksi, Anda akan mengubah origins menjadi URL frontend Vercel/Netlify Anda
CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:5173')

# Jika Anda ingin mengizinkan beberapa origins (misalnya localhost dan Vercel URL),
# Anda bisa menggunakan list: CORS(app, origins=['list', 'of', 'urls'])
CORS(app, supports_credentials=True, origins=CORS_ORIGINS) 


# --- 2. KONFIGURASI DATABASE ---

# Ambil URL Database dari environment variable yang disediakan oleh Render
DATABASE_URL = os.environ.get(
    "DATABASE_URL", 
    "postgresql+psycopg2://postgres:Admin123@localhost:5432/pasokari_db" # Fallback untuk pengembangan lokal
)

# Render menggunakan skema 'postgres://', tetapi SQLAlchemy & psycopg2 membutuhkan 'postgresql+psycopg2://'
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg2://", 1)

# Konfigurasi SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- 3. KONFIGURASI FLASK-LOGIN ---
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = "strong" # Proteksi sesi
login_manager.login_view = 'login' # Fungsi yang menangani login


# --- 4. DEFINISI MODEL DATABASE ---

# Model Admin (User)
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(100), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name
        }

# Model Produk
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable=False)
    name_id = db.Column(db.String(100), unique=True, nullable=False)
    name_en = db.Column(db.String(100), unique=True, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'name_id': self.name_id,
            'name_en': self.name_en
        }

# Model Inquiry (Pesan Kontak)
class Inquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    # Tambahkan created_at
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)


# --- 5. FUNGSI HELPER & SEEDING ---

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def seed_database():
    """Membuat tabel dan mengisi data awal (admin dan produk) jika database kosong."""
    try:
        # Hapus dan buat ulang tabel jika dijalankan secara lokal (untuk kemudahan testing)
        if 'localhost' in DATABASE_URL:
             with app.app_context():
                db.drop_all()
                db.create_all()

        # Pastikan tabel ada
        with app.app_context():
            db.create_all()

            # Seeding Admin
            if not User.query.first():
                for admin_data in ADMIN_CREDENTIALS:
                    new_user = User(email=admin_data['email'], name=admin_data['name'])
                    new_user.set_password(admin_data['password'])
                    db.session.add(new_user)
                print("Admin user created.")

            # Seeding Produk
            if not Product.query.first():
                for category, data in CATEGORY_DATA.items():
                    for name_id, name_en in zip(data['id']['products'], data['en']['products']):
                        new_product = Product(category=category, name_id=name_id, name_en=name_en)
                        db.session.add(new_product)
                print(f"Products seeded from {len(CATEGORY_DATA)} categories.")

            db.session.commit()
            print("Database seeding complete.")

    except Exception as e:
        # Jika terjadi error (misal: gagal koneksi ke DB), tampilkan error dan rollback
        db.session.rollback()
        print(f"Database setup failed: {e}")

# Panggil seed_database() saat aplikasi dimuat pertama kali
# Note: Di lingkungan produksi (Gunicorn), ini akan dieksekusi saat build/start.
with app.app_context():
    seed_database()


# --- 6. ENDPOINT API (ROUTES) ---

# Admin: Endpoint Login
@app.route('/api/login', methods=['POST'])
def login():
    if not request.is_json: return jsonify({"message": "Missing JSON in request"}), 400
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        login_user(user, remember=True)
        return jsonify({
            "message": "Login successful",
            "user": user.to_dict()
        }), 200
    
    return jsonify({"message": "Email atau password salah."}), 401

# Admin: Endpoint Logout
@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout berhasil."}), 200

# Admin: Endpoint Check Auth Status
@app.route('/api/check_auth', methods=['GET'])
def check_auth():
    if current_user.is_authenticated:
        return jsonify({
            "isLoggedIn": True,
            "user": current_user.to_dict()
        }), 200
    return jsonify({"isLoggedIn": False}), 200

# CRUD: GET All Products
@app.route('/api/products', methods=['GET'])
def get_products():
    # Public endpoint
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products]), 200

# CRUD: CREATE Product (Protected)
@app.route('/api/products', methods=['POST'])
@login_required
def create_product():
    if not request.is_json: return jsonify({"message": "Missing JSON"}), 400
    data = request.get_json()
    
    if not all(k in data for k in ['category', 'name_id', 'name_en']):
        return jsonify({"message": "Field wajib diisi: category, name_id, name_en"}), 400
        
    try:
        new_product = Product(
            category=data['category'],
            name_id=data['name_id'],
            name_en=data['name_en']
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Gagal membuat produk. Error: {e}"}), 500

# CRUD: UPDATE Product (Protected)
@app.route('/api/products/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    product = Product.query.get_or_404(id)
    if not request.is_json: return jsonify({"message": "Missing JSON"}), 400
    data = request.get_json()
    
    try:
        product.category = data.get('category', product.category)
        product.name_id = data.get('name_id', product.name_id)
        product.name_en = data.get('name_en', product.name_en)
        db.session.commit()
        return jsonify(product.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Gagal update produk. Error: {e}"}), 500

# CRUD: DELETE Product (Protected)
@app.route('/api/products/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get_or_404(id)
    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Produk berhasil dihapus."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Gagal hapus produk. Error: {e}"}), 500

# Public: Endpoint Inquiry (Pesan Kontak)
@app.route('/api/inquiry', methods=['POST'])
def submit_inquiry():
    if not request.is_json: return jsonify({"message": "Missing JSON"}), 400
    data = request.get_json()
    required = ['name', 'phone', 'email', 'message']
    
    if not all(f in data and data[f] for f in required): 
        return jsonify({"message": "Field wajib diisi."}), 400
        
    try:
        new_inquiry = Inquiry(
            name=data['name'], 
            phone=data['phone'], 
            email=data['email'], 
            message=data['message']
        )
        db.session.add(new_inquiry)
        db.session.commit()
        return jsonify({"message": "Pesan terkirim ke database."}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error saving inquiry: {e}")
        return jsonify({"message": "Gagal menyimpan pesan."}), 500

# Admin: GET All Inquiries (Protected)
@app.route('/api/inquiries', methods=['GET'])
@login_required
def get_all_inquiries():
    try:
        inquiries = Inquiry.query.order_by(Inquiry.created_at.desc()).all()
        # Konversi datetime ke string ISO format
        result = [{'id': i.id, 'name': i.name, 'phone': i.phone, 'email': i.email, 'message': i.message,
                   'created_at': i.created_at.isoformat() if i.created_at else None}
                  for i in inquiries]
        return jsonify(result), 200
    except Exception as e: 
        print(f"Error fetching inquiries: {e}") 
        return jsonify({"message": "Gagal ambil inquiry."}), 500

# --- 7. RUN SERVER (Hanya untuk pengembangan lokal) ---
if __name__ == '__main__':
    # Hapus debug=True saat di produksi
    app.run(debug=True)