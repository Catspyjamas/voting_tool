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
  </div>
</template>

<script>
import PollList from "./PollList";
export default {
  name: "PollTabs",
  components: {
    PollList
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
  .tab {
    font-family: "nexathin";
    border-top: 1px solid #4b4b4b;
    border-left: 1px solid #4b4b4b;
    border-right: 1px solid #4b4b4b;
    border-bottom: 1px solid white;
    color: white;
    flex-grow: 1;
    display: block;
    list-style: none;
    cursor: pointer;
    margin: 0 0 0 -1px;
    padding: $xsmall 0 $xsmall 0.8em;
    flex-wrap: wrap;
  }
  .router-link-exact-active {
    font-family: "nexablack";
    z-index: 1;
    border: 1px solid white;
    border-bottom: 1px solid $dark;
    &:focus {
      outline: none;
      box-shadow: none;
    }
    &:active {
      outline: none;
      box-shadow: none;
    }
  }
}
</style>
