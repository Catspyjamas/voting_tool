/* eslint-disable no-console */
import {
  collectRankingPerUserId,
  sumUpResults,
  calculateWinner,
  filterSummedUpResults,
  filterRankingPerUserId,
  filterRemainingOptions,
  findWinner
} from "../../src/lib/api";
// TESTING DATASET
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

const filteredSummedUpResults = new Map([
  ["rad", 2],
  ["can", 1],
  ["eur", 1],
  ["goc", 1]
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
  ]
};
const votes2 = [
  { userId: "abc", ranking: ["heinz", "erika", "anita", "franz", "anna"] },
  { userId: "def", ranking: ["erika", "anita", "franz", "anna", "heinz"] },
  { userId: "hij", ranking: ["anita", "franz", "anna", "heinz", "erika"] },
  { userId: "klm", ranking: ["franz", "anna", "heinz", "erika", "anita"] },
  { userId: "nop", ranking: ["anna", "heinz", "erika", "anita", "franz"] }
];

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

describe("filterSummedUpResults", () => {
  it("filters out the tuple with a given value from summedUpResults", () => {
    expect(filterSummedUpResults(summedUpResults, 0)).toEqual(
      filteredSummedUpResults
    );
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
      findWinner(poll2, votes2);
    }).toThrow();
  });
});
