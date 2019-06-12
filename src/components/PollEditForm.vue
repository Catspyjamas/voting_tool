<template>
  <div class="container">
    <header>
      <div class="breadcrumb">
        <span>Edit {{ title }} ></span>
      </div>
    </header>
    <form id="Poll">
      <legend>Vote Title</legend>
      <FormFieldset
        v-model="title"
        field-id="poll_title"
        label-text="Add a title for your vote"
        placeholder="Title"
        name="poll-title"
      />
      <legend>Start Time</legend>
      <form-fieldset
        v-model="start"
        field-id="poll_start"
        label-text="When should your poll start?"
        placeholder="e.g. '2019-07-28 09:30'"
      />
      <legend>End Time</legend>
      <form-fieldset
        v-model="end"
        field-id="poll_end"
        label-text="When should your poll end?"
        placeholder="e.g. '2019-07-31 18:30'"
      />
      <legend>Vote Question</legend>
      <FormFieldset
        v-model="info"
        field-id="poll_info"
        label-text="Add all the information and questions that voters might need to make their decision"
        placeholder="Poll information"
        :textarea="true"
        name="vote-question"
      />
      <p class="instructions">Add several options that you would like to vote on.</p>
      <PollOptionsForm @submit="addOption"/>
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
            <IconButton class="icon_option" icon="x" @click="removeOption(index)"/>
          </div>
        </div>
      </transition-group>
    </ul>
    <TextButton
      type="submit"
      icon="arrow-right-circle"
      text="Save Changes"
      form="Poll"
      @click="savePollObject"
    />
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import TextButton from "./TextButton.vue";

import PollOptionsForm from "./PollOptionsForm.vue";
import IconButton from "./IconButton.vue";
import FormFieldset from "./FormFieldset.vue";
import { savePoll } from "../lib/api.js";
export default {
  name: "NewPollForm",
  components: {
    PollOptionsForm,
    IconButton,
    TextButton,
    FormFieldset
  },
  props: {
    poll: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: "",
      info: "",
      options: "",
      start: "",
      end: "",
      id: "",
      message: ""
    };
  },
  created() {
    this.title = this.poll.title;
    this.info = this.poll.info;
    this.options = this.poll.options;
    this.start = this.poll.start;
    this.end = this.poll.end;
    this.id = this.poll.id;
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
    savePollObject() {
      const { id, title, info, options, start, end } = this;
      savePoll({
        id,
        title,
        info,
        options,
        start,
        end
      });
      this.message = "Poll saved.";
    }
  }
};
</script>

<style lang="scss" scoped>
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
