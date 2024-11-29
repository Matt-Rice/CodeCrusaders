from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReminderCreate(BaseModel):
    time: datetime
    medicine: str
    dosage: str
    description: Optional[str]

class ReminderResponse(BaseModel):
    id: int
    time: datetime
    medicine: str
    dosage: str
    description: Optional[str]

    class Config:
        orm_mode = True  # Enables compatibility with ORM objects
