<template>
  <PollTabs
    :filtered-polls="filteredPolls"
    :tab="tab"
    @click="activeFilter = filterFunctions[$event]"
  />
</template>

<script>
import { fetchPolls } from "../lib/api.js";
import moment from "moment";
import PollTabs from "../components/PollTabs";

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
    PollTabs
  },
  props: {
    tab: {
      type: String,
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
