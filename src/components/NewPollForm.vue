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
        v-model="pollTitle"
        field-id="poll_title"
        label-text="Add a title for your vote"
        placeholder="Title"
        name="vote-title"
      />
      <legend>Start Time</legend>
      <form-fieldset
        v-model="pollStart"
        field-id="poll_start"
        label-text="When should your poll start?"
        placeholder="e.g. '2019-07-28 09:30'"
      />
      <legend>End Time</legend>
      <form-fieldset
        v-model="pollEnd"
        field-id="poll_end"
        label-text="When should your poll end?"
        placeholder="e.g. '2019-07-31 18:30'"
      />
      <legend>Vote Question</legend>
      <FormFieldset
        v-model="pollInfo"
        field-id="poll_info"
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
        <div v-for="(option, index) in pollOptions" :key="option.title">
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
      text="Submit your Poll"
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
      pollTitle: "",
      pollInfo: "",
      pollOptions: [{ title: "Radlfahren", addInfo: "in Penzberg" }],
      pollStart: "",
      pollEnd: "",
      polls: []
    };
  },
  methods: {
    addOption(option) {
      this.pollOptions.push(option);
    },
    removeOption(index) {
      if (index !== -1) {
        this.pollOptions.splice(index, 1);
      }
    },
    saveVotingInfo() {
      const { pollTitle, pollInfo, pollOptions, pollStart, pollEnd } = this;
      this.polls.push({ pollTitle, pollInfo, pollOptions, pollStart, pollEnd });
      this.$emit("pollSubmit", {
        pollTitle,
        pollInfo,
        pollOptions,
        pollStart,
        pollEnd
      });
      this.pollTitle = "";
      this.pollInfo = "";
      this.pollOptions = "";
      this.pollStart = "";
      this.pollEnd = "";
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
  font-size: $small;
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

legend {
  overflow: hidden;
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
</style>
