<template>
  <ul class="poll-list">
    <li v-for="poll of polls" :key="poll.id" class="polls">
      <div class="poll-head">
        <h2>{{ poll.title }}</h2>
        <div class="poll-links">
          <router-link
            v-if="isDraft(poll)"
            :to="{ name: 'EditPoll', params: { poll: poll, pollId: poll.id } }"
          >
            <TextButton text="Edit" direction="right" />
          </router-link>
          <TextButton
            v-if="isDraft(poll)"
            text="Open Vote"
            direction="right"
            background-color="#646464"
            @click="openPoll(poll.id)"
          />
          <router-link
            v-if="isOpen(poll)"
            :to="{ name: 'Vote', params: { pollId: poll.id } }"
          >
            <Text-Button text="Vote" direction="right" />
          </router-link>
          <TextButton
            v-if="isOpen(poll)"
            text="Close Poll"
            direction="right"
            background-color="#646464"
            @click="closePoll(poll.id)"
          />
          <router-link
            v-if="isClosed(poll)"
            :to="{ name: 'Results', params: { pollId: poll.id } }"
          >
            <Text-Button
              text="Results"
              direction="right"
              background-color="#2B239E"
            />
          </router-link>
          <TextButton
            v-if="isClosed(poll) || isOpen(poll)"
            text="Move in Drafts"
            direction="right"
            background-color="#505050"
            @click="draftPoll(poll.id)"
          />
          <TextButton
            text="Delete"
            direction="right"
            background-color="#ff7a7a"
            @click="deletePoll(poll.id)"
          />
        </div>
      </div>
      <div class="poll-content">
        <p>Start: {{ poll.start }}</p>
        <p>End: {{ poll.end }}</p>
        <p>Status: {{ poll.status }}</p>
      </div>
    </li>
    <p v-if="polls.length === 0" class="no-polls">
      There aren't any polls in here.
    </p>
  </ul>
</template>

<script>
import TextButton from "./TextButton";

import {
  isClosed,
  isOpen,
  isDraft,
  closePoll,
  openPoll,
  draftPoll,
  deletePoll
} from "../lib/api.js";

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
  },
  methods: {
    openPoll(id) {
      openPoll(id);
    },
    closePoll(id) {
      closePoll(id);
    },
    draftPoll(id) {
      draftPoll(id);
    },
    deletePoll(id) {
      deletePoll(id);
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss">
ul {
  display: flex;
  justify-content: left;
}

.polls {
  width: 100%;
  border: 1px solid white;
  margin: $standard 0 $standard 0;
  padding: 0 $standard 0 $standard;
  flex-direction: column;
}

.poll-head {
  align-items: baseline;
  display: flex;
  width: 100%;
  border-bottom: 1px solid white;
  margin-bottom: $standard;
  h2 {
    display: block;
    width: 100%;
  }
  a {
    border: 0;
    margin: 0;
    display: flex;
    align-items: baseline;
    padding-left: $small;
  }
}

.poll-links {
  display: flex;
  flex-wrap: nowrap;
  a {
    padding: 0;
  }
}

.no-polls {
  padding-top: 1em;
}

.poll-list {
  flex-wrap: wrap;
  flex-direction: column;
}
</style>
