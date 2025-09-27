from run import create_app
from server.extensions import db
from . import run_all_seeders

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        run_all_seeders()

"""
from server import create_app
from server.extensions import db
from . import run_all_seeders

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        run_all_seeders()
        print("All seeders executed successfully.")"""