<template>
  <div class="container">
    <ul class="tabs">
      <router-link class="tab" :to="{ name: 'Polls', params: { tab: 'open' } }"
        >Open</router-link
      >
      <router-link
        class="tab"
        :to="{ name: 'Polls', params: { tab: 'drafts' } }"
        >Drafts</router-link
      >
      <router-link
        class="tab"
        :to="{ name: 'Polls', params: { tab: 'closed' } }"
        >Closed</router-link
      >
    </ul>
    <PollList
      v-if="filteredPolls"
      :polls="filteredPolls"
      @status-change="onStatusChange"
      @delete-poll="onDelete"
    />
    <router-link :to="{ name: 'NewPoll' }" class="button-link">
      <IconButton icon="plus" />
    </router-link>
  </div>
</template>

<script>
import PollList from "./PollList";
import IconButton from "./IconButton";
export default {
  components: {
    PollList,
    IconButton
  },
  props: {
    filteredPolls: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    onStatusChange(pollId, status) {
      this.$emit("status-change", pollId, status);
    },
    onDelete(pollId) {
      this.$emit("delete-poll", pollId);
    }
  }
};
</script>
<style lang="scss">
.tabs {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $mint;
  .tab {
    list-style: none;
    cursor: pointer;
    margin: 0;
    padding: 0 $large $xsmall $large;
    border-bottom: none;
    flex-wrap: wrap;
  }
  .router-link-exact-active {
    color: $mint;
    border-bottom: 2px solid $mint;
    z-index: 1;
  }
}
</style>
