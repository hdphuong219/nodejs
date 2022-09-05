var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "training"
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected Successfully!");
});
module.exports = conn;
