from pydantic import BaseModel
from datetime import datetime

class IGS_REQ_GST_RGST(BaseModel):

    req_id : str
    company_name : str
    company_address : str
    company_city : str
    company_pincode : str
    company_email : str
    employer_pan : str
    created_by : str = "admin"
    updated_by : str = "admin"
    created_at : datetime = str
    updated_at : datetime = str
    
    class Config:
        orm_mode = True