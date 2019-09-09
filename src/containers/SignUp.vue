<template>
  <div class="container">
    <Messages
      :status-messages="statusMessages"
      :error-messages="errorMessages"
    />
    <SignUpForm @submit-signup="submitSignUp" />
  </div>
</template>
<script>
import SignUpForm from "../components/SignUpForm";
import Messages from "../components/Messages";
import { signup } from "../lib/api.js";

export default {
  name: "SignUp",
  components: { SignUpForm, Messages },
  data() {
    return {
      statusMessages: [],
      errorMessages: [],
      response: null
    };
  },
  methods: {
    //Axios throws an error if status messages aren't 200-300. With fetch we needn't use try/catch
    async submitSignUp(credentials) {
      const response = await signup(credentials);
      if (response.status === "fail") {
        this.errorMessages.length = 0;
        this.errorMessages = response.errors.map(error => error.msg);
      }
      if (response.status === "error") {
        this.errorMessages.length = 0;
        this.errorMessages.push(
          "Sorry, that didn't go through. Please try again later."
        );
      }
      if (response.status === "success") {
        this.errorMessages.length = 0;
        this.statusMessages.push(
          `Created a new user for ${response.data.email}`
        );
      }
    }
  }
};
</script>
