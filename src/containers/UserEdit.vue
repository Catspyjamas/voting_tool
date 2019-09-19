<template>
  <div class="container">
    <Messages
      :status-messages="statusMessages"
      :error-messages="errorMessages"
    />
    <UserEditForm v-if="user" :user="user" @submit-user-edit="submitUserEdit" />
  </div>
</template>
<script>
import UserEditForm from "../components/UserEditForm";
import Messages from "../components/Messages";
import { changeUser, fetchUser } from "../lib/api.js";

export default {
  name: "UserEdit",
  components: { UserEditForm, Messages },
  data() {
    return {
      statusMessages: [],
      errorMessages: [],
      user: null
    };
  },
  async mounted() {
    const userResponse = await fetchUser();
    if (userResponse.status === "fail" || userResponse.status === "error") {
      this.errorMessages.length = 0;
      this.errorMessages = userResponse.errors.map(error => error.msg);
      setTimeout(() => (this.errorMessages = []), 7000);
      return;
    }
    this.user = userResponse.data;
  },
  methods: {
    async submitUserEdit(credentials) {
      console.log("CREDENTIALS:", credentials);
      if (credentials.newPasswordConfirm !== credentials.newPassword) {
        this.errorMessages.push(
          "Please ensure that your password matches the password confirm."
        );
        return;
      }
      const { newPasswordConfirm, ...userObject } = credentials;
      const response = await changeUser(userObject);
      if (response.status === "fail") {
        this.errorMessages.length = 0;
        this.errorMessages = response.errors.map(error => error.msg);
        setTimeout(() => (this.errorMessages = []), 7000);
      } else if (response.status === "success") {
        this.errorMessages.length = 0;
        this.statusMessages.push(`User was updated.`);
        this.signedUp = true;
        this.$root.loggedIn = true;
        setTimeout(() => (this.statusMessages = []), 7000);
      } else {
        this.errorMessages.length = 0;
        this.errorMessages.push(
          "Sorry, that didn't go through. Please try again later."
        );
        setTimeout(() => (this.errorMessages = []), 7000);
      }
    }
  }
};
</script>
