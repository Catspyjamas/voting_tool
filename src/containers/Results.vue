<template>
  <div v-if="loaded" class="container">
    <div v-for="pollResult in pollResults" :key="pollResult.roundCount">
      <div id="headline">
        <h2 v-if="pollResult.roundCount === 0">
          This is what we started out with:
        </h2>
        <h2 v-else>Round # {{ pollResult.roundCount }}</h2>
      </div>
        <li v-for="summedUpResult in pollResult.summedUpResults">
          {{summedUpResult[1]}}
          {{summedUpResult[0]}}
          {{summedUpResult[2]}}
        </li>
      <div v-if="pollResult.minKeys">
        <p>Didn't get enough votes to make it into the next round:</p>
        <li v-for="minKey in pollResult.minKeys" :key="minKey.index">
          {{ minKey }}
        </li>
      </div>
      <doughnut class="chart" :chartdata="pollResult.chartData" :options="chartOptions" />
    </div>
    <div id="winner">
      <h2>And we have an absolute majority:</h2>
      <p>{{ winner.title }}</p>
    </div>
  </div>
</template>
<script>
import Doughnut from "../components/Result";
import { fetchPoll } from "../lib/api.js";
import { findWinner } from "../lib/api.js";
import { prepareRoundCharts } from "../lib/api.js";
import { fetchOption } from "../lib/api.js";
export default {
  components: {
    Doughnut
  },
  data: () => ({
    color: null,
    winner: null,
    loaded: false,
    pollResults: null,
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    chartData: () => {
      return this.pollResults.chartData;
    }
  },
  async mounted() {
    this.loaded = false;

    try {
      const poll = await fetchPoll("bla-1jul80elt");
      const result = await findWinner(poll);
      this.pollResults = prepareRoundCharts(poll, result.roundHistory);
      this.winner = await fetchOption("bla-1jul80elt", result.result.winner);
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
<style lang="scss">
h2 {
  margin-top: $standard;
}
.chart {
  margin: $small 0 $medium 0;
  padding-bottom: $medium;
  border-bottom: 1px solid white;
}
</style>
