<template>
  <div class="container">
    <Messages
      :status-messages="statusMessages"
      :error-messages="errorMessages"
    />
    <UserSignUpForm v-if="!signedUp" @submit-signup="submitSignUp" />
  </div>
</template>
<script>
import UserSignUpForm from "../components/UserSignUpForm";
import Messages from "../components/Messages";
import { signup } from "../lib/api.js";

export default {
  name: "SignUp",
  components: { UserSignUpForm, Messages },
  data() {
    return {
      statusMessages: [],
      errorMessages: [],
      response: null,
      signedUp: false
    };
  },
  methods: {
    async submitSignUp(credentials) {
      if (credentials.passwordConfirm !== credentials.password) {
        this.errorMessages.push(
          "Please ensure that your password matches the password confirm."
        );
        return;
      }
      const { passwordConfirm, ...userObject } = credentials;
      const response = await signup(userObject);
      if (response.status === "fail" || response.status === "error") {
        this.errorMessages.length = 0;
        this.errorMessages = response.errors.map(error => error.msg);
        return;
      }
      if (response.status === "success") {
        this.errorMessages.length = 0;
        this.statusMessages.push(`Created a new user.`);
        this.signedUp = true;
        this.$root.loggedIn = true;
        return;
      } else {
        this.errorMessages.length = 0;
        this.errorMessages.push(
          "Sorry, that didn't go through. Please try again later."
        );
      }
    }
  }
};
</script>
