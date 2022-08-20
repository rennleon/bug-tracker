require("dotenv").config();

const express = require("express");
const server = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.DB_CONN_STR, () => {
  console.log("Connection to DB stablished");
  server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
