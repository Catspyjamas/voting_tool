<template>
  <EditPoll v-if="!isLoading" :poll="poll" />
</template>

<script>
import { fetchPoll } from "../lib/api.js";
import EditPoll from "../components/EditPollForm.vue";

export default {
  components: {
    EditPoll
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
