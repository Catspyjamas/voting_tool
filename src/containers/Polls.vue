<template>
  <PollTabs :filtered-polls="filteredPolls" />
</template>

<script>
import { fetchPolls } from "../lib/api.js";
import PollTabs from "../components/PollTabs";
import { isOpen, isDraft, isClosed } from "../lib/api.js";

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
  }
};
</script>
