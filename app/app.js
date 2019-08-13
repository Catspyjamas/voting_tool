const express = require("express");
const cors = require("cors");
const { catchErrors } = require("./handlers/errorHandlers");
const authHandler = require("./handlers/authHandler");
const pollHandler = require("./handlers/pollHandler");
const bodyParser = require("body-parser");

require("./db");

const pollController = require("./controllers/pollController");
const votesController = require("./controllers/votesController");

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

app.post(
  "/polls",
  catchErrors(authHandler.findUser),
  catchErrors(pollController.createPoll)
);

app.get(
  "/polls/:pollId",
  catchErrors(pollHandler.findPoll),
  catchErrors(pollController.getPoll)
);

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

// GET /polls/:pollId/votes zeigt poll mit den Results, aber nur bei CLOSED
// GET /polls/:pollId/votes/:userId - holt eine Vote
// POST /polls/:pollId/votes/- erstellt eine neue Vote (nur bei OPEN)
// PATCH /polls/:pollId/votes/:userId - updated ein Vote mit der ID (nur bei OPEN)
// DELETE /polls/:pollId/votes/:userId - löscht ein Vote mit der ID (nur bei OPEN)

app.get(
  "/polls/:pollId/votes",
  catchErrors(authHandler.findUser),
  catchErrors(pollHandler.findPoll),
  catchErrors(votesController.getVotes)
);

app.get(
  "/polls/:pollId/votes/:userId",
  catchErrors(authHandler.findUser),
  catchErrors(pollHandler.findPoll),
  catchErrors(votesController.getVote)
);

app.post(
  "/polls/:pollId/votes",
  catchErrors(authHandler.findUser),
  catchErrors(pollHandler.findPoll),
  catchErrors(votesController.createVote)
);
app.patch(
  "/polls/:pollId/votes/:userId",
  catchErrors(authHandler.findUser),
  catchErrors(pollHandler.findPoll),
  catchErrors(votesController.updateVote)
);
app.delete(
  "/polls/:pollId/votes/:userId",
  catchErrors(authHandler.findUser),
  catchErrors(pollHandler.findPoll),
  catchErrors(votesController.deleteVote)
);

module.exports = app;
