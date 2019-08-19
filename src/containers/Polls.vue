<template>
  <PollTabs
    :filtered-polls="filteredPolls"
    @close-poll="closePoll"
    @open-poll="openPoll"
    @draft-poll="draftPoll"
    @delete-poll="deletePoll"
  />
</template>

<script>
import {
  fetchPolls,
  closePoll,
  openPoll,
  draftPoll,
  deletePoll
} from "../lib/api.js";
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
    async closePoll(pollId) {
      await closePoll(pollId);
    },
    async openPoll(pollId) {
      await openPoll(pollId);
    },
    async draftPoll(pollId) {
      await draftPoll(pollId);
    },
    async deletePoll(pollId) {
      await deletePoll(pollId);
    }
  }
};
</script>
