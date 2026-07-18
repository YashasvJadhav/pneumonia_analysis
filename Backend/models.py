from database import db

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    first_name = db.Column(db.String(100), nullable=False)

    last_name = db.Column(db.String(100), nullable=False)
    
    gender = db.Column(db.String(50))

    date_of_birth = db.Column(db.Date)

    email = db.Column(db.String(120), unique=True, nullable=False, index=True)

    phone = db.Column(db.String(50))

    password = db.Column(db.String(255), nullable=False)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )


class Upload(db.Model):

    __tablename__ = "uploads"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    image_name = db.Column(db.Text, nullable=False)

    image_path = db.Column(db.Text, nullable=False)

    prediction = db.Column(db.String(50))

    confidence = db.Column(db.Float)

    heatmap_path = db.Column(db.Text, nullable=True)

    image_hash = db.Column(db.String(64), nullable=True, index=True)

    uploaded_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )