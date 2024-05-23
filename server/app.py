from models import db, User, Book, BorrowRecord, Rating
from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'library.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)


@app.route('/')
def home():
    return ''

@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        users_json = [user.to_dict() for user in users]
        return make_response(jsonify(users_json), 200)
    elif request.method == 'POST':
        try:
            json=request.get_json()
            new_user = User(
                username=json['username'],
                email=json['email'],
            )
            db.session.add(new_user)
            db.session.commit()
            message_dict = new_user.to_dict()
            return make_response(jsonify(message_dict), 201)
        except ValueError as e:
            error_message = str(e)
            return make_response(jsonify({"errors": error_message}), 400)


@app.route('/users/<int:id>', methods=['GET', 'PATCH'])
def users_by_id(id):
    user = User.query.get(id)

    if user is None:
        return make_response(jsonify({"error": "User not found"}), 404)
    
    elif request.method == 'PATCH':
        json = request.get_json()
        try:
            for attr in json:
                setattr(user, attr, json[attr])

            db.session.add(user)
            db.session.commit()
            message_dict = user.to_dict()

            return make_response(jsonify(message_dict), 202)
        except ValueError as e:
            return make_response(jsonify({"errors": ["validation errors"]}), 400)
    
    elif request.method == 'GET':
        try:
            user_data = user.to_dict()
            user_data['borrow_records'] = [record.to_dict() for record in user.borrow_records]
            user_data['ratings'] = [rating.to_dict() for rating in user.ratings]
            return make_response(jsonify(user_data), 200)
        except ValueError as e:
            error_message = str(e)
            return make_response(jsonify({"errors": [error_message]}), 400)


@app.route('/books', methods=['GET', 'POST'])
def books():
    if request.method == 'GET':
        books = Book.query.all()
        books_json = [book.to_dict() for book in books]
        return make_response(jsonify(books_json), 200)
    elif request.method == 'POST':
        json=request.get_json()
        new_book = Book(
            title=json['title'],
            author=json['author'],
        )

        db.session.add(new_book)
        db.session.commit()
        message_dict = new_book.to_dict()
        return make_response(jsonify(message_dict), 201)

@app.route('/books/<int:id>', methods=['PATCH', 'DELETE'])
def books_by_id(id):
    book = Book.query.get(id)

    if book == None:
        return make_response(jsonify({"error": "Book not found"}), 404)
    
    elif request.method == 'PATCH':
        json=request.get_json()
        for attr in json:
            setattr(book, attr, json[attr])

        db.session.add(book)
        db.session.commit()
        message_dict = book.to_dict()

        return make_response(jsonify(message_dict), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(book)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "Book deleted."
        }

        return make_response(jsonify(response_body), 204)

@app.route('/ratings', methods=['GET', 'POST'])
def ratings():
    if request.method == 'GET':
        ratings = Rating.query.all()
        ratings_json = [rating.to_dict() for rating in ratings]
        return make_response(jsonify(ratings_json), 200)
    elif request.method == 'POST':
        try:
            json=request.get_json()
            new_rating = Rating(
                user_id=json['user_id'],
                book_id=json['book_id'],
                rating_value=json['rating_value']
            )
    
            db.session.add(new_rating)
            db.session.commit()
            message_dict = new_rating.to_dict()
            return make_response(jsonify(message_dict), 201)
        except ValueError as e:
            return make_response(jsonify({"errors": ["validation errors"]}), 400)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
