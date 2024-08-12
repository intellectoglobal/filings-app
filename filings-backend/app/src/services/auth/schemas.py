from pydantic import BaseModel
from datetime import datetime

class User(BaseModel):
	email: str
	user_name : str
	password: str
	active_flag : bool = 1
	is_admin : bool 
	apps : list 

	class Config:
		orm_mode = True
  
class UserLogin(BaseModel):
	email: str
	password: str
 
class AdminUser(BaseModel):
	email: str
	user_name : str
	is_admin : bool 
	apps : list 
	

class User_GU(BaseModel):
	user_id: int
	user_name: str
	email: str
	password: str
	active_flag: bool
	is_admin: bool
	apps: list
	created_at: datetime
	updated_at: datetime


class SetNewPwd(BaseModel):
	email:str
	new_password:str