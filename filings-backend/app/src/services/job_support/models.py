from sqlalchemy import Column, Integer, String, DateTime, BigInteger, func, event, ForeignKey
from ...database import Base
from sqlalchemy.orm import relationship


class IGS_JOB_SUPPORT(Base):
    __tablename__ = "IGS_JOB_SUPPORT"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True,  index=True)
    candidate_name = Column(String)
    mobile = Column(BigInteger)
    technology = Column(String)
    resource = Column(String)
    status = Column(String)
    feedback = Column(String)
    created_by = Column(String)
    updated_by = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    payment_period = Column(String)
    date_of_enquiry = Column(String)
    payment = relationship("JOB_SUPPORT_PAYMENT")
    comment = relationship("JOB_SUPPORT_COMMENTS")
    start_date = Column(String,  nullable=True)
    followup_date = Column(String,  nullable=True)
    user_id = Column(Integer, ForeignKey('IGS_USERS.user_id'))


class JOB_SUPPORT_PAYMENT(Base):
    __tablename__ = "JOB_SUPPORT_PAYMENT"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True,  index=True)
    job_support_id = Column(Integer, ForeignKey(
        "IGS_JOB_SUPPORT.id", ondelete="CASCADE"))
    candidate_payment_amount = Column(Integer,default=0)
    candidate_payment_status = Column(String,default="Not Paid")
    candidate_payment_date = Column(String,default=None)
    resource_payment_amount = Column(Integer,default=0)
    resource_payment_status = Column(String, default="Not Paid")
    resource_payment_date = Column(String,default=None)


class JOB_SUPPORT_COMMENTS(Base):

    __tablename__ = "JOB_SUPPORT_COMMENTS"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True,  index=True)
    job_support_id = Column(Integer, ForeignKey(
        "IGS_JOB_SUPPORT.id", ondelete="CASCADE"))
    comments = Column(String)
    commented_at = Column(String)


@event.listens_for(IGS_JOB_SUPPORT, 'before_update')
def before_update_listener(mapper, connection, target):
    target.updated_at = func.now()
