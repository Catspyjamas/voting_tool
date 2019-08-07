const User = require("../models/User");
const Poll = require("../models/Poll");

require("./db.js");

//mongoose only gives us database objects. If we compare those to plain old JavaScript APi objects, tests will fail
//in our app, the data is stringified by res.json, JSON.parse is done by supertest
function toPojo(object) {
  return JSON.parse(JSON.stringify(object));
}

async function createDummyData() {
  const asterix = await new User({ firstName: "Asterix", token: "a" }).save();
  const obelix = await new User({ firstName: "Obelix", token: "b" }).save();
  const miraculix = await new User({
    firstName: "Miraculix",
    token: "c"
  }).save();
  const poll = await new Poll({
    title: "Birthday Event",
    start: "2019-06-18 09:30",
    creator: asterix._id,
    end: "2019-06-19 09:30",
    description:
      "What should we do for our birthdays this year? Drag and drop the options until the order of importance seems fine to you.",
    options: [
      {
        title: "Radlfahren",
        description:
          "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
      },
      {
        title: "Canyoning",
        description:
          "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
      },
      {
        title: "Europapark",
        description:
          "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
      },
      {
        title: "Go cart Driving",
        description:
          "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
      },
      {
        title: "Hatedbyall",
        description:
          "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
      }
    ],
    votes: [],
    status: "OPEN"
  }).save();

  return {
    asterix: toPojo(asterix),
    obelix: toPojo(obelix),
    miraculix: toPojo(miraculix),
    poll: toPojo(poll)
  };
}

module.exports = {
  createDummyData
};
