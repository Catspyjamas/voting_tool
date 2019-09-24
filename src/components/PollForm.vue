<template>
  <form id="Poll">
    <Messages :error-messages="errors" />
    <legend>Vote Title</legend>
    <FormFieldset
      v-model="pollModel.title"
      field-id="poll_title"
      label-text="Add a title for your vote"
      placeholder="Title"
      name="poll-title"
    />
    <legend>Start Time</legend>

    <FormFieldsetDate
      v-model="pollModel.start"
      field-id="poll_start"
      label-text="When should your poll start?"
      :date-string-initial="pollModel.start"
    />

    <legend>End Time</legend>
    <FormFieldsetDate
      v-model="pollModel.end"
      field-id="poll_end"
      label-text="When should your poll end?"
      :date-string-initial="pollModel.end"
      :min-datetime="pollModel.start"
    />

    <legend>Vote Question</legend>
    <FormFieldset
      v-model="pollModel.description"
      field-id="poll_info"
      label-text="Add all the information and questions that voters might need to make their decision"
      placeholder="Poll information"
      :textarea="true"
      name="vote-question"
    />
    <p class="instructions">
      Add several options that you would like to vote on.
    </p>
    <PollOptionsForm @poll-option-submit="addOption" />

    <ul class="list">
      <transition-group name="fade">
        <div v-for="(option, index) in pollModel.options" :key="option.title">
          <div class="list__options">
            <div class="list__options__info">
              <li class="list__options__title">{{ option.title }}</li>
              <p>{{ option.description }}</p>
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
      text="Save Changes"
      form="Poll"
      @click="pollSubmit"
    />
  </form>
</template>
<script>
import PollOptionsForm from "./PollOptionsForm.vue";
import FormFieldset from "./FormFieldset.vue";
import FormFieldsetDate from "./FormFieldsetDate.vue";
import TextButton from "./TextButton.vue";
import IconButton from "./IconButton.vue";
import Messages from "./Messages.vue";

export default {
  name: "PollForm",
  components: {
    PollOptionsForm,
    FormFieldset,
    FormFieldsetDate,
    TextButton,
    IconButton,
    Messages
  },
  props: {
    poll: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      errors: [],
      pollModel: {
        title: "",
        description: "",
        options: [],
        status: "DRAFT"
      }
    };
  },
  watch: {
    poll: function(updatedPoll) {
      Object.assign(this.pollModel, updatedPoll);
      // this.pollModel.start = new Date(updatedPoll.start.getTime());
      // this.pollModel.end = new Date(updatedPoll.end.getTime());
    }
  },
  created() {
    Object.assign(this.pollModel, this.poll);
    // this.pollModel.end = new Date(this.poll.end.toString());
  },
  methods: {
    addOption(option) {
      const optionList = document.querySelector(".list");
      const top = optionList.offsetTop;
      window.scrollTo({ left: 0, top: top, behavior: "smooth" });
      this.pollModel.options.push(option);
    },
    removeOption(index) {
      if (index !== -1) {
        this.pollModel.options.splice(index, 1);
      }
    },
    pollSubmit() {
      if (!this.checkForm()) {
        return;
      }
      this.errors = [];
      this.$emit("pollSubmit", this.pollModel);
      this.pollModel = {
        title: "",
        description: "",
        options: [],
        start: "",
        end: "",
        status: "DRAFT"
      };
    },

    checkForm: function() {
      const { title, start, end, options } = this.pollModel;

      if (title && start && end && options.length > 1) {
        return true;
      }
      window.scrollTo({ left: 0, top: -300 });

      this.errors = [];

      if (!title) {
        this.errors.push("Title required.");
      }
      if (!start) {
        this.errors.push("Start date required.");
      }
      if (!end) {
        this.errors.push("End date required.");
      }
      if (options.length <= 1) {
        this.errors.push("At least two options required.");
      }

      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  > span {
    width: 100%;
  }
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

.list {
  display: flex;
  flex-wrap: wrap;
}

.list__options {
  color: white;
  display: flex;
  justify-content: space-between;
  position: relative;
  border-top: 1px solid $grey1;
  margin-top: 2em;
  flex: 0 0 100%;
}

.list__options__title {
  font-family: nexablack;
  font-size: $small;
  padding: 1em 0 0.5em 0;
}

legend {
  overflow: hidden;
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.fade-enter-active,
.fade-leave-active {
  max-height: 800px;
  transition: all 1s ease, opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
