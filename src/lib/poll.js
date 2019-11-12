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

function getOptionIds(poll) {
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
//Prepare a map containing only the userId and the ranking
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

//Prepare a map with the optionIds and the sum of votes it got in one round
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

//Calculate if one of the options got a majority and return the result (null or array with winner option(s))
export function calculateWinner(summedUpResults) {
  let result = null;

  const arraysFromSummedUpResults = Array.from(summedUpResults.values());
  // Check if the remaining summed up results are equal (then it's a tie)
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
      result = [{ winnerId: key, votes: value }];
    }
  });
  return result;
}

//Filter out the least favourite options from the rankings in rankingperUserId and return the reduced map
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

//Filter out the least favourite options from the remaining options
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

//In the first round, we need to extract the data we need from the poll
function firstRound(poll) {
  const remainingOptions = getOptionIds(poll);
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

//This function runs all the helper functions and returns a roundHistory containing all the data we got from the single rounds.
//The last round should contain a result object that tells us the winner(s).
export function findWinner(poll) {
  const roundHistory = [];
  //The number of options tells us the maximum of rounds we can try to find a winner until an error is thrown
  const maxRounds = getOptionIds(poll).length;
  //Prepare all the data
  const firstRoundResults = firstRound(poll);
  roundHistory.push(firstRoundResults);
  //Try to find a winner
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
  //Check the last round for its result
  const result = roundHistory[roundHistory.length - 1].result;
  //If there's still no winner, we have a problem
  if (result === null) {
    throw new PollException("Couldn't find a winner", roundHistory);
  }
  return roundHistory;
}

//This function takes the roundHistory data and populates it with all the info we need (e.g. for DoughnutChart) to display the data
export function prepareRoundInfo(poll, roundHistory) {
  return roundHistory.map((round, roundIndex) => {
    //Make array from counts per round for the stats
    const numbersPerRound = Array.from(round.summedUpResults.values());

    //Make array from optionIds for the stats
    const optionsPerRound = Array.from(round.summedUpResults.keys());
    //Make array from option titles for the stats
    const titleOfOptionsPerRound = optionsPerRound.map(optionId => {
      return `${getOption(poll, optionId).title}`;
    });
    // Put this data together
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
    //create a singular color per seed/id for DoughnutChart
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
      roundIndex,
      minKeys: minKeyTitlesPerRound,
      result: round.result
    };
  });
}
