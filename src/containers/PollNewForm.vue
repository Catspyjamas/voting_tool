<template>
  <div class="container">
    <h1 v-if="$root.loggedIn">New Poll</h1>
    <Messages
      :status-messages="statusMessages"
      :error-messages="errorMessages"
    />

    <PollForm v-if="$root.loggedIn" @pollSubmit="savePollObject" />
  </div>
</template>

<script>
import PollForm from "../components/PollForm.vue";
import Messages from "../components/Messages.vue";
import { savePoll } from "../lib/api.js";
export default {
  name: "NewPoll",
  components: {
    PollForm,
    Messages
  },
  data() {
    return {
      statusMessages: [],
      errorMessages: []
    };
  },
  created() {
    if (!this.$root.loggedIn) {
      this.errorMessages.push("You need to be logged in to create polls.");
    }
  },
  methods: {
    async savePollObject(pollObject) {
      const { title, description, options, start, end } = pollObject;
      const responseObject = await savePoll({
        title,
        description,
        options,
        start,
        end,
        votes: [],
        status: "DRAFT"
      });
      if (responseObject.status !== "success") {
        this.errorMessages.length === 0;
        this.errorMessages.push(responseObject.errors.map(error => error.msg));
        return;
      }
      this.statusMessages.length = 0;
      this.statusMessages.push("Poll saved.");
      setTimeout(() => (this.statusMessages = []), 7000);

      setTimeout(window.scrollTo({ left: 0, top: 0, behavior: "smooth" }), 2);
    }
  }
};
</script>
