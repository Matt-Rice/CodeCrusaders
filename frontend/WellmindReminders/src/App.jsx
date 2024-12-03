import ReminderList from "./reminderList/ReminderList";
import MainWindow from "./reminderList/ReminderList";
import Editor from "./editor/Editor";
import { useState } from "react";
import uuid from "react-uuid"

function App() {
  {/*This is the reminder list*/}
  const [reminders, setReminder] = useState([]);
  {/*This will be the current reminder*/}
  const [currentReminder, getCurrentReminder] = useState(false)
  {/*This will fill in default data for any new reminder created*/}
  const AddReminder = () => {
    const newReminder = {
      id: uuid(),
      time: "00:00:00",
      medicine: "medicine",
      dosage: "dosage",
      description: "description"
    };
    setReminder([newReminder, ...reminders])
  };
  {/*This will get current reminder*/}
  const getReminder = () => {
    return reminders.find((reminder) => reminder.id === currentReminder)
  }
  {/*This will update the reminder data*/}
  const getNewData = (update) => {
    const updatedData = reminders.map((reminder) => {
      if (reminder.id === currentReminder) {
        return update;
      }
      return reminder;
    });
    setReminder(updatedData);
  }
  {/*This will delete the currently selected reminder*/}
  const deleteCurrentReminder = (deleteID) => {
    setReminder(reminders.filter((reminder) => reminder.id !== deleteID));
  }


  return (
    <div>
      {/*This is the things being shown on the webpage*/}
      <h1 className="text-center"> Remindersss</h1>
      <ReminderList reminders={reminders} AddReminder = {AddReminder} currentReminder = {currentReminder} getCurrentReminder = {getCurrentReminder}/>
      <Editor currentReminder = {getReminder()} getNewData={getNewData} deleteCurrentReminder = {deleteCurrentReminder}/>
    </div>
  );
}

export default App;
