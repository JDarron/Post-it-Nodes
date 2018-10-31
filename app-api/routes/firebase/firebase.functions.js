var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var admin = require('firebase-admin');

var serviceAccount = require("../../../config/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://postit-7a679.firebaseio.com/"
});

// define a simple route
app.get('/', function (req, res) {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

app.get('/note', function (req, res) {

    var ref = admin.database().ref();
    var childBlog = ref.child('/bloggers');
    // var userRef = childBlog.push();


    var userRef = childBlog.push({
        name: 'Christopher',
        description: 'I eat too much ice cream'
    });
    console.log('user key', userRef.key);

    var myInt = setTimeout(function () {
        console.log("Hello");
    }, 10000);
    
});

// listen for requests
app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});