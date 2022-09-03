require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = require("./config/corsOptions");
const apiRoutes = require("./routes");

const app = express();

// Setup cors
app.use(cors(corsOptions));

// Setup cookie parser
app.use(cookieParser());

// Parse JSON
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api", apiRoutes);

module.exports = app;
