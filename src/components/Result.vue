/* eslint-disable prettier/prettier */
<template>
  <div>
    <div id="winner">
      <h2 v-if="winnerOptions.length === 1">The winner of the poll "{{ pollTitle }}" is...</h2>
      <h2 v-else>It's a tie! The winners of the poll "{{ pollTitle }}" are...</h2>
      <div id="winner-names">
        <span
          v-for="(winnerOption, index) in winnerOptions"
          :key="winnerOption._id"
          class="winner-name"
        >
          <h1>{{ winnerOption.title }}</h1>
          <h2
            v-if="
              winnerOptions.length !== 1 && index === winnerOptions.length - 2
            "
          >&nbsp; and</h2>
        </span>
      </div>
    </div>

    <div v-for="(pollResult, index) in pollResults" :key="pollResult.roundIndex">
      <div class="headline">
        <h2 v-if="pollResult.roundIndex === 0">Here's what we started out with</h2>
        <h2 v-else>Round # {{ index + 1 }}</h2>
      </div>
      <div v-if="pollResult.minKeys" class="additional-info">
        <span>
          As we didn't have a majority, the one(s) with the least votes got
          eliminated (in this case: 
        </span>
        <span v-for="(minKey, index3) in pollResult.minKeys" :key="index3" class="option">
          <span
            v-if="
              pollResult.minKeys.length > 1 &&
                index3 === pollResult.minKeys.length - 1
            "
          >and</span>
          {{ minKey }}
          <span
            v-if="
              pollResult.minKeys.length > 1 &&
                index3 < pollResult.minKeys.length - 1
            "
          >,&nbsp;</span>
          <span v-if="index3 === pollResult.minKeys.length - 1">).</span>
        </span>
        <span>
          But people's votes aren't lost. Here's the chart if we take into account their next favourite options:
        </span>
      </div>
      <div class="info">
        <table>
          <thead>
            <tr>
              <th>Votes</th>
              <th>Option title</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="summedUpResult in pollResult.summedUpResults" :key="summedUpResult[0]">
              <td>{{ summedUpResult[1] }} voted for</td>
              <td>{{ summedUpResult[0] }}</td>
              <td>{{ summedUpResult[2] }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <doughnut-chart class="chart" :chartdata="pollResult.chartData" :options="chartOptions" />
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
    pollResults: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Array,
      default: () => []
    },
    winnerOptions: {
      type: Array,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="scss" scoped>
#winner-names {
  border-bottom: 1px solid $grey1;
  padding-bottom: 1.5rem;
  margin: 1.5rem 0;
}
.winner-name {
  display: flex;
  align-items: baseline;
  h1 {
    margin: 0 0;
  }
}

h2 {
  margin: 1rem 0;
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

span {
  color: $grey1;
  font-weight: normal;
  font-size: 1.25rem;
}
thead {
  text-align: left;
}
table {
  margin: 1rem 0;
}
td {
  padding-right: 1rem;
}
</style>
