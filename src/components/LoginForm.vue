<template>
  <form id="login">
    <FormFieldset
      v-model="email"
      field-id="email"
      label-text="Mail Address"
      placeholder="Mail Address"
      name="email"
    />
    <FormFieldset
      v-model="password"
      field-id="password"
      label-text="Password"
      placeholder="Password"
      name="password"
    />
    <TextButton type="submit" text="Log In ->" />
  </form>
</template>

<script>
import FormFieldset from "./FormFieldset.vue";
import TextButton from "./TextButton.vue";
export default {
  name: "LoginForm",
  components: {
    FormFieldset,
    TextButton
  },
  data() {
    return {
      email: "",
      password: ""
    };
  }
};
</script>
