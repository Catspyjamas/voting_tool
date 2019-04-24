<template>
  <div class="container">
    <!-- ? Does Jhnns think this should be its own component? -->
    <ul class="tabs">
      <li @click="filterPolls(tabs.ACTIVE)">Active</li>
      <li @click="filterPolls(tabs.DRAFTS)">Drafts</li>
      <li @click="filterPolls(tabs.PAST)">Past</li>
    </ul>
    <PollList :polls="filteredPolls" />
  </div>
</template>

<script>
import { fetchPolls } from "../lib/api.js";
import PollList from "../components/PollList.vue";
import moment from "moment";
const tabs = {
  ACTIVE: "ACTIVE",
  PAST: "PAST",
  DRAFT: "DRAFT"
};
export default {
  components: {
    PollList
  },
  data() {
    return {
      polls: [],
      filteredPolls: [],
      hasBeenFiltered: false,
      tabs: tabs,
      filterFunctions: {
        ACTIVE: () => {
          return this.polls.filter(poll => {
            return moment().isBefore(poll.end);
          });
        },
        PAST: () => {
          return this.polls.filter(poll => {
            return moment().isAfter(poll.end);
          });
        },
        DRAFTS: () => {
          return this.polls.filter(poll => {
            return poll.active === true;
          });
        }
      }
    };
  },
  async created() {
    this.polls = await fetchPolls();
    this.filteredPolls = this.polls;
  },
  methods: {
    filterPolls(tab) {
      this.filteredPolls = this.filterFunctions[tab]();
    }
  }
};
</script>

<style lang="scss">
.tabs {
  display: flex;
  justify-content: space-between;
  li {
    list-style: none;
    cursor: pointer;
  }
}
</style>
