const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { catchErrors } = require("./handlers/errorHandlers");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://127.0.0.1:27017");
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

//Remember: require schema and controller BEFORE creating express app
require("./models/Polls");

const pollController = require("./controllers/pollController");

// create our Express app
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get("/polls", (req, res) => {
  console.log("It hit");
  // TODO: Database request
  return res.send("Received a GET HTTP method");
});

app.post("/add", catchErrors(pollController.createPoll));

// import environmental variables from our variables.env file
// require("dotenv").config({ path: "variables.env" });

app.set("port", process.env.PORT || 7999);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

// // done! we export it so we can start the site in start.js
// module.exports = app;
