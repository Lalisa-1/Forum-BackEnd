require("dotenv").config();

const express = require("express");
const app = express();
const port = 5500;

const cors = require("cors");

app.use(cors());

// database connection
const dbconnection = require("./db/dbConfig");

// user routes middleware file
const userRoutes = require("./routes/userRoute");

// question routes middleware file
const questionsRoutes = require("./routes/questionRoute");

// answer routes middleware file
const answerRoutes = require("./routes/answerRoute");

// authentication middleware file
const authMiddleware = require("./middleware/authMiddleware");

// json middleware to export json data
app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);

// question routes middleware
app.use("/api/questions", authMiddleware, questionsRoutes);

// answer routes middleware
app.use("/api/answers", authMiddleware, answerRoutes);

async function start() {
	try {
		const result = await dbconnection.execute("select'test'");
		app.listen(port);
		console.log("database connection established");
		console.log(`listening on ${port}`);
	} catch (error) {
		console.log(error.message);
	}
}
start();
