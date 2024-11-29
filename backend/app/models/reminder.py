from sqlalchemy import Column, Integer, String, DateTime
from app.db import Base

class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(Integer, primary_key=True, index=True)
    time = Column(DateTime, nullable=False)
    medicine = Column(String, nullable=False)
    dosage = Column(String, nullable=False)
    description = Column(String, nullable=True)
