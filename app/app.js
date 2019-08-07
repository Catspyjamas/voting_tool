const express = require("express");
const cors = require("cors");
const { catchErrors } = require("./handlers/errorHandlers");
const authHandler = require("./handlers/authHandler");
const bodyParser = require("body-parser");

require("./db");

const pollController = require("./controllers/pollController");

const userController = require("./controllers/userController");

// create our Express app
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get("/polls", catchErrors(pollController.getPolls));

// GET /polls - holt alle Polls
// POST /polls - erstellt ein neues Poll
// GET /polls/:pollId - holt ein Poll mit der ID
// PUT /polls/:pollId - updated ein Poll mit der ID -- aber ersetzt immer das ganze Object in der Datenbank
// PATCH /polls/:pollId - updated ein Attribut im Poll mit der ID. Values, die nicht geupdated werden sollen, werden bei der Request rausgelassen

// DELETE /polls/:pollId - löscht ein Poll mit der ID

app.post("/polls", catchErrors(pollController.createPoll));

// /polls/:pollId/votes/:userId

// /votes/:voteId

app.get("/polls/:pollId", catchErrors(pollController.getPoll));

app.patch(
  "/polls/:pollId",
  catchErrors(authHandler.findUser),
  catchErrors(pollController.updatePoll)
);

app.delete(
  "/polls/:pollId",
  catchErrors(authHandler.findUser),
  catchErrors(pollController.deletePoll)
);

// import environmental variables from our variables.env file
// require("dotenv").config({ path: "variables.env" });

// // done! we export it so we can start the site in start.js
module.exports = app;
