import os
import firebase_admin
from firebase_admin import credentials

def initialize_firebase():
    """Initializes Firebase Admin SDK if not already initialized."""
    if not firebase_admin._apps:
        # Uses application default credentials or emulator
        firebase_admin.initialize_app()

def get_supabase_db_url() -> str:
    """Returns the PostgreSQL connection string for Supabase."""
    return os.environ.get(
        "SUPABASE_DB_URL",
        "postgresql://postgres:postgres@127.0.0.1:54322/postgres"
    )
