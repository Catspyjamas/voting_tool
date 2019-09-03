import randomColor from "randomcolor";

const possiblePollStates = {
  OPEN: "OPEN",
  DRAFT: "DRAFT",
  CLOSED: "CLOSED"
};

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

export { possiblePollStates };

//Getting Results

function getOption(poll, optionId) {
  return poll.options.find(option => option._id === optionId);
}

function getPoll(poll) {
  return poll.options.map(option => option._id);
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
  return Math.round((((number * 100) / total) * 100) / 100);
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
  const arrayOfRankings = Array.from(rankingPerUserId.values());
  for (const ranking of arrayOfRankings) {
    summedUpResults.set(ranking[0], summedUpResults.get(ranking[0]) + 1);
    //    Or with reference to object: summedUpResults.get(ranking[0]).count++;
  }
  return summedUpResults;
}

export function calculateWinner(summedUpResults) {
  let result = null;

  const arraysFromSummedUpResults = Array.from(summedUpResults.values());
  // Check if the remaining summed up results are equal
  //! Display these results too
  if (arraysFromSummedUpResults.every((val, i, arr) => val === arr[0])) {
    result = [];
    summedUpResults.forEach((value, key) => {
      result.push({ winnerId: key, votes: value });
    });
    return result;
  }
  let votesCount = 0;
  summedUpResults.forEach(value => {
    votesCount = votesCount + value;
  });
  const majorityLimit = votesCount / 2;
  summedUpResults.forEach((value, key) => {
    if (value > majorityLimit) {
      result = { winnerId: key, votes: value };
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
        luminosity: "dark",
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
