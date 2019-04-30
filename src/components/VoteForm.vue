<template>
  <div v-if="!voted" class="container">
    <header>
      <div class="breadcrumb">
        <span>Vote</span>
      </div>
      <h1>{{ poll.title }}</h1>
      <p class="subhead">{{ poll.addInfo }}</p>
      <p class="subhead">
        Or, if you would you rather not vote at all and leave your vote blank,
        you can also choose to abstain from the vote.
      </p>
      <TextButton text="Abstain" background-color="coral" direction="left" />
    </header>
    <main>
      <draggable v-model="vote">
        <PollOption
          v-for="(option, index) in vote"
          :id="option.id"
          :key="index"
          :index="index"
          :title="option.title"
          :add-info="option.addInfo"
          class="option"
        />
      </draggable>
      <router-link to="submitted" class="button-link">
        <TextButton
          to="submitted"
          icon="arrow-right-circle"
          text="Submit your
        choice"
          @click="submitVote"
        />
      </router-link>
    </main>
  </div>
</template>

<script>
import TextButton from "./TextButton.vue";
import PollOption from "./PollOption.vue";
import draggable from "vuedraggable";
import { saveVote } from "../lib/api.js";
export default {
  name: "Poll",
  components: {
    TextButton,
    PollOption,
    draggable
  },
  props: {
    poll: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      voted: false,
      vote: []
    };
  },
  created() {
    this.vote = this.shuffleArray(this.poll.options);
  },
  methods: {
    submitVote() {
      saveVote({
        pollId: this.poll.id,
        userId: "xxxx",
        abstain: false,
        ranking: this.vote
      });
      this.voted = true;
    },
    abstainVote() {
      saveVote({
        pollId: this.poll.id,
        userId: "xxxx",
        abstain: true,
        ranking: []
      });
    },
    shuffleArray(arr) {
      return arr
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
    }
  }
};
</script>

<style lang="scss" scoped>
.subhead {
  color: $primary;
  font-size: $medium;
  line-height: 1.1em;
}

.option {
  color: $primary;
  display: flex;
  border-top: 1px solid $primary;
  padding-top: 1em;
  position: relative;
  cursor: move;
}
</style>
