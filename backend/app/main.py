from fastapi import FastAPI
from app.db import Base, engine
from app.routers.reminder import router as reminder_router

app = FastAPI()

# Create the database tables at startup
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(reminder_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Reminder API!"}

