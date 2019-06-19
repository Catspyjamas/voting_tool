<template>
  <ul>
    <li v-for="poll of polls" :key="poll.id">
      <p>{{ poll.title }}</p>
      <div class="poll-links">
        <router-link :to="{ name: 'EditPoll', params: { pollId: poll.id } }">
          <TextButton text="Edit" direction="right" />
        </router-link>
        <router-link
          v-if="poll.active === true && poll.ended === false"
          :to="{ name: 'vote', params: { pollId: poll.id } }"
        >
          <Text-Button text="Vote" direction="right" />
        </router-link>
        <router-link
          v-if="poll.hasbeenactive === true"
          :to="{ name: 'results', params: { pollId: poll.id } }"
        >
          <Text-Button
            text="Results"
            direction="right"
            background-color="#2B239E"
          />
        </router-link>
      </div>
    </li>
    <p v-if="polls.length === 0" class="no-polls">
      There aren't any polls in here.
    </p>
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
      padding-left: $small;
    }
  }
}

.poll-links {
  display: flex;
  flex-wrap: nowrap;
}

.no-polls {
  padding-top: 1em;
}
</style>
