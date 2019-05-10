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

// TO DO:
//- Clean up rankings
// -Refactor Votes container and component
//- Check for empty Arrays (= abstinations) in the container

function getAllOptions(poll) {
  return poll.options.map(option => option.id);
}

const allOptions = getAllOptions(polls[0]);
// eslint-disable-next-line no-console
console.log("all Options:" + allOptions);

export function collectRankingPerUserId(votes) {
  const rankingPerUserId = new Map();

  for (const vote of votes) {
    if (rankingPerUserId.has(vote.userId)) {
      throw new Error(`Duplicate vote for user "${vote.userId}"`);
    }
    if (vote.ranking.length === 0) {
      // eslint-disable-next-line no-console
      continue;
    }
    rankingPerUserId.set(vote.userId, vote.ranking);
  }
  return rankingPerUserId;
}

// (rankingPerUserId) -> Map<userId, optionId>
export function getTopOptionPerUserId(rankingPerUserId) {
  const topOptionPerUserId = new Map();
  for (const vote of rankingPerUserId) {
    topOptionPerUserId.set(vote[0], vote[1][0]);
  }
  return topOptionPerUserId;
}

// (options, topOptionPerUserId) -> Map<optionId, count>

export function sumUpResults(options, topOptionPerUserId) {
  const summedUpResults = new Map();
  //initializes map of all options with value of 0
  for (const option of options) {
    summedUpResults.set(option, 0);
  }
  //goes through topOptionPerUserId, gets what's at index0 of the results...
  for (const topOption of topOptionPerUserId) {
    // and adds up the counter of each option there is
    summedUpResults.set(topOption[1], summedUpResults.get(topOption[1]) + 1);

    //    summedUpResults.set(topOption, topOption + 1);
  }
  return summedUpResults;
}

// function removeLeastFavoriteOptions(options, sumUpResults) {}

function getTopChoice(voteCollection) {
  const topChoice = new Map();
  for (let vote of voteCollection) {
    const firstChoice = vote.ranking[0];
    if (topChoice.has(firstChoice)) {
      topChoice.set(firstChoice, topChoice.get(firstChoice) + 1);
    } else {
      topChoice.set(firstChoice, 0);
    }
  }
  return topChoice;
}
// const votingTimeline = [];
// const votesBirthday = gatherVotes(polls[0].votes);
// eslint-disable-next-line no-console
// console.log(votesBirthday);
