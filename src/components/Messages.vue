<template>
  <transition name="status-message">
    <div v-if="errors.length" class="status-message status-message-warning">
      <p>Please correct the following error(s):</p>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <div v-if="messages.length" class="status-message">
      <ul>
        <li v-for="message in messages" :key="message">
          {{ message }}
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Messages",
  props: {
    statusMessages: {
      type: Array,
      default: null
    },
    errorMessages: {
      type: Array,
      default: null
    }
  },
  computed: {
    messages() {
      let messages = [];

      if (this.statusMessages !== null) {
        messages = this.statusMessages;
      }

      return messages;
    },
    errors() {
      let errors = [];

      if (this.errorMessages !== null) {
        errors = this.errorMessages;
      }

      return errors;
    }
  }
};
</script>
<style lang="scss">
.status-message {
  background-color: rgba(222, 251, 227, 0.8);
  border-left: 3px solid $mint;
  display: flex;
  max-height: 1000px;
  margin: 2rem 0;
  padding: 15px 15px;
  opacity: 1;
  flex-direction: column;
  padding-left: 15px;
  overflow: hidden;
  p {
    font-family: "plex-mono-italic";
    color: black;
    font-size: 1.1rem;
    line-height: 1.4rem;
    text-align: left;
  }
  ul {
    font-family: "plex-mono-italic";
    color: black;
    flex-direction: column;
    padding: 0 0;
    margin: 0 0;
    list-style-type: none;
  }
}

.status-message-warning {
  background-color: rgba(255, 241, 237, 0.8);
  border-left: 3px solid rgb(199, 118, 98);
}

.status-message-enter-active,
.status-message-leave-active {
  max-height: 800px;
  margin: 2rem 0;
  padding: 15px 15px;
  opacity: 1;
  transition: all 1s ease, opacity 0.8s ease;
}

.status-message-enter,
.status-message-leave-to {
  max-height: 0px;
  margin: 0 0;
  padding: 0 15px;
  opacity: 0;
}
</style>
