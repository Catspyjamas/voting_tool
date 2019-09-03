<template>
  <div v-if="loaded" class="container">
    <result
      :poll-title="poll.title"
      :poll-results-info="pollResultsInfo"
      :chart-data="chartData"
      :winner-options="winnerOptions"
    />
  </div>
</template>
<script>
import Result from "../components/Result";

import { fetchPollResults } from "../lib/api.js";
import { findWinner } from "../lib/poll.js";
import { prepareRoundInfo } from "../lib/poll.js";

export default {
  components: {
    Result
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
      pollResultsInfo: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    chartData: function() {
      return this.pollResultsInfo.chartData;
    }
  },
  async mounted() {
    try {
      const poll = await fetchPollResults(this.pollId);
      this.poll = poll;
      const roundHistory = findWinner(poll);
      console.log("ROUNDHISTORY:", roundHistory);
      const pollResults = prepareRoundInfo(poll, roundHistory);
      this.pollResults = pollResults;
      const winnerIdsAndVotes = [...pollResults[pollResults.length - 1].result];
      // const winnerOptions = [];
      // winnerIdsAndVotes.forEach(winnerIdAndVote => {
      //   poll.options.forEach(option => {
      //     if (winnerIdAndVote.winnerId === option._id) {
      //       winnerOptions.push(option);
      //     }
      //   });
      // });
      this.winnerOptions = poll.options.filter(pollOption => {
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
