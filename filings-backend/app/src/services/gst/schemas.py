from datetime import datetime
from pydantic import BaseModel

class IGS_REQ_GST(BaseModel):
    req_id : str
    gst_time : str
    period : str	
    created_by : str = "admin"
    updated_by : str = "admin"
    created_at : datetime = str
    updated_at : datetime = str

    
    class Config:
        orm_mode = True