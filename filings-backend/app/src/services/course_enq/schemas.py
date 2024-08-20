from pydantic import BaseModel
from datetime import datetime, timedelta

class IGS_COURSE_ENQ(BaseModel):

    name : str
    followup_call_date: str
    followup_status : str
    enquiry_by : str
    mobile : int
    location : str
    course : str
    fee_structure : str
    experience_by : str
    info_source : str = None
    purpose: str = None
    mode : str
    comments : str

    class Config:
        orm_mode = True

class IGS_COURSE_ENQ_ID(BaseModel):

    id : int
    name : str
    followup_call_date: str
    followup_status : str
    enquiry_by : str
    mobile : int
    location : str
    course : str
    fee_structure : str
    experience_by : str
    info_source: str = None
    purpose: str = None
    mode : str
    comments : str

    class Config:
        orm_mode = True

class IGS_COURSE_ENQ_PAYMENT(BaseModel):

    job_support_id : int
    candidate_payment_amount: int = 0 
    candidate_payment_status: str = "Not Paid"
    candidate_payment_date: str = None
    resource_payment_amount: int = 0
    resource_payment_status: str = "Not Paid"
    resource_payment_date: str = None

class IGS_COURSE_ENQ_PAYMENT_GU(BaseModel):

    id: int
    job_support_id : int
    candidate_payment_amount: int = 0 
    candidate_payment_status: str = "Not Paid"
    candidate_payment_date: str = None
    resource_payment_amount: int = 0
    resource_payment_status: str = "Not Paid"
    resource_payment_date: str = None

class IGS_COURSE_ENQ_COMMENTS(BaseModel):

    job_support_id: int
    comments: str
    commented_at: str

class IGS_COURSE_ENQ_COMMENTS_GU(BaseModel):

    id: int
    job_support_id: int
    comments: str
    commented_at: str

class IGS_COURSE_ENQ_GU(BaseModel):

    id: int
    candidate_name: str
    mobile: int
    technology: str
    start_date: str
    followup_date: str
    resource: str
    status: str
    feedback: str
    created_by: str = "admin"
    updated_by: str = "admin"
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    payment_period: str
    date_of_enquiry: str