const User = require("../models/User");
const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

const passportJwt = require("passport-jwt");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

require("./db.js");

//mongoose only gives us database objects. If we compare those to plain old JavaScript APi objects, tests will fail
//in our app, the data is stringified by res.json, JSON.parse is done by supertest
function toPojo(object) {
  return JSON.parse(JSON.stringify(object));
}

const obelix = {
  firstName: "Obelix",
  lastName: "Gaulois",
  email: "obelix@mail.com",
  password: "123"
};

async function createDummyData() {
  const asterix = await new User({
    firstName: "Asterix",
    lastName: "Gaulois",
    email: "asterix@mail.com",
    password: "123"
  }).save();
  const miraculix = await new User({
    firstName: "Miraculix",
    lastName: "Gaulois",
    email: "miraculix@mail.com",
    password: "123"
  }).save();
  const verleihnix = await new User({
    firstName: "Verleihnix",
    lastName: "Gaulois",
    email: "verleihnix@mail.com",
    password: "123"
  }).save();
  const gutemine = await new User({
    firstName: "Gutemine",
    lastName: "Gaulois",
    email: "gutemine@mail.com",
    password: "123"
  }).save();
  const automatix = await new User({
    firstName: "Automatix",
    lastName: "Gaulois",
    email: "automatix@mail.com",
    password: "123"
  }).save();
  const troubadix = await new User({
    firstName: "Troubardix",
    lastName: "Gaulois",
    email: "troubardix@mail.com",
    password: "123"
  }).save();
  const idefix = await new User({
    firstName: "Idefix",
    lastName: "Gaulois",
    email: "idefix@mail.com",
    password: "123"
  }).save();
  const majestix = await new User({
    firstName: "Majestix",
    lastName: "Gaulois",

    email: "majestix@mail.com",
    password: "123"
  }).save();
  const falbala = await new User({
    firstName: "Falbala",
    lastName: "Gaulois",
    email: "falbala@mail.com",
    password: "123"
  }).save();
  const methusalix = await new User({
    firstName: "Methusalix",
    lastName: "Gaulois",
    email: "methusalix@mail.com",
    password: "123"
  }).save();

  const draftPoll = await new Poll({
    title: "Birthday Event Draft",
    start: new Date(Date.UTC(2019, 11, 20, 3, 0, 0)),
    creator: asterix._id,
    end: new Date(Date.UTC(2020, 11, 20, 3, 0, 0)),
    description: "What should we do for our birthdays this year?",
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
    start: new Date(Date.UTC(2019, 11, 20, 3, 0, 0)),
    creator: asterix._id,
    end: new Date(Date.UTC(2020, 11, 20, 3, 0, 0)),
    description: "What should we do for our birthdays this year?",
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
    start: new Date(Date.UTC(2019, 11, 20, 3, 0, 0)),
    creator: asterix._id,
    end: new Date(Date.UTC(2020, 11, 20, 3, 0, 0)),
    description: "What should we do for our birthdays this year?",
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

  const openPollPojo = toPojo(openPoll);
  const vote1 = {
    ranking: [
      openPollPojo.options[1]._id,
      openPollPojo.options[3]._id,
      openPollPojo.options[2]._id,
      openPollPojo.options[4]._id,
      openPollPojo.options[0]._id
    ]
  };
  const vote2 = {
    ranking: [
      openPollPojo.options[0]._id,
      openPollPojo.options[2]._id,
      openPollPojo.options[3]._id,
      openPollPojo.options[1]._id,
      openPollPojo.options[4]._id
    ]
  };
  const vote3 = {
    ranking: [
      openPollPojo.options[3]._id,
      openPollPojo.options[2]._id,
      openPollPojo.options[4]._id,
      openPollPojo.options[1]._id,
      openPollPojo.options[0]._id
    ]
  };

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
  // openPoll.votes.push(vote1._id, vote2._id);
  // await openPoll.save();
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
    obelix,
    vote1,
    vote2,
    vote3,
    draftPoll: toPojo(draftPoll),
    openPoll: toPojo(openPoll),
    closedPoll: toPojo(closedPoll)
  };
}

module.exports = {
  createDummyData
};
