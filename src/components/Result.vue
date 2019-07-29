<template>
  <div>
    <div id="winner">
      <h2>The winner of the poll "{{ pollTitle }}" is...</h2>
      <h1>{{ winnerOption.title }}</h1>
    </div>

    <div v-for="(pollResult, index) in pollResultsInfo" :key="index">
      <div class="headline">
        <h2 v-if="pollResult.roundCount === 0">
          This is what we started out with:
        </h2>
        <h2 v-else>Round # {{ index + 1 }}</h2>
      </div>
      <div v-if="pollResult.minKeys" class="additional-info">
        <span>
          As we didn't have a majority, the option(s) with the least votes are
          eliminated. But the opinions of the people who voted for
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
          <span>{{ minKey }}</span>
          <span
            v-if="
              pollResult.minKeys.length > 1 &&
                index3 < pollResult.minKeys.length - 1
            "
            >,&nbsp;</span
          >
        </span>
        <span>
          still count. Let's take into account their next favourite options and
          update the charts:
        </span>
      </div>
      <div class="info">
        <li
          v-for="(summedUpResult,
          index2) in pollResult.summedUpResultsPerOption"
          :key="index2"
        >
          <span>{{ summedUpResult.optionTitle }}</span>

          <span v-if="summedUpResult.numberOfVoters === 1"
            >{{ summedUpResult.numberOfVoters }} vote</span
          >
          <span v-else>{{ summedUpResult.numberOfVoters }} votes</span>
          <span>{{ summedUpResult.percentageofVoters }}%</span>
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
    pollTitle: {
      type: String,
      default: ""
    },
    pollResultsInfo: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Array,
      default: () => []
    },
    winnerOption: {
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
    grid-template-columns: 60% repeat(2, 1fr);
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
