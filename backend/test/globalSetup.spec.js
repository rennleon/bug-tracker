require("dotenv").config();

const mongoose = require("mongoose");

/** SETUP GLOBAL DB CONNECTION */
before("Connect to DB", function (done) {
  this.timeout(120_000);
  mongoose.connect(process.env.TEST_DB_CONN_STR, done);
});

/** CLOSE GLOBAL DB CONNECTION */
after("Close DB connection", function (done) {
  this.timeout(120_000);
  mongoose.connection.close(false, done);
});
