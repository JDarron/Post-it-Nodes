const firebase = require('firebase-admin');
const serviceAccount = require("../../config/serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://postit-7a679.firebaseio.com/"
});

const db = firebase.database().ref();

exports.createNote = (req, res) => {

    db.push(
        req.body,
        err => {
            if (err) console.error(err);
            else {
                res.json({
                    message: "Success!",
                    result: true
                });
            }
        }); // END FIREBASE PUSH METHOD

};

exports.deleteNote = (req, res) => {
    db.child(req.params.id).remove(err => {
        if (err) console.error(err);
        else {
            res.json({
                message: "Success!",
                result: true
            });
        }
    });
};


