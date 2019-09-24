<template>
  <div class="container">
    <Messages
      :status-messages="statusMessages"
      :error-messages="errorMessages"
    />
    <LoginForm v-if="!$root.loggedIn" @submit-login="submitLogIn" />
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
        this.$root.loggedIn = true;
        setTimeout(() => (this.statusMessages = []), 2000);
      } else {
        this.errorMessages.length = 0;
        this.errorMessages.length = 0;
        this.errorMessages.push(
          "Sorry, that didn't go through. Please try again later."
        );
      }
    }
  }
};
</script>
