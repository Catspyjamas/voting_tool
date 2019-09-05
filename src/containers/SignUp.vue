<template>
  <div class="container">
    <SignUpForm @submit-signup="submitSignUp" />
  </div>
</template>
<script>
import SignUpForm from "../components/SignUpForm";
import { signup } from "../lib/api.js";

export default {
  name: "SignUp",
  components: { SignUpForm },
  methods: {
    async submitSignUp(credentials) {
      await signup(credentials);
    }
  }
};
</script>
