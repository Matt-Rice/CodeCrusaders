from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.db import Base, engine, get_db
from app.models.reminder import Reminder

app = FastAPI()

# Create the database tables at startup
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Reminder API!"}

@app.get("/reminders/")
def get_reminders(db: Session = Depends(get_db)):
    return db.query(Reminder).all()
