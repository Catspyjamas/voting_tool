/* eslint-disable no-console */
import {
  sumUpResults,
  collectRankingPerUserId,
  getTopOptionPerUserId
} from "../../src/lib/api";
const votes = [
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
];

const expectedRankingPerUserId = new Map([
  ["def", ["rad-1jvf53jcx", "eur-1jvf542o5", "can-1jvf53urh", "goc-1jvf54cj2"]],
  ["ghi", ["eur-1jvf542o5", "can-1jvf53urh", "rad-1jvf53jcx", "goc-1jvf54cj2"]],
  ["jkl", ["rad-1jvf53jcx", "eur-1jvf542o5", "can-1jvf53urh", "goc-1jvf54cj2"]],
  ["mno", ["can-1jvf53urh", "eur-1jvf542o5", "rad-1jvf53jcx", "goc-1jvf54cj2"]],
  ["xxx", ["goc-1jvf54cj2", "eur-1jvf542o5", "rad-1jvf53jcx", "can-1jvf53urh"]]
]);

const expectedTopOptionPerUserId = new Map([
  ["def", "rad-1jvf53jcx"],
  ["ghi", "eur-1jvf542o5"],
  ["jkl", "rad-1jvf53jcx"],
  ["mno", "can-1jvf53urh"],
  ["xxx", "goc-1jvf54cj2"]
]);

describe("collectRankingPerUserId", () => {
  it("returns a map of [userId, [ranking]] for every user who actually voted", () => {
    expect(collectRankingPerUserId(votes)).toEqual(expectedRankingPerUserId);
  });
});

describe("getTopOptionPerUserId", () => {
  it("returns a map of [userId, optionId]", () => {
    expect(getTopOptionPerUserId(expectedRankingPerUserId)).toEqual(
      expectedTopOptionPerUserId
    );
  });
});

describe("sumUpResults", () => {
  it("returns the map we want on first call, and then doesnt include removed things in second call", () => {
    // * Function Parameters
    let options = [
      "goc-1jvf54cj2",
      "eur-1jvf542o5",
      "rad-1jvf53jcx",
      "can-1jvf53urh",
      "hat-1jvf542o8"
    ];

    let expectedMap = new Map([
      ["goc-1jvf54cj2", 1],
      ["eur-1jvf542o5", 1],
      ["can-1jvf53urh", 1],
      ["hat-1jvf542o8", 0],
      ["rad-1jvf53jcx", 2]
    ]);

    const summedUpResults = sumUpResults(options, expectedTopOptionPerUserId);
    expect(summedUpResults).toEqual(expectedMap);
    // // removes it from options, and everyones user rankings
    // // * in reality, this is with removeLeastVoted() - or something
    // // in our test, we can change the objects above here:
    // options = ["goc-1jvf54cj2", "rad-1jvf53jcx"];
    // expectedMap = new Map();
    // expectedMap.set("goc-1jvf54cj2", 2);
    // expectedMap.set("rad-1jvf53jcx", 1);

    // const secondResultsMap = sumUpResults(options, topOptionPerUserId);
    // expect(secondResultsMap).toEqual(expectedMap);
  });
});
