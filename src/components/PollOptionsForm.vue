<template>
  <form class="form__innerbox" @submit.prevent="onSubmit">
    <Messages :error-messages="optionErrors" />
    <FormFieldset
      v-model="title"
      field-id="vote__option__title"
      label-text="What's the option you would like to add?"
      placeholder="Option title"
      name="title"
      :required="true"
    />
    <FormFieldset
      v-model="description"
      field-id="vote__option__info"
      label-text="Additional Info about the option"
      placeholder="Option title"
      name="description"
      :textarea="true"
    />
    <IconButton icon="plus" type="submit" />
  </form>
</template>
<script>
import IconButton from "./IconButton.vue";
import FormFieldset from "./FormFieldset.vue";
import Messages from "./Messages.vue";
export default {
  name: "PollOptionsForm",
  components: {
    IconButton,
    FormFieldset,
    Messages
  },
  data() {
    return {
      title: null,
      description: null,
      optionErrors: []
    };
  },
  methods: {
    onSubmit() {
      const { title, description } = this;
      this.$emit("poll-option-submit", {
        title,
        description
      });
      this.title = "";
      this.description = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.button__add {
  background-color: $mint;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}

.form__innerbox {
  padding: 1em;
}

.form__innerbox {
  border: 1px solid rgba(232, 232, 232, 0.5);
  position: relative;
}
</style>
