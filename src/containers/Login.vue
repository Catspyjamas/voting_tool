<template>
  <div class="container">
    <Messages
      :status-messages="statusMessages"
      :error-messages="errorMessages"
    />
    <LoginForm v-if="!$loggedIn" @submit-login="submitLogIn" />
  </div>
</template>
<script>
import LoginForm from "../components/LoginForm";
import Messages from "../components/Messages";
import { login } from "../lib/api";
export default {
  name: "Login",
  components: { LoginForm, Messages },
  data() {
    return {
      statusMessages: [],
      errorMessages: []
    };
  },

  methods: {
    async submitLogIn(credentials) {
      const response = await login(credentials);
      if (response.status === "fail") {
        this.errorMessages.length = 0;
        this.errorMessages = response.errors.map(error => error.msg);
      } else if (response.status === "success") {
        this.errorMessages.length = 0;
        this.statusMessages.push(`You are now logged in.`);
        this.$loggedIn = true;
        console.log("LOGGED IN?", this.$loggedIn);
      } else {
        this.errorMessages.length = 0;
        console.log("HERE'S WHAT CAME BACK:", response);
        this.errorMessages.length = 0;
        this.errorMessages.push(
          "Sorry, that didn't go through. Please try again later."
        );
      }
    }
  }
};
</script>
