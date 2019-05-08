<template>
  <div v-if="!voted" class="container">
    <header>
      <div class="breadcrumb">
        <span>Vote</span>
      </div>
      <h1>{{ poll.title }}</h1>
      <p class="subhead">{{ poll.addInfo }}</p>
      <p class="subhead">{{ statusText }}</p>
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
          icon="arrow-right-circle"
          text="Submit your
        choice"
          @click="submitVote"
        />
      </router-link>
      <router-link to="submitted" class="button-link">
        <TextButton
          background-color="coral"
          icon="arrow-right-circle"
          text="Abstain instead"
          @click="abstainVote"
        />
      </router-link>
    </main>
  </div>
</template>

<script>
import TextButton from "./TextButton.vue";
import PollOption from "./PollOption.vue";
import draggable from "vuedraggable";
import { saveVote, fetchVote } from "../lib/api.js";
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
      vote: [],
      statusText: ""
    };
  },
  created() {
    fetchVote(this.poll.id, "xxxx").then(
      result => {
        this.statusText = `This is what you voted for ${
          this.poll.title
        }. Change the order and resubmit if you would like to change your ranking.`;
        this.vote = result.ranking;
      },
      error => {
        // eslint-disable-next-line no-console
        console.log(error);
        if (error.message == "abstained") {
          this.statusText = `You're currently abstaining. If you'd like to vote for ${
            this.poll.title
          } after all, please resubmit.`;
        }
        if (error.message == "notVoted") {
          this.statusText = `This is the first time you're voting for ${
            this.poll.title
          }.`;
        }
        this.vote = this.shuffleArray(this.poll.options);
        // eslint-disable-next-line no-console
        console.log(this.vote);
      }
    );
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
