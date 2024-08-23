from fastapi import HTTPException
from sqlalchemy.orm import Session
from ...dependencies import AuthHandler, generate_password
from . import models, schemas
from datetime import datetime, timedelta
from typing import Optional
from ...dependencies import send_email
from .models import User, User_Role

auth_handler = AuthHandler()

# User Services

def check_active_flag(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email, models.User.active_flag == True).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_user(db: Session, user: str):
    return db.query(models.User).filter(models.User.user_name == user).first()

def get_user_by_id(db: Session, user_id: int) -> User:
    return db.query(User).filter(User.user_id == user_id).first()

def get_user(db: Session):
    return db.query(models.User).all()

def update_user(db: Session, user: models.User, request: schemas.User_GU) -> models.User:
    for key, value in request.dict().items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user

def create_user(db: Session, user: schemas.User):
    hashed_password = auth_handler.get_password_hash(user.password)
    db_user = models.User(
        user_name=user.user_name,
        email=user.email,
        password=hashed_password,
        is_admin=user.is_admin,
        apps=user.apps,
        role_id=user.role_id  # Added role_id assignment
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return user.email

def create_access_token(email: str, expires_delta: Optional[timedelta] = None):
    return auth_handler.encode_token(email)

def verify_password(plain_password: str, hashed_password: str):
    return auth_handler.verify_password(plain_password, hashed_password)

def create_admin_user(db: Session, user: schemas.AdminUser):
    password = generate_password(8)
    print(password)
    hashed_password = auth_handler.get_password_hash(password)
    db_user = models.User(
        user_name=user.user_name,
        email=user.email,
        password=hashed_password,
        is_admin=user.is_admin,
        apps=user.apps
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    send_email(user.user_name, user.email, password)
    return user.email

def delete_user(db: Session, user: models.User):
    db.delete(user)
    db.commit()

def set_new_passwords(db: Session, email: str, new_password: str):
    db_user = get_user_by_email(db, email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    hashed_new_password = auth_handler.get_password_hash(new_password)
    db_user.password = hashed_new_password
    db_user.is_pwd_set = True
    db.commit()
    db.refresh(db_user)

    # Remove sensitive and unnecessary fields
    user_data = {
        "active_flag": db_user.active_flag,
        "user_id": db_user.user_id,
        "email": db_user.email,
        "apps": db_user.apps,
        "is_pwd_set": db_user.is_pwd_set,
        "user_name": db_user.user_name,
        "is_admin": db_user.is_admin,
        "role_id": db_user.role_id
    }

    return {"msg": "Password updated successfully", "data": user_data}

# Role Services

def create_role(db: Session, role: schemas.UserRole):
    db_role = models.User_Role(role_name=role.role_name)
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role

def get_role_by_id(db: Session, role_id: int):
    db_role = db.query(models.User_Role).filter(models.User_Role.role_id == role_id).first()
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")
    return db_role

def get_role_by_name(db: Session, role_name: str):
    db_role = db.query(models.User_Role).filter(models.User_Role.role_name == role_name).first()
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")
    return db_role

def update_role(db: Session, role_id: int, request: schemas.UserRole):
    db_role = get_role_by_id(db, role_id)
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")

    db_role.role_name = request.role_name
    db.commit()
    db.refresh(db_role)
    return db_role

def delete_role(db: Session, role_id: int):
    db_role = get_role_by_id(db, role_id)
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")

    db.delete(db_role)
    db.commit()
    return {"msg": "Role deleted successfully"}

def get_roles(db: Session):
    return db.query(models.User_Role).all()
