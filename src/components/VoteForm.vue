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
      <draggable v-model="ranking">
        <PollOption
          v-for="(option, index) in ranking"
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
    },
    vote: {
      type: Array,
      required: true
    },
    statusText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      voted: false,
      ranking: this.vote.slice()
    };
  },
  methods: {
    submitVote() {
      this.$emit("submit", this.ranking.map(options => options.id));
      this.voted = true;
    },
    abstainVote() {
      this.$emit("submit", []);
      this.voted = true;
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
