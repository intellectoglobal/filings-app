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