const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { catchErrors } = require("./handlers/errorHandlers");
const authHandler = require("./handlers/authHandler");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://127.0.0.1:27017");
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const pollController = require("./controllers/pollController");

const userController = require("./controllers/userController");

// create our Express app
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get("/polls", catchErrors(pollController.getPolls));

// GET /polls - holt alle Polls
// POST /polls - erstellt ein neues Poll
// GET /polls/:id - holt ein Poll mit der ID
// PUT /polls/:id - updated ein Poll mit der ID -- aber ersetzt immer das ganze Object in der Datenbank
// PATCH /polls/:id - updated ein Attribut im Poll mit der ID. Values, die nicht geupdated werden sollen, werden bei der Request rausgelassen

// DELETE /polls/:id - löscht ein Poll mit der ID

app.post("/polls", catchErrors(pollController.createPoll));

app.get("/polls/:id", catchErrors(pollController.getPoll));

app.patch(
  "/polls/:id",
  catchErrors(authHandler.findUser),
  catchErrors(pollController.updatePoll)
);

// import environmental variables from our variables.env file
// require("dotenv").config({ path: "variables.env" });

app.set("port", process.env.PORT || 7999);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

// // done! we export it so we can start the site in start.js
// module.exports = app;
