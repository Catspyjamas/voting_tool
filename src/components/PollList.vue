<template>
  <ul class="poll-list">
    <li v-for="poll of polls" :key="poll.id">
      <p>{{ poll.title }}</p>
      <div class="poll-links">
        <router-link
          v-if="isDraft(poll)"
          :to="{ name: 'EditPoll', params: { pollId: poll.id } }"
        >
          <TextButton text="Edit" direction="right" />
        </router-link>
        <router-link
          v-if="isOpen(poll)"
          :to="{ name: 'vote', params: { pollId: poll.id } }"
        >
          <Text-Button text="Vote" direction="right" />
        </router-link>
        <router-link
          v-if="isClosed(poll)"
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
import { isClosed, isOpen, isDraft } from "../lib/api.js";

export default {
  components: {
    TextButton
  },
  props: {
    polls: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isClosed,
      isOpen,
      isDraft
    };
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

.poll-list {
  flex-wrap: wrap;
}
</style>
