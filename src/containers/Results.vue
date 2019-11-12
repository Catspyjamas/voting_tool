<template>
  <div class="container">
    <Messages :error-messages="errorMessages" />
    <result
      v-if="loaded"
      :poll-title="poll.title"
      :poll-results="pollResults"
      :winner-options="winnerOptions"
      :chart-options="chartOptions"
    />
  </div>
</template>
<script>
import Messages from "../components/Messages";
import Result from "../components/Result";
import { fetchPollResults } from "../lib/api.js";
import { findWinner } from "../lib/poll.js";
import { prepareRoundInfo } from "../lib/poll.js";
export default {
  name: "Results",
  components: {
    Result,
    Messages
  },
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      poll: null,
      winnerOptions: null,
      loaded: false,
      pollResults: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      errorMessages: []
    };
  },
  // computed: {
  //   chartData: function() {
  //     return this.pollResults.chartData;
  //   }
  // },
  async mounted() {
    try {
      const pollResponse = await fetchPollResults(this.pollId);
      if (pollResponse.status === "fail" || pollResponse.status === "error") {
        this.errorMessages.length = 0;
        this.errorMessages = pollResponse.errors.map(error => error.msg);
        setTimeout(() => (this.errorMessages = []), 7000);
        return;
      }
      this.poll = pollResponse.data;
      //Find a winner with the ranking data
      const roundHistory = findWinner(pollResponse.data);
      //Prepare an object that sums up the roundhistory in a form that lets us display everything in the results component
      const pollResults = prepareRoundInfo(pollResponse.data, roundHistory);
      this.pollResults = pollResults;
      //console.log(JSON.stringify(pollResults, null, 2));
      //Get the winner's Id and the number of people who voted for it from our roundHistory
      const winnerIdsAndVotes = [
        ...roundHistory[roundHistory.length - 1].result
      ];
      //Now we know the winner's id, all we need is the winner's whole data
      this.winnerOptions = pollResponse.data.options.filter(pollOption => {
        return winnerIdsAndVotes.some(winnerIdAndVote => {
          return pollOption._id === winnerIdAndVote.winnerId;
        });
      });
      this.loaded = true;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
