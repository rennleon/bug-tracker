require("dotenv").config();

const mongoose = require("mongoose");

/** SETUP GLOBAL DB CONNECTION */
before("Connect to DB", function (done) {
  this.timeout(60_000);
  console.log("Connecting to database");
  console.time("dbConnTime");
  mongoose.connect(process.env.DB_CONN_STR, () => {
    console.timeEnd("dbConnTime");
    done();
  });
});

/** CLOSE GLOBAL DB CONNECTION */
after("Close DB connection", function (done) {
  console.log("Closing database connection");
  console.time("dbDiconnectTime");
  mongoose.connection.close(false, () => {
    console.timeEnd("dbDiconnectTime");
    done();
  });
});
