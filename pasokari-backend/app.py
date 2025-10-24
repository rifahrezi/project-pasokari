# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
# Removed: from data import CATEGORY_DATA
from dotenv import load_dotenv
import os
from datetime import datetime
import json # Added back for potential JSON errors during seeding (though seeding is now commented out)

# --- 1. SETUP ENVIRONMENT & APP ---
load_dotenv()
app = Flask(__name__)
CORS(app)

# --- 2. KONFIGURASI DATABASE ---
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
DB_URI = (
    f"postgresql+psycopg2://{os.getenv('POSTGRES_USER')}:"
    f"{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_HOST')}:"
    f"{os.getenv('POSTGRES_PORT')}/{os.getenv('POSTGRES_DB')}"
)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- 3. DATABASE MODELS ---

class Inquiry(db.Model):
    """Model for storing contact form data."""
    __tablename__ = 'inquiry'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Inquiry {self.email}>'

class Product(db.Model):
    """Model for storing product list within each category."""
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    name_id = db.Column(db.String(150), nullable=False)
    name_en = db.Column(db.String(150), nullable=False)
    __table_args__ = (
        db.UniqueConstraint('category', 'name_id', name='_category_name_id_uc'),
    )

    def to_dict(self):
        """Convert Product object to dictionary for JSON."""
        return {
            'category': self.category,
            'name_id': self.name_id,
            'name_en': self.name_en
        }

    def __repr__(self):
        return f'<Product {self.name_id}>'

# --- 4. SEEDING FUNCTION (Definition kept, but not called by default) ---

def seed_products():
    """Loads product data from CATEGORY_DATA (if it existed) into the product table."""
    # Since data.py is removed, this function would need modification
    # to read from another source or be removed if seeding is done.
    print("ℹ️ Seeding function skipped as data source (data.py) is removed or seeding is complete.")
    # Example logic if you wanted to seed only if the table is empty:
    # if Product.query.count() == 0:
    #    print("Seeding initial product data...")
    #    # Add logic here to load initial data if needed
    #    db.session.commit()
    # else:
    #    print("Product table already contains data. Skipping seed.")
    pass

# --- 5. ENDPOINT API ---

@app.route('/api/categories', methods=['GET'])
def get_categories():
    """GET Endpoint: Retrieve all product data grouped by category from the database."""
    try:
        all_products = Product.query.order_by(Product.category, Product.id).all() # Added ordering
        response_data = {}
        for product in all_products:
            category = product.category
            if category not in response_data:
                response_data[category] = {'id': {'products': []}, 'en': {'products': []}}
            response_data[category]['id']['products'].append(product.name_id)
            response_data[category]['en']['products'].append(product.name_en)
        return jsonify(response_data), 200
    except Exception as e:
        print(f"Error fetching categories from DB: {e}")
        return jsonify({"message": "Failed to retrieve categories.", "details": str(e)}), 500


@app.route('/api/inquiry', methods=['POST'])
def handle_inquiry():
    """POST Endpoint: Receive and save contact form data to PostgreSQL."""
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400
    data = request.get_json()
    required_fields = ['name', 'phone', 'email', 'message']
    if not all(field in data and data[field] for field in required_fields):
        return jsonify({"message": "Missing required fields."}), 400
    try:
        new_inquiry = Inquiry(
            name=data['name'],
            phone=data['phone'],
            email=data['email'],
            message=data['message']
        )
        db.session.add(new_inquiry)
        db.session.commit()
        return jsonify({"message": "Your message has been successfully sent and stored in the database."}), 200
    except Exception as e:
        print(f"Error saving inquiry to DB: {e}")
        db.session.rollback()
        return jsonify({"message": "A server error occurred while saving the message.", "details": str(e)}), 500

@app.route('/api/inquiries', methods=['GET'])
def get_all_inquiries():
    """GET Endpoint: Retrieve all inquiry data (contact forms) from the inquiry table."""
    try:
        all_inquiries = Inquiry.query.order_by(Inquiry.created_at.desc()).all() # Added ordering
        result = []
        for inquiry in all_inquiries:
            result.append({
                'id': inquiry.id,
                'name': inquiry.name,
                'phone': inquiry.phone,
                'email': inquiry.email,
                'message': inquiry.message,
                'created_at': inquiry.created_at.isoformat()
            })
        return jsonify(result), 200
    except Exception as e:
        print(f"Error fetching inquiries from DB: {e}")
        return jsonify({"message": "Failed to retrieve inquiry list.", "details": str(e)}), 500

# --- 6. RUN SERVER ---

if __name__ == '__main__':
    with app.app_context():
        # Create tables if they don't exist
        db.create_all()
        # Seeding is now commented out - run manually or conditionally if needed
        # seed_products()
    app.run(debug=True, port=5000)