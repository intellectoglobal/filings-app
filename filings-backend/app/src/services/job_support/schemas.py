from pydantic import BaseModel
from datetime import datetime

class IGS_JOB_SUPPORT(BaseModel):

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
    date_of_enquiry : str

    class Config:
        orm_mode = True


class JOB_SUPPORT_PAYMENT(BaseModel):

    job_support_id : int
    candidate_payment_amount: int = 0 
    candidate_payment_status: str = "Not Paid"
    candidate_payment_date: str = None
    resource_payment_amount: int = 0
    resource_payment_status: str = "Not Paid"
    resource_payment_date: str = None

class JOB_SUPPORT_PAYMENT_GU(BaseModel):

    id: int
    job_support_id : int
    candidate_payment_amount: int = 0 
    candidate_payment_status: str = "Not Paid"
    candidate_payment_date: str = None
    resource_payment_amount: int = 0
    resource_payment_status: str = "Not Paid"
    resource_payment_date: str = None


class JOB_SUPPORT_COMMENTS(BaseModel):

    job_support_id: int
    comments: str
    commented_at: str

class JOB_SUPPORT_COMMENTS_GU(BaseModel):

    id: int
    job_support_id: int
    comments: str
    commented_at: str


class IGS_JOB_SUPPORT_GU(BaseModel):

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
