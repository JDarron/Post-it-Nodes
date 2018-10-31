const db = require('firebase-admin');
const serviceAccount = require("../../config/serviceAccountKey.json");

db.initializeApp({
    credential: db.credential.cert(serviceAccount),
    databaseURL: "https://postit-7a679.firebaseio.com/"
});

exports.createNote = (req, res) => {

    db.database().ref().push(
        req.body,
        function (err) {
            if (err) console.error(err);
            else {
                res.json({
                    message: "Success!",
                    result: true
                });
            }
        }); // END FIREBASE PUSH METHOD

};



