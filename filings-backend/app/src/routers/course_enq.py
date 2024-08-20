from typing import List
from fastapi import APIRouter, Depends,status
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.course_enq import service, schemas

router = APIRouter(
    tags=["course_enq"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@router.post('/course-enquiry', status_code=status.HTTP_201_CREATED)
async def course_enquiry(request:schemas.IGS_COURSE_ENQ,  db: Session = Depends(get_db)):
    return service.create_course_enquiry(db=db , request=request)

@router.get("/course-enquiry-all")
def request_course_enquiry(db: Session = Depends(get_db)):
    return service.get_course_enquiry(db=db)

@router.put("/course-enquiry-update")
async def course_enquiry_update(request:schemas.IGS_COURSE_ENQ_ID,  db: Session = Depends(get_db)):
    return service.update_course_enquiry(db=db , request=request)
 
@router.delete("/course-enquiry-delete/{id}")
async def course_enquiry_delete(id: int,  db: Session = Depends(get_db)):
    return service.delete_course_enquiry(db=db, id=id)

@router.post('/course-enquiry-paymnet-data', status_code=status.HTTP_201_CREATED)
async def course_enquiry_create_payment(request: schemas.IGS_COURSE_ENQ_PAYMENT,  db: Session = Depends(get_db)):
    return service.create_payment(db=db, request=request)

@router.get("/course-enquiry-payment-data-all")
def course_enquiry_payment_data(db: Session = Depends(get_db)):
    return service.get_payment(db=db)

@router.put("/course-enquiry-payment-update")
async def course_enquiry_payment_update(request: schemas.IGS_COURSE_ENQ_PAYMENT_GU,  db: Session = Depends(get_db)):
    return service.update_payment(db=db, request=request)

@router.post('/course-enquiry-comment-data', status_code=status.HTTP_201_CREATED)
async def course_enquiry_create_comment(request: schemas.IGS_COURSE_ENQ_COMMENTS,  db: Session = Depends(get_db)):
    return service.create_comment(db=db, request=request)

@router.get("/course-enquiry-comment-data-all")
def course_enquiry_comment_data(db: Session = Depends(get_db)):
    return service.get_comment(db=db)

@router.put("/course-enquiry-comment-update")
async def course_enquiry_comment_update(request: schemas.IGS_COURSE_ENQ_GU,  db: Session = Depends(get_db)):
    return service.update_comment(db=db, request=request)

