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


@app.route("/")
def home():

    return jsonify({
        "message": "Pneumonia Analysis Backend Running"
    })




if __name__ == "__main__":
    app.run(debug=True)