from fastapi import APIRouter, Depends, HTTPException,status
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.auth import service, schemas
from typing import List

router = APIRouter(tags=["auth"])

@router.post('/register', status_code=status.HTTP_201_CREATED)
async def register(user:schemas.User,  db: Session = Depends(get_db)):
	db_user = service.get_user_by_user(db, user=user.user_name) 
	if db_user:
		raise HTTPException(status_code=401, detail='Username is taken.Try another')

	db_user_email = service.get_user_by_email(db, email=user.email) 
	if db_user_email:
		raise HTTPException(status_code=401, detail='An account is already registered with your email address')
	return service.create_user(db=db, user=user)

@router.post('/login')
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
	db_user = service.get_user_by_email(db, email=user.email)

	if not db_user:
		raise HTTPException(status_code=400, detail="Email is not registered, Please contact Admin")
	
	if not db_user.__dict__["active_flag"] :
		raise HTTPException(status_code=400, detail="User is Not active, Please contact Admin")
	
	if not service.verify_password(user.password, db_user.password):
		raise HTTPException(status_code=400, detail="You have entered an invalid password")
	return {"token": service.create_access_token(user.email), **db_user.__dict__}

@router.post('/admin-register', status_code=status.HTTP_201_CREATED)
async def register(user:schemas.AdminUser,  db: Session = Depends(get_db)):
	db_user = service.get_user_by_user(db, user=user.user_name) 
	if db_user:
		raise HTTPException(status_code=400, detail='User name already exists.Try another')

	db_user_email = service.get_user_by_email(db, email=user.email) 
	if db_user_email:
		raise HTTPException(status_code=400, detail='Email already exists.Try another')
	return service.create_admin_user(db=db, user=user)

@router.get("/users-data-all")
def user(db: Session = Depends(get_db)):
    return service.get_user(db=db)


# @router.put("/users-update")  
# async def users_update(request: schemas.User_GU,  db: Session = Depends(get_db)):
#     return service.update_user(db=db, request=request)

@router.put("/users-update/{id}")
async def users_update(id: int, request: schemas.User_GU, db: Session = Depends(get_db)):
    # Fetch the user from the database
    user = service.get_user_by_id(db=db, user_id=id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Update the user with the provided data
    updated_user = service.update_user(db=db, user=user, request=request)
    return updated_user

@router.delete("/users/{id}", status_code=200)
async def delete_user(id: int, db: Session = Depends(get_db)):
    user = service.get_user_by_id(db=db, user_id=id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    service.delete_user(db=db, user=user)
    return {"detail": "User deleted successfully"}
