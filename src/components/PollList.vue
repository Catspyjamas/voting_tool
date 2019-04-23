<template>
  <div class="container">
    <ul>
      <li v-for="poll of polls" :key="poll.id">
        <p>{{ poll.title }}</p>
        <router-link
          class="edit"
          :to="{ name: 'PollEdit', params: { pollId: poll.id } }"
          >Edit</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    polls: {
      type: Array,
      default: () => []
    }
  }
};
</script>
