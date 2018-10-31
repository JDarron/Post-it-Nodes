const express = require("express");
const router = express.Router();
const noteCtrl = require("../controllers/note.ctrl");

router.post("/note", noteCtrl.createNote);

module.exports = router;