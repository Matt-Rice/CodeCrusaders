from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.schemas.reminder import ReminderCreate, ReminderResponse
from app.services.reminder_service import upsert_reminder, get_all_reminders, delete_reminder
from app.db import get_db
from datetime import datetime

router = APIRouter(prefix="/reminders", tags=["reminders"])

@router.put("/{reminder_id}", response_model=ReminderResponse)
def upsert_reminder_endpoint(
    reminder_id: int,
    time: str,
    medicine: str,
    dosage: str,
    description: str = "",
    db: Session = Depends(get_db)
):
    """
    Upsert a reminder.

    Args:
        reminder_id (int): The ID of the reminder to update or create.
        time (str): The time of the reminder in 'YYYY-MM-DD HH:MM:SS' format.
        medicine (str): The name of the medicine.
        dosage (str): The dosage of the medicine.
        description (str): Additional details (optional).
        db (Session): The database session.

    Returns:
        ReminderResponse: The created or updated reminder.
    """
    
    try:
        datetime.strptime(time, "%Y-%m-%d %H:%M:%S")
        reminder = upsert_reminder(db, reminder_id, time, medicine, dosage, description)
        return reminder
    except ValueError:
        raise HTTPException(status_code=422, detail="Invalid time format. Use 'YYYY-MM-DD HH:MM:SS'.")
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Database error")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/", response_model=list[ReminderResponse])
def get_all_reminders_endpoint(db: Session = Depends(get_db)):
    
    """
    Retrieve all reminders.

    Args:
        db (Session): The database session.

    Returns:
        list[ReminderResponse]: A list of all reminders.
    """
    try:
        return get_all_reminders(db)
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Database error")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.delete("/{reminder_id}")
def delete_reminder_endpoint(reminder_id: int, db: Session = Depends(get_db)):
    """
    Endpoint to delete a reminder.

    Args:
        reminder_id (int): The ID of the reminder to delete.
        db (Session): The database session.

    Returns:
        dict: A message indicating the deletion status.
    """
    try:
        return delete_reminder(reminder_id, db)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred")
