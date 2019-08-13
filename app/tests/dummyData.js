const User = require("../models/User");
const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

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
  const verleihnix = await new User({
    firstName: "Verleihnix",
    token: "d"
  }).save();
  const draftPoll = await new Poll({
    title: "Birthday Event Draft",
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
    status: "DRAFT"
  }).save();

  const closedPoll = await new Poll({
    title: "Birthday Event Closed",
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
    status: "CLOSED"
  }).save();

  const openPoll = await new Poll({
    title: "Birthday Event Open",
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

  const vote1 = await new Vote({
    userId: asterix._id,
    ranking: [
      openPoll.options[4]._id,
      openPoll.options[3]._id,
      openPoll.options[1]._id,
      openPoll.options[0]._id,
      openPoll.options[2]._id
    ]
  }).save();
  const vote2 = await new Vote({
    userId: obelix._id,
    ranking: [
      openPoll.options[3]._id,
      openPoll.options[4]._id,
      openPoll.options[2]._id,
      openPoll.options[0]._id,
      openPoll.options[1]._id
    ]
  }).save();
  const vote3 = await new Vote({
    userId: miraculix._id,
    ranking: [
      openPoll.options[3]._id,
      openPoll.options[0]._id,
      openPoll.options[1]._id,
      openPoll.options[4]._id,
      openPoll.options[2]._id
    ]
  }).save();
  openPoll.votes.push(vote1._id, vote2._id);
  await openPoll.save();
  closedPoll.votes.push(vote1._id, vote2._id, vote3._id);
  await closedPoll.save();
  return {
    asterix: toPojo(asterix),
    obelix: toPojo(obelix),
    miraculix: toPojo(miraculix),
    verleihnix: toPojo(verleihnix),
    vote1: toPojo(vote1),
    vote2: toPojo(vote2),
    vote3: toPojo(vote3),
    draftPoll: toPojo(draftPoll),
    openPoll: toPojo(openPoll),
    closedPoll: toPojo(closedPoll)
  };
}

module.exports = {
  createDummyData
};
