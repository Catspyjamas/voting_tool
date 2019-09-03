<template>
  <div class="container">
    <h1>Edit Poll</h1>
    <transition name="status-message">
      <div v-if="statusMessages.length" id="status-message-polls" class="status-message">
        <ul>
          <li v-for="statusMessage in statusMessages" :key="statusMessage">{{ statusMessage }}</li>
        </ul>
      </div>
    </transition>
    <PollForm v-if="loaded" :poll="poll" @pollSubmit="savePollObject" />
  </div>
</template>

<script>
import { fetchPoll } from "../lib/api.js";
import { savePoll } from "../lib/api.js";

import PollForm from "../components/PollForm.vue";
export default {
  name: "EditPoll",
  components: {
    PollForm
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
