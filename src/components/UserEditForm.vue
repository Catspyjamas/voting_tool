<template>
  <form id="signup">
    <FormFieldset
      v-model="newEmail"
      field-id="new-email"
      label-text="Mail Address"
      placeholder="Mail Address"
      name="new-email"
      type="email"
      :required="true"
    />
    <FormFieldset
      v-model="newFirstName"
      field-id="new-first-name"
      label-text="First Name"
      placeholder="First Name"
      name="new-first-name"
      :required="true"
    />
    <FormFieldset
      v-model="newLastName"
      field-id="new-last-name"
      label-text="Last Name"
      placeholder="Last Name"
      name="new-last-name"
      :required="true"
    />
    <FormFieldset
      v-model="newPassword"
      type="password"
      field-id="new-password"
      label-text="New Password"
      placeholder="New Password"
      name="new-password"
    />
    <FormFieldset
      v-model="newPasswordConfirm"
      type="password"
      field-id="new-password-confirm"
      label-text="Confirm New Password"
      placeholder="Confirm New Password"
      name="new-password-confirm"
    />
    <FormFieldset
      id="password-field"
      v-model="currentPassword"
      type="password"
      field-id="current-password"
      label-text="Please submit your current passwort to save changes.*"
      placeholder="Current password"
      name="current-password"
      :required="true"
    />
    <TextButton type="submit" text="Submit ->" @click="onSubmit" />
  </form>
</template>

<script>
import FormFieldset from "./FormFieldset.vue";
import TextButton from "./TextButton.vue";
export default {
  name: "UserEditForm",
  components: {
    FormFieldset,
    TextButton
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newEmail: this.user.email,
      currentPassword: "",
      newPasswordConfirm: "",
      newPassword: "",
      newFirstName: this.user.firstName,
      newLastName: this.user.lastName
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit-user-edit", {
        email: this.user.email,
        password: this.currentPassword,
        newEmail: this.newEmail,
        newFirstName: this.newFirstName,
        newLastName: this.newLastName,
        newPassword: this.newPassword,
        newPasswordConfirm: this.newPasswordConfirm
      });
    }
  }
};
</script>
<style lang="scss">
#password-field {
  padding-top: 30px;
  margin-top: 20px;
  border-top: 1px solid $grey1;
}
</style>
