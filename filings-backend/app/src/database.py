import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv('src/db.env')

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_PORT = os.getenv("DB_PORT")

env = os.getenv("VERCEL")

###
# Database Configuration
###


if env:
    DB_USER = os.getenv("PGUSER")
    DB_PASS = os.getenv("PGPASSWORD")
    DB_HOST = os.getenv("PGHOST")
    DB_NAME = os.getenv("PGDATABASE")


# Ensure DB_PORT is being included in the URL
SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Each time you modify your SQLAlchemy models,
# you should generate a new migration script using alembic revision --autogenerate
# and then apply the migration using alembic upgrade head.
