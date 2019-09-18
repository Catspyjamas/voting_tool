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
      this.errorMessages.push(...fetchedPollObject.errors);
    }
    this.polls = fetchedPollObject.data;
  },
  methods: {
    async onStatusChange(pollId, status) {
      if (status === "DRAFT") {
        if (
          confirm(
            "Are you sure you want to move this poll in drafts? All votes will be deleted."
          )
        ) {
          await changePollStatus(pollId, status);
          const fetchedPollObject = await fetchPolls();
          this.polls = fetchedPollObject.data;
          this.statusMessages = [];
          this.statusMessages.push("Poll has been set to draft.");
          setTimeout(() => (this.statusMessages = []), 7000);
        }
        return;
      }
      await changePollStatus(pollId, status);
      const fetchedPollObject = await fetchPolls();
      this.polls = fetchedPollObject.data;
      this.statusMessages = [];
      this.statusMessages.push("Poll has been moved to another tab.");
      setTimeout(() => (this.statusMessages = []), 7000);
    },
    async deletePoll(pollId) {
      if (confirm("Are you sure you want to delete this poll?")) {
        await deletePoll(pollId);
        const fetchedPollObject = await fetchPolls();
        this.polls = fetchedPollObject.data;
        this.statusMessages = [];
        this.statusMessages.push("Poll deleted.");
        setTimeout(() => (this.statusMessages = []), 7000);
      }
    }
  }
};
</script>
