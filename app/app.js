//Load env variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { catchErrors } = require("./handlers/errorHandlers");
const authHandlers = require("./handlers/authHandlers");
const pollHandler = require("./handlers/pollHandler");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("./db");
require("./handlers/passport");

const pollController = require("./controllers/pollController");
const votesController = require("./controllers/votesController");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");

// create our Express app
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get("/polls", catchErrors(pollController.getPolls));

// GET /polls - holt alle Polls
// POST /polls - erstellt ein neues Poll
// GET /polls/:pollId - holt ein Poll mit der ID
// PUT /polls/:pollId - updated ein Poll mit der ID -- aber ersetzt immer das ganze Object in der Datenbank
// PATCH /polls/:pollId - updated ein Attribut im Poll mit der ID. Values, die nicht geupdated werden sollen, werden bei der Request rausgelassen

// DELETE /polls/:pollId - löscht ein Poll mit der ID

app.post(
  "/polls",
  catchErrors(authHandlers.findUser),
  catchErrors(pollController.createPoll)
);

app.get(
  "/polls/:pollId",
  catchErrors(pollHandler.findPoll),
  catchErrors(pollController.getPoll)
);

app.patch(
  "/polls/:pollId",
  catchErrors(authHandlers.findUser),
  catchErrors(pollController.updatePoll)
);

app.delete(
  "/polls/:pollId",
  catchErrors(authHandlers.findUser),
  catchErrors(pollController.deletePoll)
);

// GET /polls/:pollId/votes zeigt poll mit den Results, aber nur bei CLOSED
// GET /polls/:pollId/votes/:userId - holt eine Vote
// POST /polls/:pollId/votes/- erstellt eine neue Vote (nur bei OPEN)
// PATCH /polls/:pollId/votes/:userId - updated ein Vote mit der ID (nur bei OPEN)
// DELETE /polls/:pollId/votes/:userId - löscht ein Vote mit der ID (nur bei OPEN)

app.get(
  "/polls/:pollId/votes",
  catchErrors(authHandlers.findUser),
  catchErrors(pollHandler.findPoll),
  catchErrors(votesController.getVotes)
);

app.get(
  "/polls/:pollId/votes/:userId",
  catchErrors(authHandlers.findUser),
  catchErrors(votesController.getVote)
);

app.post(
  "/polls/:pollId/votes",
  catchErrors(authHandlers.findUser),
  catchErrors(pollHandler.findPoll),
  catchErrors(votesController.createVote)
);
app.patch(
  "/polls/:pollId/votes/:userId",
  catchErrors(authHandlers.findUser),
  catchErrors(votesController.updateVote)
);
app.delete(
  "/polls/:pollId/votes/:userId",
  catchErrors(authHandlers.findUser),
  catchErrors(pollHandler.findPoll),
  catchErrors(votesController.deleteVote)
);

// GET /user: Finds a user and returns it
// POST /signup/ Create a new user
// PUT /users/:userId Update user
// PUT /users/:userId Delete user

app.get(
  "/user",
  catchErrors(authHandlers.findUser),
  catchErrors(userController.getUser)
);

app.post(
  "/signup",
  authHandlers.validateSignup,
  catchErrors(userController.createUser),
  catchErrors(authController.login)
);

module.exports = app;
