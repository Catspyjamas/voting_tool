<template>
  <div v-if="loaded" class="container">
    <result
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
  data() {
    return {
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
      const poll = await fetchPoll("bla-1jul80elt");
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
