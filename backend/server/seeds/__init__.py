from .seed_users import seed_users
from .seed_storage_nodes import seed_storage_nodes
from .seed_uploads import seed_uploads
from .seed_allocations import seed_allocations

def run_all_seeders():
    seed_users()
    seed_storage_nodes()
    seed_uploads()
    seed_allocations()

