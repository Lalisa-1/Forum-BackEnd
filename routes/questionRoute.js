const express = require("express");
const router = express.Router();

const {
	allQuestions,
	singleQuestion,
	postQuestion,
} = require("../controller/questionController");
// all question route
router.get("/all-questions", allQuestions);
// single question route
router.get("/:questionid", singleQuestion);
// question post route
router.post("/post-question", postQuestion);
module.exports = router;
