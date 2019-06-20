<template>
  <div class="container">
    <ul class="tabs">
      <router-link class="tab" :to="{ name: 'polls', params: { tab: 'open' } }"
        >Open</router-link
      >
      <router-link
        class="tab"
        :to="{ name: 'polls', params: { tab: 'drafts' } }"
        >Drafts</router-link
      >
      <router-link
        class="tab"
        :to="{ name: 'polls', params: { tab: 'closed' } }"
        >Closed</router-link
      >
    </ul>
    <PollList v-if="filteredPolls" :polls="filteredPolls" />
  </div>
</template>

<script>
import PollList from "./PollList";
export default {
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
