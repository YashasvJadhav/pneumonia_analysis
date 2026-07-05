from database import db

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    first_name = db.Column(db.String(100), nullable=False)

    last_name = db.Column(db.String(100), nullable=False)
    
    gender = db.Column(db.String(20))

    date_of_birth = db.Column(db.Date)

    email = db.Column(db.String(255), unique=True, nullable=False)

    phone = db.Column(db.String(20))

    password = db.Column(db.Text, nullable=False)

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
        nullable=False
    )

    image_name = db.Column(db.Text, nullable=False)

    image_path = db.Column(db.Text, nullable=False)

    prediction = db.Column(db.String(50))

    confidence = db.Column(db.Float)

    uploaded_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )