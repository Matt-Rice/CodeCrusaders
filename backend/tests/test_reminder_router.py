import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock
from app.main import app
from app.models.reminder import Reminder
from app.db import get_db


# Mock the database dependency
@pytest.fixture
def mock_get_db(mocker):
    mock_session = mocker.MagicMock()
    app.dependency_overrides[get_db] = lambda: mock_session
    return mock_session


# Initialize the TestClient for the FastAPI app
client = TestClient(app)


def test_get_all_reminders(mock_get_db):
    # Mock the database response for reminders
    mock_get_db.query.return_value.order_by.return_value.all.return_value = [
        Reminder(
            id=1,
            time="2024-12-01 10:00:00",
            medicine="Medicine A",
            dosage="1 tablet",
            description="Take with food",
        ),
        Reminder(
            id=2,
            time="2024-12-02 12:00:00",
            medicine="Medicine B",
            dosage="2 tablets",
            description="Take after meals",
        ),
    ]

    # Simulate the GET request to the `/reminders` route
    response = client.get("/reminders")

    # Validate the response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["id"] == 1
    assert data[0]["medicine"] == "Medicine A"
    assert data[1]["id"] == 2
    assert data[1]["medicine"] == "Medicine B"


def test_upsert_reminder(mock_get_db):
    # Mock the database response
    mock_get_db.query.return_value.filter.return_value.first.return_value = None

    # Test data
    reminder_data = {
    "time": "2024-12-01T10:00:00",  # Ensure ISO 8601 format
    "medicine": "Medicine A",
    "dosage": "1 tablet",
    "description": "Take with food"
    }

    response = client.put("/reminders/1", json=reminder_data)

    # Debug response
    print(response.status_code)
    print(response.json())

    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert data["medicine"] == "Medicine A"



def test_delete_reminder(mock_get_db):
    # Mock the database response for deleting a reminder
    mock_reminder = Reminder(
        id=1,
        time="2024-12-01 10:00:00",
        medicine="Medicine A",
        dosage="1 tablet",
        description="Take with food",
    )
    mock_get_db.query.return_value.filter.return_value.first.return_value = mock_reminder

    # Simulate the DELETE request to the `/reminders/{reminder_id}` route
    response = client.delete("/reminders/1")

    # Validate the response
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Reminder with ID 1 deleted successfully"

    # Check that the database delete and commit methods were called
    mock_get_db.delete.assert_called_once_with(mock_reminder)
    mock_get_db.commit.assert_called_once()


def test_delete_reminder_not_found(mock_get_db):
    # Mock the database response to return None (reminder not found)
    mock_get_db.query.return_value.filter.return_value.first.return_value = None

    # Simulate the DELETE request to the `/reminders/{reminder_id}` route
    response = client.delete("/reminders/999")

    # Validate the response
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Reminder not found"
