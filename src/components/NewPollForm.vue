<template>
  <div class="container">
    <header>
      <div class="breadcrumb">
        <span>Details ></span>
      </div>
    </header>
    <form id="vote">
      <legend>Vote Title</legend>
      <FormFieldset
        v-model="voteTitle"
        field-id="vote__title"
        label-text="Add a title for your vote"
        placeholder="Title"
        name="vote-title"
      />
      <legend>Vote Question</legend>
      <FormFieldset
        v-model="voteQuestion"
        field-id="vote__question"
        label-text="Add all the information and questions that voters might need to make their decision"
        placeholder="Poll information"
        :textarea="true"
        name="vote-question"
      />
      <p class="instructions">
        Add several options that you would like to vote on.
      </p>
      <PollChoiceForm @submit="addOption" />
    </form>
    <ul>
      <transition-group
        name="list"
        class="list"
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
      >
        <div v-for="(option, index) in options" :key="option.title">
          <div class="list__options">
            <div class="list__options__info">
              <li class="list__options__title">{{ option.title }}</li>
              <p>{{ option.addInfo }}</p>
            </div>
            <IconButton
              class="icon_option"
              icon="x"
              @click="removeOption(index)"
            />
          </div>
        </div>
      </transition-group>
    </ul>
    <TextButton
      type="submit"
      icon="arrow-right-circle"
      text="Go to voters"
      form="vote"
      @click="saveVotingInfo"
    />
  </div>
</template>

<script>
import TextButton from "./TextButton.vue";

import PollChoiceForm from "./PollChoiceForm.vue";
import IconButton from "./IconButton.vue";
import FormFieldset from "./FormFieldset.vue";
export default {
  name: "NewPollForm",
  components: {
    PollChoiceForm,
    IconButton,
    TextButton,
    FormFieldset
  },
  data() {
    return {
      voteTitle: "",
      voteQuestion: "",
      options: [{ title: "Radlfahren", addInfo: "in Penzberg" }],
      vote: {}
    };
  },
  methods: {
    addOption(option) {
      this.options.push(option);
    },
    removeOption(index) {
      if (index !== -1) {
        this.options.splice(index, 1);
      }
    },
    saveVotingInfo() {
      this.vote.voteTitle = this.voteTitle;
      this.vote.voteQuestion = this.voteQuestion;
      this.vote.options = this.options;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

li {
  display: flex;
  justify-content: space-between;
}

.icon_option {
  margin-top: -$small;
  margin-right: -$small;
}

.container {
  min-height: 100vh;
}

.list__options {
  color: white;
  display: flex;
  justify-content: space-between;
  position: relative;
  border-top: 1px solid $primary;
  margin-top: 2em;
}

.list__options__title {
  font-family: nexablack;
  font-size: 1.3em;
  padding: 1em 0 0.5em 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
