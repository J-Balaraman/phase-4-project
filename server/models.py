from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-borrow_records',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    borrow_records = db.relationship('BorrowRecord', back_populates='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    serialize_rules = ('-borrow_records',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    borrow_records = db.relationship('BorrowRecord', back_populates='book', lazy=True)

    def __repr__(self):
        return f'<Book {self.title}>'

class BorrowRecord(db.Model, SerializerMixin):
    __tablename__ = 'borrowrecords'

    serialize_rules = ('-user', '-book')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    borrow_date = db.Column(db.Date, nullable=False)
    return_date = db.Column(db.Date, nullable=True)

    user = db.relationship('User', back_populates='borrow_records')
    book = db.relationship('Book', back_populates='borrow_records')

    def __repr__(self):
        return f'<BorrowRecord - User ID:{self.user_id} Book ID:{self.book_id}>'
    
class Rating(db.Model, SerializerMixin):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    rating_value = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Rating - User ID:{self.user_id} Book ID:{self.book_id}>'
