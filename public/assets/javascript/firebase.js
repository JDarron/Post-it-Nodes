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

    const db = firebase.database().ref();

    function FormData(title, reminder, author) {
        this.title = title;
        this.reminder = reminder;
        this.author = author;
    };

    const sendFormDataToFirebase = formData => {
        return $.post("/api/note", formData);
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

    const handleDelete = child => {
        return $.ajax({
            url: `/api/note/${child}`,
            type: "delete"
        });
    };

    const handleDeleteEventListener = () => {
        $(".delete-btn").on("click", function () {
            const childKey = $(this).val();
            return handleDelete(childKey);
        });
    };

    const displayDataFromFirebase = snap => {
        const notesTarget = $("#note-target");
        const source = $("#note-container").html();
        const template = Handlebars.compile(source);
        if (snap) {
            notesTarget.html(template({
                note: snap
            }));
            handleDeleteEventListener();
        } else {
            return notesTarget.html("");
        }
    };

    // SUBMIT BUTTON EVENT HANDLER
    $(".submit").on("click", handleSubmit);

    // DATABASE ON CHANGE HANDLER
    db.on("value", snap => {
        const snapshotValue = snap.val();
        return displayDataFromFirebase(snapshotValue);
    }, () => console.log("The read failed: " + errorObject.code));

});
