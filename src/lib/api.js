const randomColor = require("randomcolor");

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
  const poll = polls.find(poll => poll.id === pollId);
  if (!poll) throw new Error(`No poll found with pollId ${pollId}`);
  else return poll;
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

export async function fetchOption(pollId, optionId) {
  const poll = await fetchPoll(pollId);
  return poll.options.find(option => option.id === optionId);
}

export function getOption(poll, optionId) {
  return poll.options.find(option => option.id === optionId);
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

export function filterSummedUpResults(summedUpResults, minValue) {
  //filter summedUpResults to exclude results with smallest number
  const filteredSummedUpResults = new Map(
    [...summedUpResults].filter(result => result[1] !== minValue)
  );
  // console.log("FILTEREDSummedUpRESULTS:");
  // console.log(JSON.stringify(filteredSummedUpResults, null, 2));
  return filteredSummedUpResults;
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

////////////////////////////////////
export function findWinner(poll) {
  /// PREP 1st ROUND
  const roundHistory = [];
  let result;
  let roundCount = 0;
  const maxRounds = getPoll(poll).length;

  do {
    let lastRoundResults, lastRoundRanking, lastRoundRemainingOptions;

    if (roundCount !== 0) {
      // fancy way of destructuring into existing variables (which we rename the original objects keys to match)
      ({
        summedUpResults: lastRoundResults,
        rankingPerUserId: lastRoundRanking,
        remainingOptions: lastRoundRemainingOptions
      } = roundHistory[roundHistory.length - 1]);
    }

    const minValue =
      roundCount === 0 ? null : findSmallestValue(lastRoundResults);
    //find Keys of smallest number
    const minKeys =
      roundCount === 0
        ? null
        : findKeyOfSmallestNumber(lastRoundResults, minValue);

    const summedUpResults =
      roundCount === 0
        ? sumUpResults(getPoll(poll), collectRankingPerUserId(poll.votes))
        : filterSummedUpResults(lastRoundResults, minValue);

    //Prepare Screenshot of remaining ranking for history
    const rankingPerUserId =
      roundCount === 0
        ? collectRankingPerUserId(poll.votes)
        : filterRankingPerUserId(lastRoundRanking, minKeys);

    //Prepare Screenshot of remaining options for history
    const remainingOptions =
      roundCount === 0
        ? getPoll(poll)
        : filterRemainingOptions(lastRoundRemainingOptions, minKeys);

    result = calculateWinner(summedUpResults);

    roundHistory.push({
      roundCount,
      remainingOptions,
      minValue,
      minKeys,
      rankingPerUserId,
      summedUpResults,
      result
    });

    roundCount++;
  } while (result === null && roundCount < maxRounds);
  //check if there's still no winner
  if (result === null) {
    throw new PollException("Couldn't find a winner", roundHistory);
  }
  return { roundHistory, result };
}

export function prepareRoundCharts(poll, roundHistory) {

  return roundHistory.map(round => {
    function countPercentage(array, number) {
      const total = array.reduce((accumulator, currentValue) =>{
        return accumulator + currentValue
      })
      return number*100/total
    }
    //make array from counts per round
    const numbersPerVote = Array.from(round.summedUpResults.values());
    //make array from optionIds
    const optionsPerVote = Array.from(round.summedUpResults.keys());
    const titleOfOptionsPerVote = optionsPerVote
      //get titles from optionIds
      .map((optionId, index) => {
        return `${getOption(poll, optionId).title}`;
      }
      );
      const readableSummedUpResults = titleOfOptionsPerVote.map((optionTitle, index) => {
        return [optionTitle,numbersPerVote[index], countPercentage(numbersPerVote, numbersPerVote[index])] 
      })
    //make array from options that were selected out
    const minKeyTitles = round.minKeys
      ? //if there are several optionIds, get their titles
        round.minKeys.map(optionId => {
          return getOption(poll, optionId).title;
        })
      : null;
    //create a singular color per sees/id
    const colorsPerTitle = optionsPerVote.map(optionId => {
      return randomColor({
        seed: optionId
      });
    });
    return {
      chartData: {
        datasets: [{ data: numbersPerVote, backgroundColor: colorsPerTitle, borderWidth: 0 }],
        labels: titleOfOptionsPerVote
      },
      summedUpResults: readableSummedUpResults,
      roundCount: round.roundCount,
      minKeys: minKeyTitles,
      result: round.result
    };
  });
}
