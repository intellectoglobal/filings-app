from ..services.request import service, schemas
from typing import List
from fastapi import APIRouter, Depends, HTTPException,status
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.job_support import service, schemas

router = APIRouter(
    tags=["job_support"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


# @router.post('/job-support-data', status_code=status.HTTP_201_CREATED)
# async def job_support_create_data(request: schemas.IGS_JOB_SUPPORT,  db: Session = Depends(get_db)):
#     return service.create_request(db=db, request=request)


@router.post('/job-support-data', status_code=status.HTTP_201_CREATED)
async def job_support_create_data(request: schemas.IGS_JOB_SUPPORT, db: Session = Depends(get_db)):
    try:
        # Directly use the request data; Pydantic handles date parsing
        return service.create_request(db=db, request=request)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/job-support-data")
def job_support_data(db: Session = Depends(get_db)):
    return service.get_all(db=db)

@router.get("/job-support-data-all")
def job_support_data_all(db: Session = Depends(get_db)):
    return service.get_requests(db=db)


@router.put("/job-support-data-update")
async def job_support_data_update(request: schemas.IGS_JOB_SUPPORT_GU,  db: Session = Depends(get_db)):
    return service.update_request(db=db, request=request)


@router.delete("/job-support-data-delete/{id}")
async def job_support_data_delete(id: int,  db: Session = Depends(get_db)):
    return service.delete_request(db=db, id=id)


@router.post('/job-support-paymnet-data', status_code=status.HTTP_201_CREATED)
async def job_support_create_payment(request: schemas.JOB_SUPPORT_PAYMENT,  db: Session = Depends(get_db)):
    return service.create_payment(db=db, request=request)

@router.get("/job-support-payment-data-all")
def job_support_payment_data(db: Session = Depends(get_db)):
    return service.get_payment(db=db)


@router.put("/job-support-payment-update")
async def job_support_payment_update(request: schemas.JOB_SUPPORT_PAYMENT_GU,  db: Session = Depends(get_db)):
    return service.update_payment(db=db, request=request)


@router.post('/job-support-comment-data', status_code=status.HTTP_201_CREATED)
async def job_support_create_comment(request: schemas.JOB_SUPPORT_COMMENTS,  db: Session = Depends(get_db)):
    return service.create_comment(db=db, request=request)


@router.get("/job-support-comment-data-all")
def job_support_comment_data(db: Session = Depends(get_db)):
    return service.get_comment(db=db)


@router.put("/job-support-comment-update")
async def job_support_comment_update(request: schemas.JOB_SUPPORT_COMMENTS_GU,  db: Session = Depends(get_db)):
    return service.update_comment(db=db, request=request)

