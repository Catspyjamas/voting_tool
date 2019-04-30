<template>
  <ul>
    <li v-for="poll of polls" :key="poll.id">
      <p>{{ poll.title }}</p>
      <div class="poll-links">
        <router-link :to="{ name: 'PollEdit', params: { pollId: poll.id } }">
          <TextButton text="Edit" direction="right" />
        </router-link>
        <router-link
          v-if="(poll.active = true)"
          :to="{ name: 'Vote', params: { pollId: poll.id } }"
        >
          <Text-Button text="Vote" direction="right" />
        </router-link>
      </div>
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

.poll-links {
  display: flex;
  flex-wrap: nowrap;
}
</style>
