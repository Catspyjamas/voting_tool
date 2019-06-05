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
  // eslint-disable-next-line no-console
  console.log(newPollObject);
  const pollIndex = polls.findIndex(poll => poll.id === newPollObject.id);
  if (pollIndex === -1) {
    polls.push(newPollObject);
  } else {
    polls.splice(pollIndex, 1, newPollObject);
  }
}

export async function saveVote(pollId, newVoteObject) {
  // eslint-disable-next-line no-console
  console.log(newVoteObject);
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
// AFTER VOTE/COUNTING OUT VOTES

//////////////////////
//HELPER FUNCTIONS

function get(poll) {
  return poll.options.map(option => option.id);
}

function findSmallestValue(map) {
  const allValues = [];
  for (const value of map.values()) {
    allValues.push(value);
  }
  return Math.min(...allValues);
}

function findKeyOfSmallestNumber(map, minNumber) {
  let minKeys = [];
  [...map].forEach(([key, value]) => {
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

// (options, topOptionPerUserId) -> Map<optionId, count>
// !!! Add arguments/make functions "neutral"
export function sumUpResults() {
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

  //save history
  roundHistory.push({
    roundCount,
    minKeys: null,
    summedUpResults,
    rankingPerUserId
  });
  roundCount++;
  return summedUpResults;
}
//!!!Roundcount mitzählen und Endlosschleife vermeiden
export function doWeHaveAWinner(map) {
  let votesCount = 0;
  map.forEach(value => {
    votesCount = votesCount + value;
  });
  console.log("VOTESCOUNT " + votesCount);
  const majorityLimit = votesCount / 2;
  let winner = null;
  map.forEach((value, key) => {
    if (value > majorityLimit) {
      winner = key;
    }
  });
  console.log("WINNER: " + winner);
  return winner;
}

export function removeLeastFavouriteOptions() {
  // find smallest value
  const min = findSmallestValue(summedUpResults);
  console.log("MIN: " + min);
  //find Keys of smallest number
  const minKeys = findKeyOfSmallestNumber(summedUpResults, min);
  console.log("MINKEY: " + minKeys);

  //filter summedUpResults to exclude results with smallest number
  summedUpResults = new Map(
    [...summedUpResults].filter(result => result[1] !== min)
  );
  console.log("SUMMEDUPRESULTS:");
  console.log(JSON.stringify(summedUpResults, null, 2));

  //Delete minKeys from rankingPerUserId
  rankingPerUserId = new Map(
    [...rankingPerUserId].map(([key, value]) => {
      return [
        key,
        value.filter(id => {
          return !minKeys.includes(id);
        })
      ];
    })
  );
  console.log("RANKING");
  console.log(JSON.stringify(rankingPerUserId, null, 2));

  //Delete minKeys from remainingOptions
  remainingOptions.filter(id => {
    return !minKeys.includes(id);
  });

  //save in history
  roundHistory.push({
    roundCount,
    minKeys,
    summedUpResults,
    rankingPerUserId
  });
}

////////////////////////////////////
// TRY OUT STUFF

//!!! CalculateResults: one global
const roundHistory = [];
let roundCount = 0;
let remainingOptions = get(polls[0]);
console.log("all Options: " + remainingOptions);

let rankingPerUserId = collectRankingPerUserId(polls[0].votes);
console.log("rankingPerUserId: ");
console.log(JSON.stringify(rankingPerUserId, null, 2));

let summedUpResults = sumUpResults(remainingOptions, rankingPerUserId);
console.log("summedUpResults: ");
console.log(JSON.stringify(summedUpResults, null, 2));

let winner;
do {

  winner = calculateWinner(summedUpResults);
} while (winner === null);

doWeHaveAWinner(summedUpResults);
removeLeastFavouriteOptions();
console.log("____________________2______________________________");
sumUpResults();
doWeHaveAWinner(summedUpResults);
removeLeastFavouriteOptions();
console.log("____________________3______________________________");
sumUpResults();
doWeHaveAWinner(summedUpResults);
