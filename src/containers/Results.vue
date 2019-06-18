<template>
  <div v-if="loaded" class="container">
    <div id="winner">
      <h2>And the winner is...</h2>
      <h1>{{ winner.title }}</h1>
    </div>
    <div v-for="pollResult in pollResults" :key="pollResult.roundCount">
      <div class="headline">
        <h2 v-if="pollResult.roundCount === 0">
          This is what we started out with:
        </h2>
        <h2 v-else>Round # {{ pollResult.roundCount }}</h2>
      </div>
      <div class="info">
        <li
          v-for="(summedUpResult, index2) in pollResult.summedUpResults"
          :key="index2"
        >
          <span>{{ summedUpResult[1] }} votes for</span>
          <span>{{ summedUpResult[0] }}</span>
          <span>{{ summedUpResult[2] }}%</span>
        </li>
        <div v-if="pollResult.minKeys" class="additional-info">
          <p>
            As we didn't have a majprity, the one(s) with the least votes got
            voted out. In this case, it's
          </p>
          <span
            v-for="minKey in pollResult.minKeys"
            :key="minKey.index"
            class="option"
            >{{ minKey }}</span
          >
        </div>
      </div>
      <doughnut
        class="chart"
        :chartdata="pollResult.chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>
<script>
import Doughnut from "../components/DoughnutChart";
import { fetchPoll } from "../lib/api.js";
import { findWinner } from "../lib/api.js";
import { prepareRoundInfo } from "../lib/api.js";
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
      this.pollResults = prepareRoundInfo(poll, result.roundHistory);
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
  padding: $medium 0 $medium 0;
  border-bottom: 1px solid white;
}
</style>
