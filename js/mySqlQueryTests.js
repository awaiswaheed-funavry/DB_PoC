var mysql = require('mysql');
var con;

var size = 100000;

function connect() {
  con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    insecureAuth: true,
    database: "testdb"
  });
  con.connect(function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Connected!");
      var createTableQuery = "CREATE TABLE IF NOT EXISTS PERSON (firstname TEXT, lastname TEXT)";
      con.query(createTableQuery, function (err, result) {
        if (err) throw err;
      });
    }
  });
}

function insert() {
  var t0 = new Date().getTime();
  var sql = "INSERT INTO person (firstname, lastname) VALUES ?";
  var values = [];
  for (var i = 0; i < size; i++) {
    var row = [`Jimmy${i}`, `Hendrix${i}`];
    values.push(row);
  }
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    var t1 = new Date().getTime();
    console.log("Insertion Time: ", t1-t0);
  });
}

function fetch() {
  var t0 = new Date().getTime();
  con.query("SELECT * FROM person", function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    var t1 = new Date().getTime();
    console.log("fetch Time: ", t1-t0);
    con.end();
  });
}


module.exports = {
  connect,
  insert,
  fetch,
  size
};