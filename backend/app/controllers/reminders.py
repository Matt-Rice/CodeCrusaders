from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.reminder import ReminderCreate, ReminderResponse
from app.services.reminder_service import upsert_reminder
from app.db import get_db

router = APIRouter(prefix="/reminders", tags=["reminders"])

@router.put("/{reminder_id}", response_model=ReminderResponse)
def upsert_reminder_endpoint(
    reminder_id: int,
    reminder_data: ReminderCreate,
    db: Session = Depends(get_db)
):
    """
    Upsert a reminder: Update if it exists or create a new one if it doesn't.
    """
    try:
        reminder = upsert_reminder(db, reminder_id, reminder_data)
        return reminder
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))