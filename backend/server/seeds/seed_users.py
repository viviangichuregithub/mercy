from faker import Faker
from server.extensions import db
from server.models.user import User
import random

fake = Faker()

def seed_users(num_users=5):
    for _ in range(num_users):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            role=random.choice(["user", "admin"])
        )
        # Use the model method to set password
        user.set_password("password123")
        db.session.add(user)
        print(f"Created user {user.username} ({user.email})")

    try:
        db.session.commit()
        print(f"Seeded {num_users} users successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"User seeding failed: {e}")