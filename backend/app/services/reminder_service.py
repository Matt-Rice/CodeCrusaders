from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.reminder import Reminder

from datetime import datetime

def upsert_reminder(
    db: Session, 
    reminder_id: int, 
    time: str,
    medicine: str,
    dosage:str,
    description: str = ""
    ):
    """
    Upsert a reminder: Insert if it doesn't exist, or update if it does.
    
    Args: 
        time: enter in form yyyy-mm-dd hh:mm:ss
    """
    try:
        # Ensure the `time` string is parsed into a datetime object
        time = datetime.strptime(time, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        raise ValueError("Invalid time format. Expected 'yyyy-mm-dd hh:mm:ss'.")
    
    reminder = db.query(Reminder).filter(Reminder.id == reminder_id).first()
    if reminder:
        # Update existing reminder
        reminder.time = time
        reminder.medicine = medicine
        reminder.dosage = dosage
        reminder.description = description
    else:
        # Create a new reminder
        reminder = Reminder(
            id = reminder_id,
            time = time,
            medicine = medicine,
            dosage = dosage,
            description = description,
        )
        db.add(reminder)
    db.commit()
    db.refresh(reminder)
    return reminder

def get_all_reminders(db: Session):
    """
    Returns a list of all of the reminders in the database

    Args:
        db (Session): The database session.

    Returns:
        reminders: A list containing all of the reminders or an empty list if none were found.
    """
    reminders = db.query(Reminder).order_by(Reminder.time).all()
    return reminders if reminders else [] # Return an empty list if no reminders found

def delete_reminder(reminder_id: int, db: Session):
    """
    Deletes a reminder by its ID.

    Args:
        reminder_id (int): The ID of the reminder to delete.
        db (Session): The database session.

    Raises:
        HTTPException: If the reminder is not found.

    Returns:
        dict: A message indicating the deletion status.
    """
    # Query the reminder by ID
    reminder = db.query(Reminder).filter(Reminder.id == reminder_id).first()
    
    if not reminder:
        # If the reminder does not exist, raise a 404 error
        raise HTTPException(status_code=404, detail="Reminder not found")

    # Delete the reminder
    db.delete(reminder)
    db.commit()
    
    return {"message": f"Reminder with ID {reminder_id} deleted successfully"}
