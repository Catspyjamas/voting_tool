<template>
  <div v-if="loaded" class="container">
    <result
      :poll-title="poll.title"
      :poll-results-info="pollResultsInfo"
      :chart-data="chartData"
      :winner-option="winnerOption"
      :chart-options="chartOptions"
    />
  </div>
</template>
<script>
import Result from "../components/Result";
import { fetchPoll } from "../lib/api.js";
import { findWinner } from "../lib/api.js";
import { prepareRoundInfo } from "../lib/api.js";
export default {
  components: {
    Result
  },
  props: {
    pollId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      poll: null,
      winnerOption: null,
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
    this.loaded = false;

    try {
      //get id from URL
      const poll = await fetchPoll(this.pollId);
      this.poll = poll;
      const pollResults = await findWinner(poll);
      this.pollResultsInfo = prepareRoundInfo(poll, pollResults.roundHistory);
      this.winnerOption = pollResults.winnerOption;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
