from sqlalchemy import  Column, Integer, String, BOOLEAN , ARRAY, DateTime, func
from ...dependencies import BaseModel

class User(BaseModel):
	
	__tablename__ = "IGS_USERS"
	__table_args__ = {'extend_existing': True} 
 
	user_id = Column(Integer,  primary_key=True, autoincrement = True , index=True)
	user_name = Column(String, unique=True)
	email = Column(String, unique=True)
	password = Column(String)
	active_flag = Column(BOOLEAN, default = 1)
	is_admin = Column(BOOLEAN)
	apps = Column(ARRAY(String))
	is_pwd_set = Column(BOOLEAN, default = False)