<template>
  <div v-if="!voted" class="container">
    <header>
      <div class="breadcrumb">
        <span>Poll</span>
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
      <Container>
        <Draggable v-for="(option, index) in vote" :key="index">
          <PollOption
            :id="option.id"
            :index="index"
            :title="option.title"
            :add-info="option.addInfo"
            class="option"
          />
        </Draggable>
      </Container>
      <router-link to="submitted" class="button-link">
        <TextButton
          to="submitted"
          icon="arrow-right-circle"
          text="Submit your
        choice"
          @click="submitPoll"
        />
      </router-link>
    </main>
  </div>
</template>

<script>
import TextButton from "./TextButton.vue";
import PollOption from "./PollOption.vue";
import { Container, Draggable } from "vue-smooth-dnd";
export default {
  name: "Poll",
  components: {
    TextButton,
    PollOption,
    Container,
    Draggable
  },
  props: {
    poll: {
      type: Object,
      required: true,
      default: function() {
        return {
          id: "",
          title: "",
          start: "",
          end: "",
          info: "",
          options: [{ title: "", id: "", addInfo: "" }]
        };
      }
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
    submitPoll() {
      this.$emit("voteSubmit", {
        pollId: this.poll.id,
        userId: "xxxx",
        ranking: this.vote
      });
      this.voted = true;
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
