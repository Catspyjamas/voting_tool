<template>
  <div>
    <div id="winner">
      <h2>And the winner is...</h2>
      <h1>{{ winner.title }}</h1>
    </div>

    <div v-for="(pollResult, index) in pollResults" :key="index">
      <div class="headline">
        <h2 v-if="pollResult.roundCount === 0">
          This is what we started out with:
        </h2>
        <h2 v-else>Round # {{ index + 1 }}</h2>
      </div>
      <div v-if="pollResult.minKeys" class="additional-info">
        <span>
          As we didn't have a majority, the one(s) with the least votes got
          eliminated:
        </span>
        <span
          v-for="(minKey, index3) in pollResult.minKeys"
          :key="index3"
          class="option"
        >
          <span
            v-if="
              pollResult.minKeys.length > 1 &&
                index3 === pollResult.minKeys.length - 1
            "
            >and</span
          >
          {{ minKey }}
          <span
            v-if="
              pollResult.minKeys.length > 1 &&
                index3 < pollResult.minKeys.length - 1
            "
            >,&nbsp;</span
          >
          <span v-if="index3 === pollResult.minKeys.length - 1">.</span>
        </span>
        <span>
          But people's votes aren't lost. Let's take into account their next
          favourite options and update the charts:
        </span>
      </div>
      <div class="info">
        <li
          v-for="(summedUpResult, index2) in pollResult.summedUpResults"
          :key="index2"
        >
          <span>{{ summedUpResult[1] }} voted for</span>
          <span>{{ summedUpResult[0] }}</span>
          <span>{{ summedUpResult[2] }}%</span>
        </li>
      </div>
      <doughnut-chart
        class="chart"
        :chartdata="pollResult.chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>
<script>
import DoughnutChart from "./DoughnutChart.vue";

export default {
  components: {
    DoughnutChart
  },
  props: {
    pollResults: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Array,
      default: () => []
    },
    winner: {
      type: Object,
      default: () => {}
    },
    chartOptions: {
      type: Object,
      default: () => {}
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
.info {
  li {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    line-height: $medium;
  }
}
.additional-info {
  margin-bottom: $small;
}
span {
  color: $primary;
  font-weight: normal;
  font-size: 1.25rem;
}
</style>
