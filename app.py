# app.py

from flask import Flask, jsonify, request, session, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime, timezone
import json

from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

# --- 1. SETUP ENVIRONMENT & APP ---
app = Flask(__name__)

# Kunci Rahasia Flask
SECRET_KEY = 'f7j8gH2q*P9wL1sA@eB0xY4z!C6tV3n&M5kU#dR7iO$q2pA0cT8yX6fS4wJ1z3eI9oU7yW5rT3vB1nQ0dE'
app.config['SECRET_KEY'] = SECRET_KEY

# Konfigurasi CORS
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
@app.after_request
def after_request(response):
    header = response.headers
    # HACK: Atur Origin secara eksplisit dan izinkan credentials untuk OPTIONS
    header['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    header['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    header['Access-Control-Allow-Credentials'] = 'true'
    return response

# --- 2. KONFIGURASI DATABASE ---

# Variabel koneksi database
POSTGRES_USER = "postgres"
POSTGRES_PASSWORD = "Admin123"
POSTGRES_HOST = "localhost"
POSTGRES_PORT = "5432"
POSTGRES_DB = "pasokari_db"

DB_URI = (
    f"postgresql+psycopg2://{POSTGRES_USER}:"
    f"{POSTGRES_PASSWORD}@{POSTGRES_HOST}:"
    f"{POSTGRES_PORT}/{POSTGRES_DB}"
)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- KONFIGURASI FLASK-LOGIN ---
login_manager = LoginManager()
login_manager.init_app(app)
@login_manager.unauthorized_handler
def unauthorized():
    return jsonify(message="Otentikasi diperlukan."), 401

# --- 3. DATABASE MODELS ---

# == User Model (Hardcoded) ==
class User(UserMixin):
    def __init__(self, id, email, password_hash):
        self.id = id
        self.email = email
        self.password_hash = password_hash

hashed_admin_password = 'pbkdf2:sha256:600000$rca6DlCUtd7YyaG9$3f7bdd4ff72cdbf1484c22b8afb5575ecb8b54509834487aed95027e7419466b' # Hash untuk 'Admin123'

users = {
    1: User(id=1, email="sipasokari@gmail.com", password_hash=hashed_admin_password)
}

@login_manager.user_loader
def load_user(user_id):
    return users.get(int(user_id))

# == Inquiry Model ==
class Inquiry(db.Model):
    __tablename__ = 'inquiry'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    def __repr__(self): return f'<Inquiry {self.email}>'

# == Product Model ==
class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    name_id = db.Column(db.String(150), nullable=False)
    name_en = db.Column(db.String(150), nullable=False)
    __table_args__ = (db.UniqueConstraint('category', 'name_id', name='_category_name_id_uc'),)
    def to_dict(self): return {'id': self.id, 'category': self.category, 'name_id': self.name_id, 'name_en': self.name_en}
    def __repr__(self): return f'<Product {self.name_id}>'

# --- 4. FUNGSI SEEDING DATA (Opsional) ---
def seed_products():
    if Product.query.count() == 0:
        print("⏳ Tabel produk kosong, mencoba seeding...")
        try:
            # Coba impor data statis dari data.py
            from data import CATEGORY_DATA
            for category_name, category_data in CATEGORY_DATA.items():
                products_id = category_data['id']['products']
                products_en = category_data['en']['products']
                for i in range(len(products_id)):
                    name_id = products_id[i]
                    name_en = products_en[i] if i < len(products_en) else name_id
                    exists = Product.query.filter_by(category=category_name, name_id=name_id).first()
                    if not exists:
                         new_product = Product(category=category_name, name_id=name_id, name_en=name_en)
                         db.session.add(new_product)
            db.session.commit()
            print("✅ Data produk awal berhasil di-seed.")
        except ImportError:
             print("ℹ️ File data.py tidak ditemukan untuk seeding. Harap buat file data.py")
        except Exception as e:
            db.session.rollback()
            print(f"❌ Gagal seed data produk: {e}")
    else:
        print("ℹ️ Tabel produk sudah berisi data. Seeding dilewati.")


# --- 5. ENDPOINT API ---
# (Semua endpoint Anda dari file asli app.py tetap sama)

# == AUTHENTICATION ==
@app.route('/api/login', methods=['POST'])
def login():
    if current_user.is_authenticated: return jsonify({"message": "User sudah login."}), 200
    if not request.is_json: return jsonify({"message": "Request harus JSON"}), 400
    data = request.get_json(); email = data.get('email'); password = data.get('password')
    if not email or not password: return jsonify({"message": "Email/Password wajib diisi."}), 400
    user_found = next((user for user in users.values() if user.email == email), None)
    if user_found and check_password_hash(user_found.password_hash, password):
        login_user(user_found); print(f"Login sukses: {user_found.email}")
        return jsonify({"message": "Login berhasil.", "user": {"id": user_found.id, "email": user_found.email}}), 200
    else: return jsonify({"message": "Email atau Password salah."}), 401

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    user_email = current_user.email; logout_user(); print(f"Logout sukses: {user_email}")
    return jsonify({"message": "Logout berhasil."}), 200

@app.route('/api/check_auth', methods=['GET'])
def check_auth():
    if current_user.is_authenticated:
        return jsonify({"isLoggedIn": True, "user": {"id": current_user.id, "email": current_user.email}}), 200
    else: return jsonify({"isLoggedIn": False}), 200

# == PRODUCTS (CRUD) ==
@app.route('/api/products', methods=['GET'])
def get_products(): # Publik
    try:
        products = Product.query.order_by(Product.category, Product.id).all()
        return jsonify([p.to_dict() for p in products]), 200
    except Exception as e: print(f"Error GET products: {e}"); return jsonify({"message": "Gagal ambil produk."}), 500

@app.route('/api/products', methods=['POST'])
@login_required # Proteksi
def add_product():
    print("DEBUG: Memasuki fungsi add_product.")
    if not request.is_json: return jsonify({"message": "Request JSON diperlukan"}), 400
    data = request.get_json(); required = ['category', 'name_id', 'name_en']
    print(f"DEBUG: Data yang diterima: {data}")
    if not all(f in data and data[f] for f in required): return jsonify({"message": "Field wajib diisi."}), 400
    exists = Product.query.filter_by(category=data['category'], name_id=data['name_id']).first()
    if exists: return jsonify({"message": "Produk sudah ada."}), 409
    try:
        new_p = Product(category=data['category'], name_id=data['name_id'], name_en=data['name_en'])
        db.session.add(new_p); db.session.commit()
        print("DEBUG: Produk berhasil di-commit.")
        return jsonify(new_p.to_dict()), 201
    except Exception as e: db.session.rollback(); print(f"Error POST product: {e}"); return jsonify({"message": "Gagal tambah produk."}), 500

@app.route('/api/products/<int:product_id>', methods=['PUT'])
@login_required # Proteksi
def update_product(product_id):
    if not request.is_json: return jsonify({"message": "Request JSON diperlukan"}), 400
    data = request.get_json(); product = db.session.get(Product, product_id)
    if not product: return jsonify({"message": "Produk tidak ditemukan."}), 404
    try:
        new_cat = data.get('category', product.category); new_name = data.get('name_id', product.name_id)
        if (new_cat != product.category or new_name != product.name_id):
            exists = Product.query.filter(Product.category == new_cat, Product.name_id == new_name, Product.id != product_id).first()
            if exists: return jsonify({"message": "Kombinasi kategori/nama sudah ada."}), 409
        product.category = new_cat; product.name_id = new_name; product.name_en = data.get('name_en', product.name_en)
        db.session.commit()
        return jsonify(product.to_dict()), 200
    except Exception as e: db.session.rollback(); print(f"Error PUT product {product_id}: {e}"); return jsonify({"message": "Gagal update produk."}), 500

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
@login_required # Proteksi
def delete_product(product_id):
    product = db.session.get(Product, product_id)
    if not product: return jsonify({"message": "Produk tidak ditemukan."}), 404
    try:
        db.session.delete(product); db.session.commit()
        return jsonify({"message": f"Produk ID {product_id} dihapus."}), 200
    except Exception as e: db.session.rollback(); print(f"Error DELETE product {product_id}: {e}"); return jsonify({"message": "Gagal hapus produk."}), 500

# == INQUIRIES ==
@app.route('/api/inquiry', methods=['POST'])
def handle_inquiry(): # Publik
    if not request.is_json: return jsonify({"message": "Missing JSON"}), 400
    data = request.get_json(); required = ['name', 'phone', 'email', 'message']
    if not all(f in data and data[f] for f in required): return jsonify({"message": "Field wajib diisi."}), 400
    try:
        new_i = Inquiry(name=data['name'], phone=data['phone'], email=data['email'], message=data['message'])
        db.session.add(new_i); db.session.commit()
        return jsonify({"message": "Pesan terkirim ke database."}), 200
    except Exception as e: db.session.rollback(); print(f"Error saving inquiry: {e}"); return jsonify({"message": "Gagal menyimpan pesan."}), 500

@app.route('/api/inquiries', methods=['GET'])
@login_required # Proteksi
def get_all_inquiries():
    try:
        inquiries = Inquiry.query.order_by(Inquiry.created_at.desc()).all()
        result = [{'id': i.id, 'name': i.name, 'phone': i.phone, 'email': i.email, 'message': i.message,
                   'created_at': i.created_at.isoformat() if i.created_at else None}
                  for i in inquiries]
        return jsonify(result), 200
    except Exception as e: print(f"Error fetching inquiries: {e}"); return jsonify({"message": "Gagal ambil inquiry."}), 500

# --- 6. RUN SERVER ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Buat tabel jika belum ada
        seed_products() # <-- INI PERBAIKANNYA (tanda # dihapus)
    print("Starting Flask server...")
    app.run(debug=True, port=5000)