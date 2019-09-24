<template>
  <div class="container">
    <Messages :error-messages="errorMessages" />
    <result
      v-if="loaded"
      :poll-title="poll.title"
      :poll-results="pollResults"
      :chart-data="chartData"
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
  computed: {
    chartData: function() {
      return this.pollResults.chartData;
    }
  },
  async mounted() {
    try {
      const response = await fetchPollResults(this.pollId);
      if (response.status === "fail" || response.status === "error") {
        this.errorMessages.length = 0;
        this.errorMessages = response.errors.map(error => error.msg);
        setTimeout(() => (this.errorMessages = []), 7000);
        return;
      }
      this.poll = response.data;
      const roundHistory = findWinner(response.data);
      const pollResults = prepareRoundInfo(response.data, roundHistory);
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
      this.winnerOptions = response.data.options.filter(pollOption => {
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
