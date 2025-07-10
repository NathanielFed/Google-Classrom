import "./JoinClass.css";
function JoinClass() {
    function getInput(){
        let classCode = document.getElementById("classCode").value;
        let email = localStorage.getItem("email");
        if(!email){
            alert("user not logged in");
            return;
        }

        fetch("http://localhost:5000/api/classes/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ classCode, email }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) alert("Joined class!");
            else alert("Error: " + data.error);
        })
        .catch(err => alert("Fetch error: " + err));
    };
    return (
        <>
            <div className="join-class">
                <span className="join-class-title">Join class</span>
                <hr style={{ border: "1px solid #ccc", margin: "10px 0" }} />
                <div className="join-class-content">
                    <div className="join-class-account">
                    </div>
                    <div className="join-class-class-code">
                        <h3>Class code</h3>
                        <h3>Ask your teacher for the class code, then enter it here.</h3>
                        <input id="classCode" placeholder="Class Code"></input>
                    </div>
                    <div className="join-class-description">
                        <h3>To sign in with a class code</h3>
                        <li>Use an authorized account</li>
                        <li>Use a class code with 5-8 letters or numbers, and no spaces or symbols</li>
                    </div>
                </div>
                <hr style={{ border: "1px solid #ccc", margin: "10px 0" }} />
                <div className="button">
                    <button id="cancel" >Cancel</button>
                    <button id="join" onClick={getInput}>Join</button>
                </div>
            </div>

        </>
    );
}

export default JoinClass;