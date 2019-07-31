const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017");
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

require("./models/Test");

const testController = require("./controllers/testController");

// create our Express app
const app = express();

app.use(cors());

app.get("/polls", (req, res) => {
  const polls = [
    {
      id: "bla-1jul80elt",
      title: "Birthday Event",
      start: "2019-06-18 09:30",
      end: "2019-06-19 09:30",
      info:
        "What should we do for our birthdays this year? Drag and drop the options until the order of importance seems fine to you.",
      options: [
        {
          title: "Radlfahren",
          id: "rad-1jvf53jcx",
          addInfo:
            "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
        },
        {
          title: "Canyoning",
          id: "can-1jvf53urh",
          addInfo:
            "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
        },
        {
          title: "Europapark",
          id: "eur-1jvf542o5",
          addInfo:
            "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
        },
        {
          title: "Go cart Driving",
          id: "goc-1jvf54cj2",
          addInfo:
            "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
        },
        {
          title: "Hatedbyall",
          id: "hat-1jvf542o8",
          addInfo:
            "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
        }
      ],
      votes: [
        {
          userId: "def",
          ranking: [
            "rad-1jvf53jcx",
            "eur-1jvf542o5",
            "can-1jvf53urh",
            "goc-1jvf54cj2"
          ]
        },
        {
          userId: "ghi",
          ranking: [
            "eur-1jvf542o5",
            "can-1jvf53urh",
            "rad-1jvf53jcx",
            "goc-1jvf54cj2"
          ]
        },
        {
          userId: "jkl",
          ranking: [
            "rad-1jvf53jcx",
            "eur-1jvf542o5",
            "can-1jvf53urh",
            "goc-1jvf54cj2"
          ]
        },
        {
          userId: "mno",
          ranking: [
            "can-1jvf53urh",
            "eur-1jvf542o5",
            "rad-1jvf53jcx",
            "goc-1jvf54cj2"
          ]
        },
        {
          userId: "pqr",
          ranking: []
        },
        {
          userId: "xxx",
          ranking: [
            "goc-1jvf54cj2",
            "eur-1jvf542o5",
            "rad-1jvf53jcx",
            "can-1jvf53urh"
          ]
        }
      ],
      status: "CLOSED"
    }
  ];
  console.log("It hit");
  // return res.send("Received a GET HTTP method");
  // TODO: Database request
  return res.json({
    polls
  });
});

app.post("/add", testController.createTest);

// import environmental variables from our variables.env file
// require("dotenv").config({ path: "variables.env" });

app.set("port", process.env.PORT || 7999);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

// done! we export it so we can start the site in start.js
module.exports = app;
