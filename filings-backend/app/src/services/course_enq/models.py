from sqlalchemy import Column,String,Integer,BigInteger, ForeignKey, func, event
from ...database import Base

class IGS_COURSE_ENQ(Base):
    __tablename__ = "IGS_COURSE_ENQUIRY"
    __table_args__ = {'extend_existing': True} 

    id = Column(Integer, primary_key=True,autoincrement = True, index=True)
    name = Column(String)
    followup_call_date = Column(String)
    followup_status = Column(String)
    enquiry_by = Column(String)
    mobile = Column(BigInteger)
    location = Column(String)
    course = Column(String)
    fee_structure = Column(String)
    experience_by = Column(String)
    info_source = Column(String, default=None)
    purpose = Column(String, default=None)
    mode = Column(String)
    comments = Column(String)


class IGS_COURSE_ENQ_PAYMENT(Base):
    __tablename__ = "IGS_COURSE_ENQ_PAYMENT"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True,  index=True)
    job_support_id = Column(Integer, ForeignKey(
        "IGS_COURSE_ENQUIRY.id", ondelete="CASCADE"))
    candidate_payment_amount = Column(Integer,default=0)
    candidate_payment_status = Column(String,default="Not Paid")
    candidate_payment_date = Column(String,default=None)
    resource_payment_amount = Column(Integer,default=0)
    resource_payment_status = Column(String, default="Not Paid")
    resource_payment_date = Column(String,default=None)

    
class IGS_COURSE_ENQ_COMMENTS(Base):

    __tablename__ = "IGS_COURSE_ENQ_COMMENTS"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True,  index=True)
    job_support_id = Column(Integer, ForeignKey(
        "IGS_COURSE_ENQUIRY.id", ondelete="CASCADE"))
    comments = Column(String)
    commented_at = Column(String)


@event.listens_for(IGS_COURSE_ENQ, 'before_update')
def before_update_listener(mapper, connection, target):
    target.updated_at = func.now()
