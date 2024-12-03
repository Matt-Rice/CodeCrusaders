

const Editor = ({currentReminder, getNewData, deleteCurrentReminder}) => {
    {/*This will update the data*/}
    const newData = (key, value) => {
        getNewData({
            ...currentReminder,
            [key]: value,
        })
    }

    if (!currentReminder) 
        return(
        <div className=".container-fluid">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card mt-5 text-center">No reminders</div>
                </div>
            </div>
        </div>)

    return (
      <div className=".container-fluid">
        {/*This will center the container*/}
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card mt-5 text-center">
            {/*These are the input fields for the data*/}
              <input type="time" id="time" placeholder="time" value = {currentReminder.time} onChange={(n) => newData('time', n.target.value)}/>
              <input type="text" id="medicine" placeholder="medicine" value = {currentReminder.medicine} onChange={(n) => newData('medicine', n.target.value)}/>
              <input type="text" id="dosage" placeholder="dosage" value = {currentReminder.dosage} onChange={(n) => newData('dosage', n.target.value)}/>
              <textarea id="description" rows={5} placeholder="description" value = {currentReminder.description} onChange={(n) => newData('description', n.target.value)}/>
              {/*This will show the currently selected reminder*/}
              <em>{currentReminder.time}: Take {currentReminder.medicine}({currentReminder.dosage})</em>
              {/*This will delete the current reminder*/}
              <button onClick={() => deleteCurrentReminder(currentReminder.id)}>Delete Reminder</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Editor;