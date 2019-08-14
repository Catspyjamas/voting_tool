import randomColor from "randomcolor";
import axios from "axios";

const possiblePollStates = {
  OPEN: "OPEN",
  DRAFT: "DRAFT",
  CLOSED: "CLOSED"
};

const authToken = "a";

const url = "http://127.0.0.1:7999";
const polls = readFromLocalStorage() || [
  {
    id: "bla-1jul80elt",
    title: "Birthday Event",
    start: "2019-06-18 09:30",
    end: "2019-06-19 09:30",
    description:
      "What should we do for our birthdays this year? Drag and drop the options until the order of importance seems fine to you.",
    options: [
      {
        title: "Radlfahren",
        id: "rad-1jvf53jcx",
        description:
          "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
      },
      {
        title: "Canyoning",
        id: "can-1jvf53urh",
        description:
          "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
      },
      {
        title: "Europapark",
        id: "eur-1jvf542o5",
        description:
          "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
      },
      {
        title: "Go cart Driving",
        id: "goc-1jvf54cj2",
        description:
          "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
      },
      {
        title: "Hatedbyall",
        id: "hat-1jvf542o8",
        description:
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
////////////////////////////////////////////////////////
//localStorage Functions

function saveToLocalStorage() {
  localStorage.setItem("polls", JSON.stringify(polls));
}

function readFromLocalStorage() {
  return JSON.parse(localStorage.getItem("polls"));
}
////////////////////////////////////////////////////////

// export function fetchPolls() {
//   console.log("fetchPolls");
//   return axios
//     .get(`${url}/polls`)
//     .then(function(response) {
//       console.log("first then");
//       console.log("resp ", response);
//       return response.data.polls;
//     })
//     .catch(error => {
//       console.log("AHHHHHH");
//       console.log(error);
//     });
// }

export async function fetchPolls() {
  try {
    const response = await axios.get(`${url}/polls`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchPoll(pollId) {
  try {
    const response = await axios.get(`${url}/polls/${pollId}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

// export async function savePoll(newPollObject) {
//   const pollIndex = polls.findIndex(poll => poll.id === newPollObject.id);
//   if (pollIndex === -1) {
//     polls.push(newPollObject);
//   } else {
//     polls.splice(pollIndex, 1, newPollObject);
//   }
//   saveToLocalStorage();
// }

export async function savePoll(newPollObject, pollId) {
  // if there's no pollId, it's a post request
  if (!pollId) {
    try {
      const response = await axios.post(`${url}/polls`, newPollObject, {
        headers: {
          Authorization: authToken,
          ContentType: "application/json"
        },
        responseType: "json"
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  // if there is a pollId, it's a patch request
  try {
    const response = await axios.patch(
      `${url}/polls/${pollId}`,
      newPollObject,
      {
        headers: {
          Authorization: authToken,
          ContentType: "application/json"
        },
        responseType: "json"
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deletePoll(pollId) {
  const pollIndex = polls.findIndex(poll => poll.id === pollId);
  if (pollIndex === -1) {
    throw new Error(`No poll found with pollId ${pollId}`);
  } else {
    confirm("Are you sure you want to delete this poll?");
    polls.splice(pollIndex, 1);
  }
  saveToLocalStorage();
}

export async function saveVote(pollId, newVoteObject) {
  try {
    const pollIndex = await polls.findIndex(poll => poll.id === pollId);
    //add poll.votes if it doesn't exist
    if (!polls[pollIndex].votes) {
      polls[pollIndex].votes = [];
    }
    const userIndex = polls[pollIndex].votes.findIndex(
      vote => vote.userId === newVoteObject.userId
    );
    if (userIndex === -1) {
      polls[pollIndex].votes.push(newVoteObject);
    } else {
      polls[pollIndex].votes.splice(userIndex, 1, newVoteObject);
    }
    saveToLocalStorage();
  } catch (error) {
    console.log("BOO");
    console.log(error);
  }
}

export async function fetchVote(pollId, userId) {
  const poll = await fetchPoll(pollId);
  const vote = poll.votes.find(vote => {
    return vote.userId === userId;
  });
  if (!vote) {
    throw new Error("notVoted");
  }
  return vote;
}

export async function fetchOption(pollId, optionId) {
  const poll = await fetchPoll(pollId);
  return poll.options.find(option => option.id === optionId);
}

export function getOption(poll, optionId) {
  return poll.options.find(option => option.id === optionId);
}

// Filtering Functions for Polls
export function isOpen(poll) {
  return poll.status === possiblePollStates.OPEN;
}
export function isDraft(poll) {
  return poll.status === possiblePollStates.DRAFT;
}
export function isClosed(poll) {
  return poll.status === possiblePollStates.CLOSED;
}

export async function openPoll(pollId) {
  const pollIndex = polls.findIndex(poll => poll.id === pollId);
  polls[pollIndex].status = possiblePollStates.OPEN;
  saveToLocalStorage();
}

export async function closePoll(pollId) {
  const pollIndex = polls.findIndex(poll => poll.id === pollId);
  polls[pollIndex].status = possiblePollStates.CLOSED;
  saveToLocalStorage();
}

export async function draftPoll(pollId) {
  const pollIndex = polls.findIndex(poll => poll.id === pollId);
  polls[pollIndex].status = possiblePollStates.DRAFT;
  saveToLocalStorage();
}

//////////////////////
// Helper Functions for getting vote Results

export function getPoll(poll) {
  return poll.options.map(option => option.id);
}

export function findSmallestValue(map) {
  const allValues = [];
  for (const value of map.values()) {
    allValues.push(value);
  }
  return Math.min(...allValues);
}

export function findKeyOfSmallestNumber(map, minNumber) {
  let minKeys = [];
  map.forEach((value, key) => {
    if (value === minNumber) {
      minKeys.push(key);
    }
  });
  return minKeys;
}

function countPercentage(array, number) {
  const total = array.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
  return (number * 100) / total;
}

//////////////////////

export function collectRankingPerUserId(votesArray) {
  const rankingPerUserId = new Map();

  for (const vote of votesArray) {
    if (rankingPerUserId.has(vote.userId)) {
      throw new Error(`Duplicate vote for user "${vote.userId}"`);
    }
    if (vote.ranking.length === 0) {
      continue;
    }
    rankingPerUserId.set(vote.userId, vote.ranking);
  }
  return rankingPerUserId;
}

export function sumUpResults(remainingOptions, rankingPerUserId) {
  const summedUpResults = new Map();
  //initializes map of all remainingOptions with value of 0
  for (const optionId of remainingOptions) {
    summedUpResults.set(optionId, 0);
  }
  // Counts up first options of rankingPerUserId
  for (const ranking of rankingPerUserId.values()) {
    summedUpResults.set(ranking[0], summedUpResults.get(ranking[0]) + 1);
    //    Or with reference to object: summedUpResults.get(ranking[0]).count++;
  }
  return summedUpResults;
}

export function calculateWinner(summedUpResults) {
  let votesCount = 0;
  summedUpResults.forEach(value => {
    votesCount = votesCount + value;
  });
  const majorityLimit = votesCount / 2;
  let result = null;
  summedUpResults.forEach((value, key) => {
    if (value > majorityLimit) {
      result = { winner: key, votes: value };
    }
  });
  return result;
}

export function filterRankingPerUserId(rankingPerUserId, minKeys) {
  //Delete minKeys from rankingPerUserId
  const filteredRankingPerUserId = new Map(
    [...rankingPerUserId].map(([key, value]) => {
      return [
        key,
        value.filter(id => {
          return !minKeys.includes(id);
        })
      ];
    })
  );
  // console.log("RANKING");
  // console.log(JSON.stringify(filteredRankingPerUserId, null, 2));
  return filteredRankingPerUserId;
}

export function filterRemainingOptions(remainingOptions, minKeys) {
  //Delete minKeys from remainingOptions
  const filteredRemainingOptions = remainingOptions.filter(id => {
    return !minKeys.includes(id);
  });
  return filteredRemainingOptions;
}

class PollException extends Error {
  constructor(message, history) {
    super(message);
    this.history = history;
  }
}

//////////////////////////////////////
//Helper Functions for findWinner

function firstRound(poll) {
  const remainingOptions = getPoll(poll);
  const rankingPerUserId = collectRankingPerUserId(poll.votes);
  const summedUpResults = sumUpResults(remainingOptions, rankingPerUserId);
  const result = calculateWinner(summedUpResults);
  return {
    minValue: null,
    minKeys: null,
    remainingOptions,
    rankingPerUserId,
    summedUpResults,
    result
  };
}

function nextRound(
  lastRoundResults,
  lastRoundRanking,
  lastRoundRemainingOptions
) {
  const minValue = findSmallestValue(lastRoundResults);
  const minKeys = findKeyOfSmallestNumber(lastRoundResults, minValue);
  const rankingPerUserId = filterRankingPerUserId(lastRoundRanking, minKeys);
  const remainingOptions = filterRemainingOptions(
    lastRoundRemainingOptions,
    minKeys
  );
  const summedUpResults = sumUpResults(remainingOptions, rankingPerUserId);
  const result = calculateWinner(summedUpResults);
  return {
    minValue,
    minKeys,
    remainingOptions,
    rankingPerUserId,
    summedUpResults,
    result
  };
}
////////////////////////////////////
export function findWinner(poll) {
  const roundHistory = [];
  const maxRounds = getPoll(poll).length;

  const firstRoundResults = firstRound(poll);
  roundHistory.push(firstRoundResults);

  while (
    roundHistory[roundHistory.length - 1].result === null &&
    roundHistory.length < maxRounds
  ) {
    const {
      summedUpResults,
      rankingPerUserId,
      remainingOptions
    } = roundHistory[roundHistory.length - 1];
    roundHistory.push(
      nextRound(summedUpResults, rankingPerUserId, remainingOptions)
    );
  }
  const result = roundHistory[roundHistory.length - 1].result;
  //check if there's still no winner
  if (result === null) {
    throw new PollException("Couldn't find a winner", roundHistory);
  }

  return { roundHistory, result };
}

export function prepareRoundInfo(poll, roundHistory) {
  return roundHistory.map(round => {
    //Make array from counts per round
    const numbersPerRound = Array.from(round.summedUpResults.values());
    //Make array from optionIds
    const optionsPerRound = Array.from(round.summedUpResults.keys());
    const titleOfOptionsPerRound = optionsPerRound.map(optionId => {
      return `${getOption(poll, optionId).title}`;
    });
    const arraysFromSummedUpResults = titleOfOptionsPerRound.map(
      (optionTitle, index) => {
        return [
          optionTitle,
          numbersPerRound[index],
          countPercentage(numbersPerRound, numbersPerRound[index])
        ];
      }
    );
    //Make array from options that were selected out
    const minKeyTitlesPerRound = round.minKeys
      ? //if there are several optionIds, get their titles
        round.minKeys.map(optionId => {
          return getOption(poll, optionId).title;
        })
      : null;
    //create a singular color per sees/id
    const colorsPerTitle = optionsPerRound.map(optionId => {
      return randomColor({
        seed: optionId
      });
    });
    return {
      //Prepare data for chartjs
      chartData: {
        datasets: [
          {
            data: numbersPerRound,
            backgroundColor: colorsPerTitle,
            borderWidth: 0,
            responsive: true
          }
        ],
        labels: titleOfOptionsPerRound
      },
      summedUpResults: arraysFromSummedUpResults,
      roundCount: round.roundCount,
      minKeys: minKeyTitlesPerRound,
      result: round.result
    };
  });
}
