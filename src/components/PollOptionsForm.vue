<template>
  <form class="form__innerbox" @submit.prevent="onSubmit">
    <FormFieldset
      v-model="title"
      field-id="vote__option__title"
      label-text="What's the option you would like to add?"
      placeholder="Option title"
      name="title"
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
import uniqid from "uniqid";
export default {
  name: "PollOptionsForm",
  components: {
    IconButton,
    FormFieldset
  },
  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    onSubmit() {
      const { title, description } = this;
      this.$emit("submit", {
        title,
        description,
        id: this.createId(title)
      });
      this.title = "";
      this.description = "";
    },
    createId(string) {
      return uniqid(
        string
          .replace(/[^a-zA-Zs]/g, "")
          .toLowerCase()
          .slice(0, 3) + "-"
      );
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

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.7s ease;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
</style>
