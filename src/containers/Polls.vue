<template>
  <div class="container">
    <h1>All Peerigon Polls</h1>
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
import { isOpen, isDraft, isClosed } from "../lib/poll.js";

const mapTabToFilterFunction = {
  open: isOpen,
  drafts: isDraft,
  closed: isClosed
};

export default {
  components: {
    PollTabs
  },
  props: {
    tab: {
      type: String,
      default: "open"
    }
  },
  data() {
    return {
      polls: []
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
    this.polls = await fetchPolls();
  },
  methods: {
    async onStatusChange(pollId, status) {
      console.log("STATUS CHANGE REQUESTED", pollId, status);
      if (status === "DRAFT") {
        if (
          confirm(
            "Are you sure you want to move this poll in drafts? All votes will be deleted."
          )
        ) {
          await changePollStatus(pollId, status);
          this.polls = await fetchPolls();
        }
        return;
      }
      await changePollStatus(pollId, status);
      this.polls = await fetchPolls();
    },
    async deletePoll(pollId) {
      if (confirm("Are you sure you want to delete this poll?")) {
        await deletePoll(pollId);
        this.polls = await fetchPolls();
      }
    }
  }
};
</script>
