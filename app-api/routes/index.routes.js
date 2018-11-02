const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/note.ctrl");

router.post("/note", ctrl.createNote);
router.delete("/note/:id", ctrl.deleteNote);

module.exports = router;