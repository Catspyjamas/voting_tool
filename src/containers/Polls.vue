<template>
  <PollList :polls="polls" />
</template>

<script>
import { fetchPolls } from "../lib/api.js";
import PollList from "../components/PollList.vue";

export default {
  components: {
    PollList
  },
  data() {
    return {
      polls: []
    };
  },
  async created() {
    this.polls = await fetchPolls();
  }
};
</script>
