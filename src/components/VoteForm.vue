<template>
  <div class="container">
    <header>
      <h1>{{ poll.title }}</h1>
      <p>{{ poll.description }}</p>
      <p>Drag and drop the order of options until you're happy.</p>
    </header>
    <main>
      <div class="status-message">
        <p class="subhead">{{ statusText }}</p>
      </div>
      <draggable
        id="vote-ranking-form"
        v-model="rankedOptions"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group
          type="transition"
          :name="!drag ? 'flip-ranked-options' : null"
        >
          <PollOption
            v-for="(option, index) in rankedOptions"
            :id="option._id"
            :key="option._id"
            :index="index"
            :title="option.title"
            :description="option.description"
            class="option"
            @click="element.fixed = !element.fixed"
          />
        </transition-group>
      </draggable>

      <TextButton
        icon="arrow-right-circle"
        text="Submit your
        choice"
        @click="submitVote"
      />

      <TextButton
        background-color="#ff7f50"
        icon="arrow-right-circle"
        text="Abstain instead"
        @click="abstainVote"
      />
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
      rankedOptions: [...this.initialRankedOptions],
      drag: false
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
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
header {
  max-width: 60vw;
  @media (max-width: 750px) {
    max-width: 100%;
  }
  p {
    margin-bottom: 0;
  }
}
#vote-ranking-form {
  margin: 2rem 0;
}

flip-ranked-options-move {
  transition: transform 0s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #0bb3a280;
}
</style>
