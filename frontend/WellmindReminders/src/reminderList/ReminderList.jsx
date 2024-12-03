

const ReminderList = ( {reminders, AddReminder, currentReminder, getCurrentReminder} ) => {
  return (
    <>
      <div className=".container-fluid">
        {/*This will center the container*/}
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card mt-5 text-center">
              {/*This makes a button to add reminders*/}
              <button onClick={AddReminder}>Add Reminder</button>
            </div>
            <div className="card mt-5 text-center">
            {/*This will get the values from the array of reminders*/}
            {reminders.map((reminder) => (
              <div onClick={() => getCurrentReminder(reminder.id)}>
                {/*This will get the current reminder on click*/}
                <em>{reminder.time}: Take {reminder.medicine}({reminder.dosage})</em>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReminderList;