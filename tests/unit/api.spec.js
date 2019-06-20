import {
  collectRankingPerUserId,
  sumUpResults,
  calculateWinner,
  filterRankingPerUserId,
  filterRemainingOptions,
  findWinner
} from "../../src/lib/api";
// TESTING DATASET

const poll1 = {
  id: "bla-1jul80elt",
  title: "Birthday Event",
  start: "2019-07-28 09:30",
  end: "2019-07-31 09:30",
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
  status: "OPEN"
};

const votes = [
  {
    userId: "def",
    ranking: ["rad", "eur", "can", "goc"]
  },
  {
    userId: "ghi",
    ranking: ["eur", "can", "rad", "goc"]
  },
  {
    userId: "jkl",
    ranking: ["rad", "eur", "can", "goc"]
  },
  {
    userId: "mno",
    ranking: ["can", "eur", "rad", "goc"]
  },
  {
    userId: "pqr",
    ranking: []
  },
  {
    userId: "xxx",
    ranking: ["goc", "eur", "rad", "can"]
  }
];
const options = ["goc", "eur", "rad", "can", "hat"];

const rankingPerUserId = new Map([
  ["def", ["rad", "eur", "can", "goc"]],
  ["ghi", ["eur", "can", "rad", "goc"]],
  ["jkl", ["rad", "eur", "can", "goc"]],
  ["mno", ["can", "eur", "rad", "goc"]],
  ["xxx", ["goc", "eur", "rad", "can"]]
]);

const summedUpResults = new Map([
  ["rad", 2],
  ["can", 1],
  ["eur", 1],
  ["goc", 1],
  ["hat", 0]
]);

const filteredRankingPerUserId = new Map([
  ["def", ["can", "goc"]],
  ["ghi", ["can", "goc"]],
  ["jkl", ["can", "goc"]],
  ["mno", ["can", "goc"]],
  ["xxx", ["goc", "can"]]
]);

const filteredRemainingOptions = ["goc", "can", "hat"];

const poll2 = {
  options: [
    { id: "heinz" },
    { id: "erika" },
    { id: "anita" },
    { id: "franz" },
    { id: "anna" }
  ],
  votes: [
    { userId: "abc", ranking: ["heinz", "erika", "anita", "franz", "anna"] },
    { userId: "def", ranking: ["erika", "anita", "franz", "anna", "heinz"] },
    { userId: "hij", ranking: ["anita", "franz", "anna", "heinz", "erika"] },
    { userId: "klm", ranking: ["franz", "anna", "heinz", "erika", "anita"] },
    { userId: "nop", ranking: ["anna", "heinz", "erika", "anita", "franz"] }
  ]
};
let absoluteMajorityVote = new Map([["rad", 14], ["can", 4], ["eur", 2]]);

describe("collectRankingPerUserId", () => {
  it("returns a map of [userId, [ranking]] for every user who actually voted", () => {
    expect(collectRankingPerUserId(votes)).toEqual(rankingPerUserId);
  });
});

describe("sumUpResults", () => {
  it("returns a map of [topOptionId, sumOfTopVotes]", () => {
    expect(sumUpResults(options, rankingPerUserId)).toEqual(summedUpResults);
  });
});

describe("calculateWinner", () => {
  it("returns a winner if one of the values makes up more than half of the total of all values", () => {
    expect(calculateWinner(absoluteMajorityVote)).toEqual({
      winner: "rad",
      votes: 14
    });
  });
  it("returns null on first voting round", () => {
    expect(calculateWinner(summedUpResults)).toEqual(null);
  });
});

describe("filterRankingPerUserId", () => {
  it("filters out certain keys from the remaining options in rankingPerUserId", () => {
    expect(filterRankingPerUserId(rankingPerUserId, ["rad", "eur"])).toEqual(
      filteredRankingPerUserId
    );
  });
});

describe("filterRemainingOptions", () => {
  it("filters out certain keys from remainingOptions", () => {
    expect(filterRemainingOptions(options, ["rad", "eur"])).toEqual(
      filteredRemainingOptions
    );
  });
});

describe("findWinner", () => {
  it("throws an error if there's no absolute majority after a certain amount of counting rounds", () => {
    expect(() => {
      findWinner(poll2);
    }).toThrow();
  });

  it("returns a winnerObject for a given poll", () => {
    expect(findWinner(poll1)).toHaveProperty("result");
  });
  it("returns five votes for the given winner", () => {
    expect(findWinner(poll1).result.votes).toEqual(5);
  });
});
