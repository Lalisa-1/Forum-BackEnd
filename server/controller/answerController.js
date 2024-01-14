const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function postAnswer(req, res) {
	const userid = req.user.userid;
	const questionid = req.params.questionid;
	const { answer } = req.body;
	try {
		await dbConnection.query(
			"INSERT INTO answers(userid,questionid,answer) VALUES(?,?,?)",
			[userid, questionid, answer]
		);
		return res.status(StatusCodes.CREATED).json({ msg: "answer posted" });
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something wrong" });
	}
}
async function allAnswers(req, res) {
	const questionid = req.params.questionid;
	try {
		const getAnswers = `SELECT answers.*,users.user_name FROM answers LEFT JOIN users ON answers.userid = users.userid where answers.questionid=? `;
		const [answers] = await dbConnection.query(getAnswers, [questionid]);
		if (answers.length == 0) {
			return res.status(StatusCodes.BAD_REQUEST).json({ msg: "no answer" });
		} else {
			return res.status(StatusCodes.OK).json({ answers: answers });
		}
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong, try again later!" });
	}
}

module.exports = { allAnswers, postAnswer };
