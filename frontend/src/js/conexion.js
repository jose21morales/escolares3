// import mysql from 'mysql';
let mysql = require('mysql');

let conn = mysql.createConnection({
    host: "localhost",
    database: "escolares",
    user: "root",
    password: ""
});

conn.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected!");
});

conn.end();