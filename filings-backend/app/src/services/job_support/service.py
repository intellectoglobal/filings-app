from sqlalchemy.orm import Session, column_property, joinedload
from . import models, schemas
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy import select, update, delete
from datetime import datetime, date

def create_request(db: Session, request: schemas.IGS_JOB_SUPPORT):
    db_req = models.IGS_JOB_SUPPORT(**request.dict())
    db.add(db_req)
    db.commit()
    db.refresh(db_req)
    return db_req.id

def get_all(db: Session):
    return db.query(models.IGS_JOB_SUPPORT).all()

def get_followUp_data(db: Session):
    return db.query(models.IGS_JOB_SUPPORT).filter(models.IGS_JOB_SUPPORT.status == 'Follow Up').all()


def get_requests(db: Session):
    return db.query(models.IGS_JOB_SUPPORT).options(joinedload(models.IGS_JOB_SUPPORT.payment), joinedload(models.IGS_JOB_SUPPORT.comment)).all()


def update_request(db: Session, request: schemas.IGS_JOB_SUPPORT) -> int:
    print("Received payload:",request.dict())  # Convert the Pydantic model to a dictionary
    
    db_req = models.IGS_JOB_SUPPORT(**request.dict())
    db_req.id = request.id
    db.merge(db_req)
    db.commit()
    return request.id


def delete_request(db: Session, id:int):
    db_req = delete(models.IGS_JOB_SUPPORT).where(models.IGS_JOB_SUPPORT.id == id)
    db.execute(db_req)
    db.commit()
    return {id}

def get_job_support(db: Session):
    return db.query(models.IGS_JOB_SUPPORT).options(joinedload(models.IGS_JOB_SUPPORT.payment)).all()

def create_payment(db: Session, request: schemas.JOB_SUPPORT_PAYMENT):
    db_pay = models.JOB_SUPPORT_PAYMENT(**request.dict())
    db.add(db_pay)
    db.commit()
    db.refresh(db_pay)
    return db_pay.id


def get_payment(db: Session):
    return db.query(models.JOB_SUPPORT_PAYMENT).all()


def update_payment(db: Session, request: schemas.JOB_SUPPORT_PAYMENT_GU) -> int:
    db_req = models.JOB_SUPPORT_PAYMENT(**request.dict())
    db_req.id = request.id
    db.merge(db_req)
    db.commit()
    return request.id

def create_comment(db: Session, request: schemas.JOB_SUPPORT_COMMENTS):
    db_comment = models.JOB_SUPPORT_COMMENTS(**request.dict())
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment.id


def get_comment(db: Session):
    return db.query(models.JOB_SUPPORT_COMMENTS).all()


def update_comment(db: Session, request: schemas.JOB_SUPPORT_COMMENTS_GU) -> int:
    db_req = models.JOB_SUPPORT_COMMENTS(**request.dict())
    db_req.id = request.id
    db.merge(db_req)
    db.commit()
    return request.id

def update_dates(db: Session, id: int, start_date: Optional[date] = None, followup_date: Optional[date] = None) -> int:
    """
    Update the start_date and followup_date fields of a specific IGS_JOB_SUPPORT record.
    
    :param db: Database session.
    :param id: ID of the record to update.
    :param start_date: Optional new start date.
    :param followup_date: Optional new followup date.
    :return: ID of the updated record.
    """
    db_req = db.query(models.IGS_JOB_SUPPORT).filter(models.IGS_JOB_SUPPORT.id == id).first()
    
    if db_req:
        if start_date is not None:
            db_req.start_date = start_date
        if followup_date is not None:
            db_req.followup_date = followup_date
        
        db.commit()
        db.refresh(db_req)
        return db_req.id
    return None

def get_dates(db: Session, id: int):
    """
    Retrieve the start_date and followup_date fields of a specific IGS_JOB_SUPPORT record.
    
    :param db: Database session.
    :param id: ID of the record to retrieve.
    :return: Dictionary containing start_date and followup_date.
    """
    db_req = db.query(models.IGS_JOB_SUPPORT).filter(models.IGS_JOB_SUPPORT.id == id).first()
    
    if db_req:
        return {
            "start_date": db_req.start_date,
            "followup_date": db_req.followup_date
        }
    return None

def reset_dates(db: Session, id: int) -> int:
    """
    Reset the start_date and followup_date fields of a specific IGS_JOB_SUPPORT record to None.
    
    :param db: Database session.
    :param id: ID of the record to reset.
    :return: ID of the updated record.
    """
    db_req = db.query(models.IGS_JOB_SUPPORT).filter(models.IGS_JOB_SUPPORT.id == id).first()
    
    if db_req:
        db_req.start_date = None
        db_req.followup_date = None
        
        db.commit()
        db.refresh(db_req)
        return db_req.id
    return None