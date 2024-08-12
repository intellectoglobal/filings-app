from pydantic import BaseModel, root_validator
from datetime import datetime

class IGS_REQ_DATA(BaseModel):

    req_id : str
    first_name : str
    last_name : str
    mobile : int
    email : str
    address : str
    city : str
    pincode : int
    enquired_for : str
    status : str = "Created"
    created_by : str = "admin"
    updated_by : str = "admin"
    created_at : datetime = str
    updated_at : datetime = str
    
    class Config:
        orm_mode = True
        
    @root_validator
    def number_validator(cls, values):
        values["updated_at"] = datetime.now()
        return values
    

class IGS_REQ_SERVICES(BaseModel):

    service_id : int
    service_name : str

    class Config:
        orm_mode = True
