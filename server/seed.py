from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, Book, BorrowRecord, Rating

fake = Faker()

def create_users():
    users = []
    for _ in range(10):
        u = User(
            username=fake.user_name(),
            email=fake.email()
        )
        users.append(u)
    return users

def create_books():
    books = []
    for _ in range(20):
        b = Book(
            title=fake.sentence(),
            author=fake.name()
        )
        books.append(b)
    return books

def create_borrow_records(users, books):
    records = []
    for _ in range(50):
        borrow_date = fake.date_time_this_year()
        return_date = fake.date_time_between(start_date=borrow_date)
        br = BorrowRecord(
            user_id=rc([user.id for user in users]),
            book_id=rc([book.id for book in books]),
            borrow_date=borrow_date,
            return_date=return_date
        )
        records.append(br)
    return records

def create_ratings(users, books):
    ratings = []
    for _ in range(30):
        r = Rating(
            user_id=rc([user.id for user in users]),
            book_id=rc([book.id for book in books]),
            rating_value=randint(1, 5)
        )
        ratings.append(r)
    return ratings

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Book.query.delete()
        BorrowRecord.query.delete()
        Rating.query.delete()

        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding books...")
        books = create_books()
        db.session.add_all(books)
        db.session.commit()

        print("Seeding borrow records...")
        borrow_records = create_borrow_records(users, books)
        db.session.add_all(borrow_records)
        db.session.commit()

        print("Seeding ratings...")
        ratings = create_ratings(users, books)
        db.session.add_all(ratings)
        db.session.commit()

        print("Done seeding!")
