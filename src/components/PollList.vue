<template>
  <ul>
    <li v-for="poll of polls" :key="poll.id">
      <p>{{ poll.title }}</p>
      <router-link :to="{ name: 'PollEdit', params: { pollId: poll.id } }">
        <TextButton text="Edit" direction="right" />
      </router-link>
      <p v-if="(polls.length = 0)">There are no polls in view.</p>
    </li>
  </ul>
</template>

<script>
import TextButton from "./TextButton";
export default {
  components: {
    TextButton
  },
  props: {
    polls: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
ul {
  display: flex;
  justify-content: left;
  li {
    flex-wrap: nowrap;
    align-items: baseline;
    width: 100%;
    p {
      display: block;
    }
    a {
      border: 0;
      margin: 0;
      display: flex;
      align-items: baseline;
    }
  }
}
</style>
