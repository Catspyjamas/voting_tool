<template>
  <VoteForm v-if="!isLoading" :poll="poll" />
</template>

<script>
import { fetchPoll } from "../lib/api.js";
import VoteForm from "../components/VoteForm.vue";

export default {
  components: {
    VoteForm
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
