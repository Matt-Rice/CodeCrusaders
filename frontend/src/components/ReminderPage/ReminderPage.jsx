import React, { useState, useEffect } from "react";
import apiClient from "../../axiosConfig";
import Modal from "../Modal/Modal";
import "./ReminderPage.css";

function ReminderPage() {
  const [reminders, setReminders] = useState([]);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // For adding/editing reminders
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false); // For alarm notification
  const [alarmReminder, setAlarmReminder] = useState(null);
  const [formData, setFormData] = useState({
    day: "",
    hours: "",
    minutes: "",
    medicine: "",
    dosage: "",
    description: "",
  });


  useEffect(() => {
    fetchReminders();
  }, []);

  useEffect(() => {
    const alarmSound = new Audio("/alarm.wav"); // Reference the alarm sound file
    const checkReminders = setInterval(() => {
      const now = new Date();
      reminders.forEach((reminder) => {
        const reminderTime = new Date(reminder.time);
        if (now >= reminderTime && !reminder.isAcknowledged) {
          setAlarmReminder(reminder);
          setIsAlarmModalOpen(true);
          alarmSound.loop = true;
          alarmSound.play();
        }
      });
    }, 1000);

    return () => {
      clearInterval(checkReminders);
      alarmSound.pause();
      alarmSound.currentTime = 0;
    };
  }, [reminders]);

  const fetchReminders = async () => {
    try {
      const response = await apiClient.get("/reminders");
      setReminders(response.data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const isoDateTime = `${formData.day}T${formData.hours.padStart(2, "0")}:${formData.minutes.padStart(2, "0")}:00`;

      const requestBody = {
        id: currentReminder ? currentReminder.id : 0, // Use current ID for editing, 0 for new reminders
        time: isoDateTime,
        medicine: formData.medicine,
        dosage: formData.dosage,
        description: formData.description,
      };

      const endpoint = `/reminders/${currentReminder ? currentReminder.id : 0}`;
      const response = await apiClient.post(endpoint, requestBody);

      if (currentReminder) {
        // Update existing reminder in state
        setReminders(
          reminders.map((reminder) =>
            reminder.id === currentReminder.id ? response.data : reminder
          )
        );
      } else {
        // Add new reminder to state
        setReminders([response.data, ...reminders]);
      }

      setIsModalOpen(false);
      setFormData({
        day: "",
        hours: "",
        minutes: "",
        medicine: "",
        dosage: "",
        description: "",
      });
      setCurrentReminder(null);
    } catch (error) {
      console.error("Error saving reminder:", error);
    }
  };

  const handleEditClick = (reminder) => {
    const [date, time] = reminder.time.split("T");
    const [hours, minutes] = time.split(":");
    setFormData({
      day: date,
      hours: hours,
      minutes: minutes,
      medicine: reminder.medicine,
      dosage: reminder.dosage,
      description: reminder.description,
    });
    setCurrentReminder(reminder);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await apiClient.delete(`/reminders/${id}`);
      setReminders(reminders.filter((reminder) => reminder.id !== id));
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const handleAlarmAcknowledge = () => {
    setIsAlarmModalOpen(false);
    if (alarmReminder) {
      const updatedReminder = { ...alarmReminder, isAcknowledged: true };
      setReminders(
        reminders.map((reminder) =>
          reminder.id === updatedReminder.id ? updatedReminder : reminder
        )
      );
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDateTime = (isoDateTime) => {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(isoDateTime));
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1>Reminders</h1>
      </div>
      <ul className="reminder-list">
        {reminders.map((reminder) => (
          <li key={reminder.id} className="reminder-item">
            <p>{formatDateTime(reminder.time)}: {reminder.medicine}</p>
            <button onClick={() => handleEditClick(reminder)} className="edit-button">
              Edit
            </button>
            <button onClick={() => handleDeleteClick(reminder.id)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => setIsModalOpen(true)} className="add-button">
        Add Reminder
      </button>

      {/* Modal for Adding/Editing Reminder */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{currentReminder ? "Edit Reminder" : "Add Reminder"}</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Date:
            <input
              type="date"
              name="day"
              value={formData.day}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Hours:
            <input
              type="number"
              name="hours"
              value={formData.hours}
              onChange={handleFormChange}
              min="0"
              max="23"
            />
          </label>
          <label>
            Minutes:
            <input
              type="number"
              name="minutes"
              value={formData.minutes}
              onChange={handleFormChange}
              min="0"
              max="59"
            />
          </label>
          <label>
            Medicine:
            <input
              type="text"
              name="medicine"
              value={formData.medicine}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Dosage:
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </label>
          <button onClick={handleFormSubmit}>
            {currentReminder ? "Update Reminder" : "Create Reminder"}
          </button>
        </form>
      </Modal>

      {/* Alarm Modal */}
      <Modal isOpen={isAlarmModalOpen} onClose={handleAlarmAcknowledge}>
        {alarmReminder && (
          <div>
            <h2>Reminder: {alarmReminder.medicine}</h2>
            <p><strong>Time:</strong> {formatDateTime(alarmReminder.time)}</p>
            <p><strong>Description:</strong> {alarmReminder.description}</p>
            <p><strong>Dosage:</strong> {alarmReminder.dosage}</p>
            <button onClick={handleAlarmAcknowledge}>I Took My Medicine</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ReminderPage;
