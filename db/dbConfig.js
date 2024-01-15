const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
	// socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
	user: process.env.DB_USER,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST,
	password: process.env.DB_PASSWORD,
	connectionLimit: 10,
});

// dbconnection.execute("select'test'", (err, result) => {
// 	if (err) {
// 		console.log(err.message);
// 	} else {
// 		console.log(result);
// 	}
// });

// Example using parameterized query with Node.js MySQL library

// let users = `CREATE TABLE users (
// 	userid INT(20) NOT NULL AUTO_INCREMENT,
//     user_name VARCHAR(20)NOT NULL,
// 	first_name VARCHAR(40)NOT NULL,
//     last_name VARCHAR(40)NOT NULL,
//     email VARCHAR(40)NOT NULL,
// 	password VARCHAR(100)NOT NULL,
// 	PRIMARY KEY (userid)

// );`;
// let questions = `CREATE TABLE questions (
//     id INT(20) NOT NULL AUTO_INCREMENT,
//     questionid VARCHAR(100) NOT NULL UNIQUE,
//     userid INT(20) NOT NULL,
//     title VARCHAR(50) NOT NULL,
//     description VARCHAR(200) NOT NULL,
//     tag VARCHAR(20),
//     PRIMARY KEY (id, questionid)
// )`;

// let answers = `CREATE TABLE answers (
//     answerid INT(20) NOT NULL AUTO_INCREMENT,
//     userid INT(20) NOT NULL,
//     questionid VARCHAR(100) NOT NULL,
//     answer VARCHAR(200) NOT NULL,
//     PRIMARY KEY(answerid));`;

module.exports = dbconnection.promise();
