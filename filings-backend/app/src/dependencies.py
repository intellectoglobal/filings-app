from .database import SessionLocal
from datetime import datetime, timedelta
import jwt
import random
import string
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
import bcrypt

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from sqlalchemy import  Column, DateTime, func
from .database import Base

class BaseModel(Base):
    __abstract__ = True

    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    
def get_db():
    ''' Method for configure database '''
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
class AuthHandler():
    security = HTTPBearer()
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM = "HS256"
    def get_password_hash(self, password):
        return self.pwd_context.hash(password)

    def verify_password(self, plain_password, hashed_password):
        return self.pwd_context.verify(plain_password, hashed_password)

    def encode_token(self, email):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=0, minutes=5),
            'iat': datetime.utcnow(),
            'sub': email
        }
        return jwt.encode(
            payload,
            self.SECRET_KEY,
            self.ALGORITHM
        )

    def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.secret, algorithms=['HS256'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Signature has expired')
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail='Invalid token')

    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(security)):
        return self.decode_token(auth.credentials)
    
def generate_password(length):
    # Define a string of characters to choose from
    characters = string.ascii_letters + string.digits + string.punctuation
    
    # Generate a password by randomly selecting characters
    password = ''.join(random.choice(characters) for i in range(length))
    
    return password

def send_email(user,recipient,pwd):
    # Sender email address
    sender = "intellectoglobal@gmail.com"

    # Create message container
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = 'Account Created Successfully'

    # Add message body
    body = f"""<html>
              <body>
              <p>Hello {user},</p>
              <p>Your account has been created sucessfully with email : '{recipient}' .</p>
              <p>Here's your password : {pwd} </p>
              <br>
              <br>
              <p>Regards,</p>
              <p>Intellion Technologies.</p>
              </body>
              </html>"""
    
    msg.attach(MIMEText(body, 'html'))
    
    # SMTP server settings
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    smtp_username = "intellectoglobal@gmail.com"
    smtp_password = "fvip qzoj axip emzm"

    # Send the message via SMTP
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    print("Email sent successfully!")