<template>
  <div class="container">
    <!-- ? Does Jhnns think this should be its own component? -->
    <ul class="tabs">
      <router-link
        :to="{ name: 'polls', params: { tab: 'active' } }"
        @click.native="activeFilter = filterFunctions.active"
        >Active</router-link
      >
      <router-link
        :to="{ name: 'polls', params: { tab: 'drafts' } }"
        @click.native="activeFilter = filterFunctions.drafts"
        >Drafts</router-link
      >
      <router-link
        :to="{ name: 'polls', params: { tab: 'past' } }"
        @click.native="activeFilter = filterFunctions.past"
        >Past</router-link
      >
    </ul>
    <PollList :polls="filteredPolls" />
  </div>
</template>

<script>
import { fetchPolls } from "../lib/api.js";
import PollList from "../components/PollList.vue";
import moment from "moment";

// "/polls/:tab"
// als prop: tab = "active"

const filterFunctions = {
  active(poll) {
    return moment().isBefore(poll.end);
  },
  drafts(poll) {
    return poll.active === false;
  },
  past(poll) {
    return moment().isAfter(poll.end);
  }
};

export default {
  components: {
    PollList
  },
  props: {
    tab: {
      type: String,
      required: true,
      default: "active"
    }
  },
  data() {
    return {
      polls: [],
      activeFilter: filterFunctions.active,
      filterFunctions
    };
  },
  computed: {
    filteredPolls() {
      return this.polls.filter(this.activeFilter);
    }
  },
  async created() {
    this.polls = await fetchPolls();
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
