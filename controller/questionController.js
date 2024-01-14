const dbConnection = require("../db/dbConfig");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

async function postQuestion(req, res) {
	const userid = req.user.userid;
	const generateQuestionId = () => {
		const randomBytes = crypto.randomBytes(16);
		const uuid = uuidv4({ random: randomBytes });
		return uuid;
	};
	const questionid = generateQuestionId();
	const { title, description, tag } = req.body;
	try {
		await dbConnection.query(
			"INSERT INTO questions(questionid,userid,title,description,tag) VALUES(?,?,?,?,?)",
			[questionid, userid, title, description, tag]
		);
		return res.status(StatusCodes.CREATED).json({ msg: "question posted" });
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something wrong" });
	}
}
async function allQuestions(req, res) {
	// let userid = req.user.userid;
	try {
		const [questions] = await dbConnection.query(
			"select title,description,questionid,user_name FROM questions JOIN users ON users.userid = questions.userid ORDER BY id DESC"
		);
		return res.status(StatusCodes.OK).json({ questions: questions });
	} catch (error) {
		console.log(error.message);

		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong, try again later!" });
	}
}
async function singleQuestion(req, res) {
	// let userid = req.user.userid;
	const questionid = req.params.questionid;

	console.log(questionid);
	try {
		let [question] = await dbConnection.query(
			"select * from questions where questionid=?",
			[questionid]
		);

		if (question.length == 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: `there is no question with questionid of ${questionid}` });
		} else {
			return res.status(StatusCodes.OK).send(question);
		}
	} catch (error) {
		console.log(error.message);

		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong, try again later!" });
	}
}

module.exports = { allQuestions, singleQuestion, postQuestion };
