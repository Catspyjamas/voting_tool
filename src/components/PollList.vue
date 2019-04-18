<template>
  <ul>
    <li v-for="poll of polls" :key="poll.id">
      <router-link :to="{ name: 'poll', params: { pollId: poll.id } }">
        {{ poll.title }}
      </router-link>
    </li>
  </ul>
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
