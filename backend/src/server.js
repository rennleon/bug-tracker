const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.DB_CONN_STR, () => {
  console.log("Connection to DB stablished");
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
