<template>
  <div class="container">
    <h1>New Poll</h1>
    <transition name="status-message">
      <div
        v-if="statusMessages.length"
        id="status-message-polls"
        class="status-message"
      >
        <ul>
          <li v-for="statusMessage in statusMessages" :key="statusMessage">
            {{ statusMessage }}
          </li>
        </ul>
      </div>
    </transition>
    <PollForm :poll="emptyPoll" @pollSubmit="savePollObject" />
  </div>
</template>

<script>
import PollForm from "../components/PollForm.vue";

import { savePoll } from "../lib/api.js";
export default {
  name: "NewPoll",
  components: {
    PollForm
  },
  data() {
    return {
      statusMessages: [],
      emptyPoll: {
        title: "",
        description: "",
        options: [],
        start: "",
        end: "",
        pollId: ""
      }
    };
  },
  methods: {
    async savePollObject(pollObject) {
      const { title, description, options, start, end } = pollObject;
      await savePoll({
        title,
        description,
        options,
        start,
        end,
        votes: [],
        status: "DRAFT"
      });
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      this.statusMessages.length = 0;
      this.statusMessages.push("Poll saved.");
      setTimeout(() => (this.statusMessages = []), 7000);
    }
  }
};
</script>
