<template>
  <div class="container">
    <h1>Edit Poll</h1>
    <Messages
      :status-messages="statusMessages"
      :error-messages="errorMessages"
    />

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
      errorMessages: [],
      poll: null,
      loaded: false
    };
  },
  async created() {
    this.getPollData();
  },
  methods: {
    async savePollObject(pollObject) {
      await savePoll(pollObject, this.pollId);
      this.statusMessages.length = 0;

      const fetchedPollObject = await fetchPoll(this.pollId);
      if (
        fetchedPollObject.status === "fail" ||
        fetchedPollObject.status === "error"
      ) {
        this.statusMessages.length = 0;
        this.errorMessages.length = 0;
        this.errorMessages.push(
          ...fetchedPollObject.errors.map(error => error.msg)
        );
        window.scrollTo({ left: 0, top: 0 });
        return;
      }
      this.statusMessages.length = 0;
      this.errorMessages.length = 0;
      this.statusMessages.push("Poll saved.");
      window.scrollTo({ left: 0, top: 0 });

      setTimeout(() => (this.statusMessages = []), 7000);
      this.getPollData();
    },
    async getPollData() {
      if (!this.$root.loggedIn) {
        this.errorMessages.push("You need to be logged in to edit polls.");
        window.scrollTo({ left: 0, top: 0 });
      }
      const fetchedPollObject = await fetchPoll(this.pollId);
      if (fetchedPollObject.status !== "success") {
        this.errorMessages.push(
          ...fetchedPollObject.errors.map(error => error.msg)
        );
        return;
      }
      this.poll = fetchedPollObject.data;
      this.loaded = true;
    }
  }
};
</script>
