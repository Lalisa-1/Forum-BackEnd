// db connection
const dbconnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
	const { user_name, first_name, last_name, email, password } = req.body;
	if (!user_name || !first_name || !last_name || !email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "please provide all required fields" });
	}
	try {
		const [user] = await dbconnection.query(
			"select user_name, userid from users where user_name = ? or email = ?",
			[user_name, email]
		);
		if (user.length > 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "user already exist" });
		}
		if (password.length <= 8) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "password must be atleast 8 characters" });
		}
		// bcrypt password
		const salt = await bcrypt.genSalt(10);
		const hashedpassword = await bcrypt.hash(password, salt);
		await dbconnection.query(
			"INSERT INTO users (user_name, first_name, last_name, email, password) VALUES (?,?,?,?,?)",
			[user_name, first_name, last_name, email, hashedpassword]
		);
		return res.status(StatusCodes.CREATED).json({ msg: "user registered" });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong, try again later!" });
	}
}

async function login(req, res) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "please enter all required fields" });
	}
	try {
		const [user] = await dbconnection.query(
			"SELECT user_name, userid, password FROM users WHERE email = ?",
			[email]
		);

		if (!user || user.length == 0 || !user[0].password) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "user not found" });
		}

		// compare passwor

		const isMatch = await bcrypt.compare(password, user[0].password);

		if (!isMatch) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "invalid credential" });
		}
		const username = user[0].user_name;
		const userid = user[0].userid;
		const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		return res
			.status(StatusCodes.OK)
			.json({ msg: "user login succesful", token, username });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong, try again later!" });
	}
}
async function checkUser(req, res) {
	const username = req.user.user_name;
	const userid = req.user.userid;
	res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = { register, login, checkUser };
