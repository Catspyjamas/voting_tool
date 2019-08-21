<template>
  <div v-if="loaded" class="container">
    <result
      :poll-title="poll.title"
      :poll-results="pollResults"
      :chart-data="chartData"
      :winner-options="winnerOptions"
      :chart-options="chartOptions"
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
      winnerIdsAndVotes: null,
      loaded: false,
      pollResults: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    chartData: function() {
      return this.pollResults.chartData;
    }
  },
  async mounted() {
    try {
      const poll = await fetchPollResults(this.pollId);
      this.poll = poll;
      const pollData = findWinner(poll);
      const pollResults = prepareRoundInfo(poll, pollData.roundHistory);
      this.pollResults = pollResults;
      const winnerIdsAndVotes = [...pollResults[pollResults.length - 1].result];
      this.winnerIdsAndVotes = winnerIdsAndVotes;
      const winnerOptions = [];
      winnerIdsAndVotes.forEach(winnerIdAndVote => {
        poll.options.forEach(option => {
          if (winnerIdAndVote.winnerId === option._id) {
            winnerOptions.push(option);
          }
        });
      });
      this.winnerOptions = winnerOptions;
      this.loaded = true;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
