$(document).ready(function () {
    const config = {
        apiKey: "AIzaSyDhIxAIkTaBo8mgh3IgbBhOLbovjngDxWA",
        authDomain: "postit-7a679.firebaseapp.com",
        databaseURL: "https://postit-7a679.firebaseio.com",
        projectId: "postit-7a679",
        storageBucket: "postit-7a679.appspot.com",
        messagingSenderId: "601254925500"
    };
    firebase.initializeApp(config);

    const db = firebase.database();

    function FormData(title, reminder, author) {
        this.title = title;
        this.reminder = reminder;
        this.author = author;
    };

    const sendFormDataToFirebase = (formData) => {
        return $.post("/api/note", formData)
            .then(res => {
                console.log(res);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(
            $("#title-input").val().trim(),
            $("#reminder-input").val().trim(),
            $("#author-input").val().trim()
        );
        document.getElementById("form-container").reset();
        return sendFormDataToFirebase(formData);
    };

    const displayDataFromFirebase = (firebaseData) => {
        const dataToDisplay = Object.values(firebaseData);
        const notesTarget = document.getElementById("note-target");
        const source = document.getElementById("note-container").innerHTML;
        const template = Handlebars.compile(source);
        notesTarget.innerHTML = template({
            note: dataToDisplay
        });
    };

    // SUBMIT BUTTON EVENT HANDLER
    $(".submit").on("click", handleSubmit);

    // DATABASE ON CHANGE HANDLER
    db.ref().on("value", function (snapshot) {
        const snapshotValue = snapshot.val();
        if (snapshotValue) displayDataFromFirebase(snapshotValue);
        else return;
    }, () => console.log("The read failed: " + errorObject.code));

});
