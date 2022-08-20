require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const corsOptions = require("./config/corsOptions");
const apiRoutes = require("./routes");

const server = express();

const PORT = process.env.PORT || 8080;

// Setup cors
server.use(cors(corsOptions));

// Setup cookie parser
server.use(cookieParser());

// Parse JSON
server.use(express.json());

// Parse Form Data
server.use(express.urlencoded({ extended: false }));

// API Routes
server.use("/api", apiRoutes);

mongoose.connect(process.env.DB_CONN_STR, () => {
  console.log("Connection to DB stablished");
  server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
