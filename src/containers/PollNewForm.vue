<template>
  <div class="container">
    <h1>New Poll</h1>
    <Messages :status-messages="statusMessages" />
    <PollForm @pollSubmit="savePollObject" />
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
      statusMessages: []
    };
  },
  methods: {
    async savePollObject(pollObject) {
      console.log(pollObject);
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
