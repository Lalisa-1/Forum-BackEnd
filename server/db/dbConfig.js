const mysql2 = require("mysql2");

// const dbconnection = mysql2.createPool({
// 	socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
// 	user: process.env.USER,
// 	database: process.env.DATABASE,
// 	host: "localhost",
// 	password: process.env.PASSWORD,
// 	connectionLimit: 10,
// });
const dbconnection = mysql2.createPool({
	socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
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

module.exports = dbconnection.promise();
