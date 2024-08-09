from fastapi import HTTPException
from sqlalchemy.orm import Session
from ...dependencies import AuthHandler, generate_password
from . import models, schemas
from datetime import datetime, timedelta
from typing import Optional
from ...dependencies import send_email

auth_handler = AuthHandler()

def check_active_flag(db:Session, email : str):
    return db.query(models.User).filter(models.User.email==email and models.User.active_flag== True).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_user(db: Session, user: str):
    return db.query(models.User).filter(models.User.user_name == user).first()


def get_user(db: Session):
    return db.query(models.User).all()


def update_user(db: Session, request: schemas.User_GU) -> int:
    db_req = models.User(**request.dict())
    db_req.user_id = request.user_id
    db.merge(db_req)
    db.commit()
    return request.user_id

def create_user(db: Session, user: schemas.User):
    hashed_password = auth_handler.get_password_hash(user.password)
    db_user = models.User(user_name = user.user_name , email = user.email, password = hashed_password, is_admin = user.is_admin, apps = user.apps)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return user.email

def create_access_token(email: str, expires_delta: Optional[timedelta] = None):
	return  auth_handler.encode_token(email)
     
def verify_password(plain_password:str , hashed_password:str):
    return auth_handler.verify_password(plain_password , hashed_password)

def create_admin_user(db: Session, user: schemas.AdminUser):
    password = generate_password(8)
    print(password)
    hashed_password = auth_handler.get_password_hash(password)
    db_user = models.User(user_name = user.user_name , email = user.email, password = hashed_password, is_admin = user.is_admin, apps = user.apps)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    send_email(user.user_name,user.email,password)  
    return user.email

def set_new_passwords(db: Session, email: str, new_password: str):
    # Fetch the user by email
    db_user = get_user_by_email(db, email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    # Hash the new password and update the password field
    hashed_new_password = auth_handler.get_password_hash(new_password)
    db_user.password = hashed_new_password

    # Update the is_pwd_set field to True
      
    db_user.is_pwd_set = True  
    db.commit()  # Commit the changes to the database
    db.refresh(db_user)  # Refresh the instance to get the latest data
    
    return {"msg": "Password updated successfully"}