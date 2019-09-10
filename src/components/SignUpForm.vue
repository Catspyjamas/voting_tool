<template>
  <form id="signup">
    <FormFieldset
      v-model="email"
      field-id="email"
      label-text="Mail Address *"
      placeholder="Mail Address"
      name="email"
      :required="true"
      type="email"
    />
    <FormFieldset
      v-model="firstName"
      field-id="first-name"
      label-text="First Name *"
      placeholder="First Name"
      name="first-name"
      :required="true"
    />
    <FormFieldset
      v-model="lastName"
      field-id="last-name"
      label-text="Last Name *"
      placeholder="Last Name"
      name="last-name"
    />
    <FormFieldset
      v-model="password"
      type="password"
      field-id="password"
      label-text="Password *"
      placeholder="Password"
      name="password"
      :required="true"
    />
    <FormFieldset
      v-model="passwordConfirm"
      type="password"
      field-id="password-confirm"
      label-text="Confirm Password *"
      placeholder="Confirm Password"
      name="password-confirm"
      :required="true"
    />
    <TextButton type="submit" text="Sign Up ->" @click="onSubmit" />
  </form>
</template>

<script>
import FormFieldset from "./FormFieldset.vue";
import TextButton from "./TextButton.vue";
export default {
  name: "SignUpForm",
  components: {
    FormFieldset,
    TextButton
  },
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: ""
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit-signup", {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        passwordConfirm: this.passwordConfirm
      });
    }
  }
};
</script>
