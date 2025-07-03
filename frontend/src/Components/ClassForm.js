import "./ClassForm.css";
function CLassForm() {
    function getInput() {
        let firstName = document.getElementById("className").value;
        let section = document.getElementById("section").value;
        let subject = document.getElementById("subject").value;
        let room = document.getElementById("room").value;
    }
    return (
        <>
            <div className="classForm-container">
                <h2><span id="classForm-title">Create class</span></h2>
                <div className="input-field-container">
                    <label>Class name (required)</label>
                    <input className="textbox" id="className" placeholder="Input class name" required></input>
                    <label>Section</label>
                    <input className="textbox" id="section" placeholder="Input section"></input>
                    <label>Subject</label>
                    <input className="textbox" id="subject" placeholder="Input subject"></input>
                    <label>Room</label>
                    <input className="textbox" id="room" placeholder="Input room"></input>
                </div>
                <div className="classForm-button">

                    <button id="cancel" >Cancel</button>
                    <button id="confirm" onClick={getInput}>Confirm</button>
                </div>
            </div>
        </>
    )
}

export default CLassForm;
