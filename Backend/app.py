from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from database import db, bcrypt
from routes.auth import auth_bp
from routes.profile import profile_bp
from routes.upload import upload_bp
from routes.dashboard import dashboard_bp

app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)

CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(upload_bp)
app.register_blueprint(dashboard_bp)

with app.app_context():
    db.create_all()
    try:
        db.session.execute(db.text("ALTER TABLE uploads ADD COLUMN IF NOT EXISTS heatmap_path TEXT;"))
        db.session.execute(db.text("ALTER TABLE uploads ADD COLUMN IF NOT EXISTS image_hash VARCHAR(64);"))
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print("Database schema migration warning:", e)

    try:
        db.session.execute(db.text("CREATE INDEX IF NOT EXISTS idx_uploads_user_id ON uploads(user_id);"))
        db.session.execute(db.text("CREATE INDEX IF NOT EXISTS idx_uploads_image_hash ON uploads(image_hash);"))
        db.session.execute(db.text("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);"))
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print("Database index creation warning:", e)


@app.route("/")
def home():

    return jsonify({
        "message": "Pneumonia Analysis Backend Running"
    })




if __name__ == "__main__":
    app.run(debug=True)