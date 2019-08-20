<template>
  <div class="container">
    <header>
      <div class="breadcrumb">
        <span>Vote</span>
      </div>
      <h1>{{ poll.title }}</h1>
      <p class="subhead">{{ poll.description }}</p>
      <p class="subhead">{{ statusText }}</p>
    </header>
    <main>
      <draggable v-model="rankedOptions">
        <PollOption
          v-for="(option, index) in rankedOptions"
          :id="option._id"
          :key="option._id"
          :index="index"
          :title="option.title"
          :description="option.description"
          class="option"
        />
      </draggable>
      <router-link
        :to="{ name: 'Submitted', params: { userId: userId } }"
        class="button-link"
        :user-id="userId"
      >
        <TextButton
          icon="arrow-right-circle"
          text="Submit your
        choice"
          @click="submitVote"
        />
      </router-link>
      <router-link
        :to="{ name: 'Submitted', params: { userId: userId } }"
        class="button-link"
      >
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
  name: "VoteForm",
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
    initialRankedOptions: {
      type: Array,
      required: true
    },
    statusText: {
      type: String,
      required: true
    },
    userId: {
      type: String
    }
  },
  data() {
    return {
      voted: false,
      rankedOptions: [...this.initialRankedOptions]
    };
  },
  methods: {
    submitVote() {
      this.$emit("submitVote", this.rankedOptions.map(options => options._id));
      this.voted = true;
    },
    abstainVote() {
      this.$emit("submitVote", []);
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
