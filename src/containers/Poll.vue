<template>
  <Poll :poll="poll" />
</template>

<script>
import { fetchPoll } from "../lib/api.js";
import Poll from "../components/Poll.vue";

export default {
  components: {
    Poll
  },
  props: {
    pollId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      poll: null
    };
  },
  async created() {
    this.poll = await fetchPoll(this.pollId);
  }
};
</script>
