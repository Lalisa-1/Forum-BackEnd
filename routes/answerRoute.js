const express = require("express");
const router = express.Router();
const { allAnswers, postAnswer } = require("../controller/answerController");

router.post("/:questionid", postAnswer);
router.get("/:questionid", allAnswers);

module.exports = router;
