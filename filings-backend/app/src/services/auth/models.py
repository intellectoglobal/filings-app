from sqlalchemy import  Column, Integer, String, BOOLEAN , ARRAY, DateTime, func, ForeignKey
from ...dependencies import BaseModel

class User_Role(BaseModel):
    __tablename__ = 'IGS_USER_ROLE'

    role_id = Column(Integer, primary_key=True, autoincrement=True)
    role_name = Column(String(50), unique=True, nullable=False)
    
class User(BaseModel):
	
	__tablename__ = "IGS_USERS"
	__table_args__ = {'extend_existing': True} 
 
	user_id = Column(Integer,  primary_key=True, autoincrement = True , index=True)
	user_name = Column(String, unique=True)
	email = Column(String, unique=True)
	password = Column(String)
	active_flag = Column(BOOLEAN, default = True)
	is_admin = Column(BOOLEAN)
	apps = Column(ARRAY(String))
	is_pwd_set = Column(BOOLEAN, default = False)
	# role_id = Column(Integer, ForeignKey('roles.role_id'))