const Database = require("better-sqlite3");
const db = new Database("db.db");

const size = 100000;

function sqLiteInsertionTest() {
    var tableName = "PERSONN";
    var fields = "(firstname TEXT, lastname TEXT)";
    var SQLquery = `CREATE TABLE IF NOT EXISTS  ${tableName} ${fields}`;
    const createTable = db.prepare(SQLquery);
    createTable.run();

    var t0 = new Date().getTime();
    var insertQuery = db.prepare(`INSERT INTO PERSONN VALUES ($fn,$ln)`);

    const insertMany = db.transaction((data) => {
        for (const obj of data) insertQuery.run(obj);
      });

    var data = [];
    for (var i = 0; i < size; i++) {
        var obj = {
            fn : `Jimmy${i}`,
            ln : `Hendrix${i}`
        }
        data.push(obj);
    }
    insertMany(data);
    var t1 = new Date().getTime();

    console.log("insertion time: ", t1 - t0);
}

function sqLiteFetchtest() {
    var t0 = new Date().getTime();
    const stmt = db.prepare("SELECT * FROM PERSONN");
    var results = stmt.all();
    var t1 = new Date().getTime();
    console.log("Fetch time: ", t1 - t0);
}

module.exports = {
    sqLiteInsertionTest,
    sqLiteFetchtest,
    size
}