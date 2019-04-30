<template>
  <PollEdit v-if="!isLoading" :poll="poll" />
</template>

<script>
import { fetchPoll } from "../lib/api.js";
import PollEdit from "../components/PollEditForm.vue";

export default {
  components: {
    PollEdit
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
  computed: {
    isLoading() {
      return this.poll === null ? true : false;
    }
  },
  async created() {
    this.poll = await fetchPoll(this.pollId);
  }
};
</script>
