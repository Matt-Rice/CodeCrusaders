from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import Base, engine
from app.routers.reminder import router as reminder_router

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Origins that are allowed
    allow_credentials=True,  # Allow cookies or authentication headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Create the database tables at startup
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(reminder_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Reminder API!"}

