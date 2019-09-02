<template>
  <form id="Poll">
    <transition name="status-message">
      <div
        v-if="errors.length"
        id="status-message-polls"
        class="status-message status-message-warning"
      >
        <p>Please correct the following error(s):</p>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </transition>
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
      v-model="description"
      field-id="poll_info"
      label-text="Add all the information and questions that voters might need to make their decision"
      placeholder="Poll information"
      :textarea="true"
      name="vote-question"
    />
    <p class="instructions">Add several options that you would like to vote on.</p>
    <PollOptionsForm @submit="addOption" />

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
              <p>{{ option.description }}</p>
            </div>
            <IconButton class="icon_option" icon="x" @click="removeOption(index)" />
          </div>
        </div>
      </transition-group>
    </ul>

    <TextButton
      type="submit"
      icon="arrow-right-circle"
      text="Save Changes"
      form="Poll"
      @click="pollSubmit"
    />
  </form>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import PollOptionsForm from "./PollOptionsForm.vue";
import FormFieldset from "./FormFieldset.vue";
import TextButton from "./TextButton.vue";
import IconButton from "./IconButton.vue";

export default {
  name: "PollForm",
  components: {
    PollOptionsForm,
    FormFieldset,
    TextButton,
    IconButton,
    Datepicker
  },
  props: {
    poll: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      title: "",
      description: "",
      options: [],
      start: "",
      end: "",
      errors: []
    };
  },
  created() {
    this.title = this.poll.title;
    this.description = this.poll.description;
    this.options = this.poll.options;
    this.start = this.poll.start;
    this.end = this.poll.end;
    this.pollId = this.poll._id;
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
    pollSubmit() {
      if (!this.checkForm()) {
        return;
      }
      this.errors = [];

      const { title, description, options, start, end } = this;
      const pollObject = {
        title,
        description,
        options,
        start,
        end,
        status: "DRAFT"
      };

      this.$emit("pollSubmit", pollObject);
    },

    checkForm: function() {
      if (this.title && this.start && this.end && this.options.length > 1) {
        return true;
      }

      this.errors = [];

      if (!this.title) {
        this.errors.push("Title required.");
      }
      if (!this.start) {
        this.errors.push("Start date required.");
      }
      if (!this.end) {
        this.errors.push("End date required.");
      }
      if (this.options.length <= 1) {
        this.errors.push("At least two options required.");
      }
      // e.preventDefault();
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      return false;
    }
  }
};

//! Add date picker
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
  border-top: 1px solid $grey1;
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
