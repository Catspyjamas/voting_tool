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
  const gutemine = await new User({
    firstName: "Gutemine",
    token: "e"
  }).save();
  const automatix = await new User({
    firstName: "Automatix",
    token: "f"
  }).save();
  const troubadix = await new User({
    firstName: "Troubardix",
    token: "g"
  }).save();
  const idefix = await new User({
    firstName: "Troubardix",
    token: "h"
  }).save();
  const majestix = await new User({
    firstName: "Troubardix",
    token: "i"
  }).save();
  const falbala = await new User({
    firstName: "Falbala",
    token: "j"
  }).save();
  const methusalix = await new User({
    firstName: "Methusalix",
    token: "k"
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
  const vote4 = await new Vote({
    userId: verleihnix._id,
    ranking: [
      closedPoll.options[4]._id,
      closedPoll.options[3]._id,
      closedPoll.options[1]._id,
      closedPoll.options[0]._id,
      closedPoll.options[2]._id
    ]
  }).save();
  const vote5 = await new Vote({
    userId: gutemine._id,
    ranking: [
      closedPoll.options[3]._id,
      closedPoll.options[2]._id,
      closedPoll.options[0]._id,
      closedPoll.options[1]._id,
      closedPoll.options[4]._id
    ]
  }).save();
  const vote6 = await new Vote({
    userId: automatix._id,
    ranking: [
      closedPoll.options[1]._id,
      closedPoll.options[0]._id,
      closedPoll.options[4]._id,
      closedPoll.options[2]._id,
      closedPoll.options[3]._id
    ]
  }).save();
  const vote7 = await new Vote({
    userId: troubadix._id,
    ranking: [
      closedPoll.options[0]._id,
      closedPoll.options[2]._id,
      closedPoll.options[1]._id,
      closedPoll.options[4]._id,
      closedPoll.options[3]._id
    ]
  }).save();
  const vote8 = await new Vote({
    userId: idefix._id,
    ranking: [
      closedPoll.options[0]._id,
      closedPoll.options[1]._id,
      closedPoll.options[4]._id,
      closedPoll.options[2]._id,
      closedPoll.options[3]._id
    ]
  }).save();
  const vote9 = await new Vote({
    userId: majestix._id,
    ranking: [
      closedPoll.options[1]._id,
      closedPoll.options[0]._id,
      closedPoll.options[4]._id,
      closedPoll.options[3]._id,
      closedPoll.options[2]._id
    ]
  }).save();
  const vote10 = await new Vote({
    userId: falbala._id,
    ranking: [
      closedPoll.options[4]._id,
      closedPoll.options[3]._id,
      closedPoll.options[0]._id,
      closedPoll.options[2]._id,
      closedPoll.options[1]._id
    ]
  }).save();
  const vote11 = await new Vote({
    userId: methusalix._id,
    ranking: [
      closedPoll.options[1]._id,
      closedPoll.options[0]._id,
      closedPoll.options[3]._id,
      closedPoll.options[4]._id,
      closedPoll.options[2]._id
    ]
  }).save();
  openPoll.votes.push(vote1._id, vote2._id);
  await openPoll.save();
  closedPoll.votes.push(
    vote4._id,
    vote5._id,
    vote6._id,
    vote7._id,
    vote8._id,
    vote9._id,
    vote10._id,
    vote11._id
  );
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
