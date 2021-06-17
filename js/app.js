console.log("\n\nRUNNINNGGG\n\n");

const sqLiteTests = require('./sqLiteTests');
const sqlQueryTests = require('./mySqlQueryTests');
const sqlORMTests = require('./mySqlORMTests');

// sqlORMTests.insert();
// sqlORMTests.fetch();

// sqlQueryTests.connect();
// sqlQueryTests.insert();
// sqlQueryTests.fetch();

console.log("row Count: ", sqLiteTests.size);
sqLiteTests.sqLiteInsertionTest();
sqLiteTests.sqLiteFetchtest();

