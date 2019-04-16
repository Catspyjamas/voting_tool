<template>
  <div class="about container">
    <h1>Hello! This {{ their_name }} is a voting app.</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna ali...
    </p>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      their_name: this.$route.params.name
    };
  }
};
</script>
