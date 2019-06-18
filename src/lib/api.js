const polls = [
  {
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
    active: true
  }
];

////////////////////////////////////////////////////////
//FUNCTIONS FOR VOTING
export async function fetchPolls() {
  return polls;
}

export async function fetchPoll(pollId) {
  return polls.find(poll => poll.id === pollId);
}

export async function savePoll(newPollObject) {
  const pollIndex = polls.findIndex(poll => poll.id === newPollObject.id);
  if (pollIndex === -1) {
    polls.push(newPollObject);
  } else {
    polls.splice(pollIndex, 1, newPollObject);
  }
}

export async function saveVote(pollId, newVoteObject) {
  const pollIndex = polls.findIndex(poll => poll.id === pollId);
  const userIndex = polls[pollIndex].votes.findIndex(
    vote => vote.userId === newVoteObject.userId
  );
  if (userIndex === -1) {
    polls[pollIndex].votes.push(newVoteObject);
  } else {
    polls[pollIndex].votes.splice(userIndex, 1, newVoteObject);
  }
}

export async function fetchVote(pollId, userId) {
  const poll = await fetchPoll(pollId);
  const vote = poll.votes.find(vote => {
    return vote.userId === userId;
  });
  if (vote === undefined) {
    throw new Error("notVoted");
  }
  return vote;
}
////////////////////////////////////////////////////////
// FUNCTIONS FOR GETTING VOTE RESULTS

//////////////////////
//HELPER FUNCTIONS

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

////////////////////////////////////
// EXCEPTIONS
function PollException(message, history) {
  this.message = message;
  this.history = history;
}

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
