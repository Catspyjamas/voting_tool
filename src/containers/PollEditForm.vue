<template>
  <div class="container">
    <h1>Edit Poll</h1>
    <Messages :status-messages="statusMessages" />

    <PollForm v-if="loaded" :poll="poll" @pollSubmit="savePollObject" />
  </div>
</template>

<script>
import { fetchPoll } from "../lib/api.js";
import { savePoll } from "../lib/api.js";
import Messages from "../components/Messages.vue";

import PollForm from "../components/PollForm.vue";
export default {
  name: "EditPoll",
  components: {
    PollForm,
    Messages
  },
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      statusMessages: [],
      poll: null,
      loaded: false
    };
  },
  async created() {
    this.poll = await fetchPoll(this.pollId);
    this.loaded = true;
  },
  methods: {
    async savePollObject(pollObject) {
      await savePoll(pollObject, this.pollId);
      this.statusMessages.length = 0;
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });

      this.statusMessages.push("Poll saved.");
      setTimeout(() => (this.statusMessages = []), 7000);
    }
  }
};
</script>
