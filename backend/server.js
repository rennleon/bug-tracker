require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const corsOptions = require("./config/corsOptions");

const server = express();

const PORT = process.env.PORT || 8080;

// Setup cors
server.use(cors(corsOptions));

mongoose.connect(process.env.DB_CONN_STR, () => {
  console.log("Connection to DB stablished");
  server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
