const mongoose = require("mongoose");
require("../app/models/User");
require("../app/models/Poll");
const User = mongoose.model("User");
const Poll = mongoose.model("Poll");

mongoose.connect("mongodb://127.0.0.1:27017");

mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

async function saveDummyData() {
  try {
    await mongoose.connection.dropCollection("users");
    await mongoose.connection.dropCollection("polls");
  } catch (error) {
    if (error.message !== "ns not found") {
      throw error;
    }
  }
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
  await mongoose.disconnect();

  return {
    asterix,
    obelix,
    miraculix,
    poll
  };
}

module.exports = saveDummyData();
