import pytest
from fastapi import HTTPException
from unittest.mock import MagicMock
from sqlalchemy.orm import Session
from app.services.reminder_service import upsert_reminder, delete_reminder
from app.models.reminder import Reminder


# Test the `upsert_reminder` function
def test_upsert_reminder(mocker):
    # Mock the SQLAlchemy session
    mock_session = mocker.MagicMock(spec=Session)

    # Simulate the `filter().first()` query returning None (new reminder)
    mock_session.query.return_value.filter.return_value.first.return_value = None

    # Call the `upsert_reminder` function
    reminder = upsert_reminder(
        db=mock_session,
        reminder_id=1,
        time="2024-12-01 10:00:00",
        medicine="Test Medicine",
        dosage="1 tablet",
        description="Take after food",
    )

    # Check the returned reminder properties
    assert reminder.id == 1
    assert reminder.medicine == "Test Medicine"
    assert reminder.dosage == "1 tablet"
    assert reminder.description == "Take after food"

    # Verify that the `add` and `commit` methods were called
    mock_session.add.assert_called_once_with(reminder)
    mock_session.commit.assert_called_once()


# Test the `delete_reminder` function
def test_delete_reminder_success(mocker):
    # Mock the SQLAlchemy session
    mock_session = mocker.MagicMock(spec=Session)

    # Simulate the `filter().first()` query returning a Reminder object
    mock_reminder = Reminder(
        id=1,
        time="2024-12-01 10:00:00",
        medicine="Test Medicine",
        dosage="1 tablet",
        description="Take after food",
    )
    mock_session.query.return_value.filter.return_value.first.return_value = mock_reminder

    # Call the `delete_reminder` function
    response = delete_reminder(reminder_id=1, db=mock_session)

    # Check the response
    assert response == {"message": "Reminder with ID 1 deleted successfully"}

    # Verify that the `delete` and `commit` methods were called
    mock_session.delete.assert_called_once_with(mock_reminder)
    mock_session.commit.assert_called_once()


def test_delete_reminder_not_found(mocker):
    # Mock the SQLAlchemy session
    mock_session = mocker.MagicMock(spec=Session)

    # Simulate the `filter().first()` query returning None (reminder not found)
    mock_session.query.return_value.filter.return_value.first.return_value = None

    # Call the `delete_reminder` function and expect an HTTPException
    with pytest.raises(HTTPException) as exc_info:
        delete_reminder(reminder_id=999, db=mock_session)

    # Check the exception details
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Reminder not found"

