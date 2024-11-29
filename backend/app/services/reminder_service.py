from sqlalchemy.orm import Session
from app.models.reminder import Reminder
from app.schemas.reminder import ReminderCreate

def upsert_reminder(db: Session, reminder_id: int, reminder_data: ReminderCreate):
    """
    Upsert a reminder: Insert if it doesn't exist, or update if it does.
    """
    reminder = db.query(Reminder).filter(Reminder.id == reminder_id).first()
    if reminder:
        # Update existing reminder
        reminder.time = reminder_data.time
        reminder.medicine = reminder_data.medicine
        reminder.dosage = reminder_data.dosage
        reminder.description = reminder_data.description
    else:
        # Create a new reminder
        reminder = Reminder(**reminder_data.dict())
        db.add(reminder)
    db.commit()
    db.refresh(reminder)
    return reminder
