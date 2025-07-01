import "./ClassForm.css";
function CLassForm() {
    return (
        <>
            <div className="classForm-container">
                <h2><span id="classForm-title">Create class</span></h2>
                <div className="input-field-container">
                    <label>Class name (required)</label>
                    <input className="textbox" placeholder="Input class name"></input>
                    <label>Section</label>
                    <input className="textbox" placeholder="Input section"></input>
                    <label>Subject</label>
                    <input className="textbox" placeholder="Input subject"></input>
                    <label>Room</label>
                    <input className="textbox" placeholder="Input room"></input>
                </div>
                <div className="classForm-button">

                    <button id="cancel">Cancel</button>
                    <button id="confirm">Confirm</button>
                </div>
            </div>
        </>
    )
}

export default CLassForm;