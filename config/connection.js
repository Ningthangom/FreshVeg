
let mysql = require("mysql");
let connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Ning_thang_om_96",
        database: "burgers_db"
    });
};
connection.connect(function(err) {
    if (err) {
        console.error(`Error connecting: ${err.stack}`);
        return;
    }
    console.log(`Connected as id ${connection.threadId}`);
});
