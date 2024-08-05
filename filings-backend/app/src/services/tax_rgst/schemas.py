from pydantic import BaseModel
from datetime import datetime

class IGS_REQ_TAX_RGST(BaseModel):
    
    req_id : str
    assessment_year : str
    pan : str
    created_by : str = "admin"
    updated_by : str = "admin"
    created_at : datetime = str
    updated_at : datetime = str


    class Config:
        orm_mode = True