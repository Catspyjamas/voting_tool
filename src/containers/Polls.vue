<template>
  <div class="container">
    <h1>All Peerigon Polls</h1>
    <Messages
      :status-messages="statusMessages"
      :error-messages="errorMessages"
    />
    <PollTabs
      :filtered-polls="filteredPolls"
      @status-change="onStatusChange"
      @delete-poll="deletePoll"
    />
  </div>
</template>

<script>
import { fetchPolls, changePollStatus, deletePoll } from "../lib/api.js";
import PollTabs from "../components/PollTabs";
import Messages from "../components/Messages";
import { isOpen, isDraft, isClosed } from "../lib/poll.js";

const mapTabToFilterFunction = {
  open: isOpen,
  drafts: isDraft,
  closed: isClosed
};

export default {
  components: {
    PollTabs,
    Messages
  },
  props: {
    tab: {
      type: String,
      default: "open"
    }
  },
  data() {
    return {
      polls: [],
      statusMessages: [],
      errorMessages: []
    };
  },
  computed: {
    filteredPolls() {
      return this.polls.filter(this.activeFilter);
    },
    activeFilter() {
      return mapTabToFilterFunction[this.tab];
    }
  },
  async mounted() {
    const fetchedPollObject = await fetchPolls();
    if (fetchedPollObject.status !== "success") {
      console.log(fetchedPollObject);
      this.errorMessages.push(...fetchedPollObject.errors);
    }
    this.polls = fetchedPollObject.data;
  },
  methods: {
    async onStatusChange(pollId, status) {
      if (status === "DRAFT") {
        if (
          //if users don't confirm the question, abort
          !confirm(
            "Are you sure you want to move this poll in drafts? All votes will be deleted."
          )
        ) {
          return;
        }
      }
      console.log("NOW CHANGE STATUS");
      const response = await changePollStatus(pollId, status);
      this.handleResponse(response, "Poll has been moved to another tab.");
    },
    async deletePoll(pollId) {
      if (confirm("Are you sure you want to delete this poll?")) {
        const response = await deletePoll(pollId);
        this.handleResponse(response, "Poll deleted.");
      }
    },
    async handleResponse(response, successMessage) {
      if (response.status === "success") {
        this.polls = response.data;
        this.statusMessages = [];
        this.statusMessages.push(successMessage);
        setTimeout(() => (this.statusMessages = []), 7000);
      } else if (response.status === "error") {
        this.errorMessages.length = 0;
        this.errorMessages = response.errors.map(error => error.msg);
        setTimeout(() => (this.errorMessages = []), 7000);
      } else {
        this.errorMessages = response.errors.map(error => error.msg);
        setTimeout(() => (this.errorMessages = []), 7000);
      }
      const fetchedPollObject = await fetchPolls();
      this.polls = fetchedPollObject.data;
    }
  }
};
</script>
