<template>
  <div v-if="loaded" class="container">
    <result
      :poll-title="poll.title"
      :poll-results="pollResults"
      :chart-data="chartData"
      :winner="winner"
      :chart-options="chartOptions"
    />
  </div>
</template>
<script>
import Result from "../components/Result";
import { fetchPoll } from "../lib/api.js";
import { findWinner } from "../lib/api.js";
import { prepareRoundInfo } from "../lib/api.js";
import { fetchOption } from "../lib/api.js";
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
      winner: null,
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
    this.loaded = false;

    try {
      //get id from URL
      const poll = await fetchPoll(this.pollId);
      this.poll = poll;
      const result = await findWinner(poll);
      this.pollResults = prepareRoundInfo(poll, result.roundHistory);
      this.winner = await fetchOption("bla-1jul80elt", result.result.winner);
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
