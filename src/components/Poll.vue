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
        <Draggable v-for="(option, index) in ranking" :key="index">
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
      voted: false
    };
  },
  computed: {
    ranking() {
      return this.shuffle(this.poll.options);
    }
  },
  methods: {
    shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
    submitPoll() {
      this.$emit("voteSubmit", {
        pollId: this.poll.id,
        userId: "xxxx",
        ranking: this.ranking
      });
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
