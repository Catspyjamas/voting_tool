<template>
  <div id="app">
    <nav>
      <router-link class="navlink" to="/">Home</router-link>
      <router-link class="navlink" to="/about">About</router-link>
      <router-link class="navlink" to="/newPollForm">New Election</router-link>
      <router-link class="navlink" to="/poll">Poll</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
a,
.navlink {
  font-family: "nexablack";
  font-weight: normal;
}

body,
p {
  font-family: "Lato", sans-serif;
  font-weight: normal;
  margin-top: unset;
  margin-bottom: 1em;
}

h1 {
  font-size: 3em;
}

body {
  background: linear-gradient(180deg, #06050e 0%, #23222a 100%);
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
}

p {
  font-size: $small;
}

nav a {
  padding: 0.6em;
  display: inline-block;
  text-decoration: none;
  background: #ffffff;
  color: #161616;
  text-transform: uppercase;
}

.breadcrumb {
  color: $primary;
  font-size: $small;
}

.tagline {
  font-size: $small;
}

.container {
  padding-top: 3em;
}

.breadcrumb {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding-bottom: 1em;
}

.feather__content {
  color: white;
}

.instructions {
  padding: 0 0 0 1em;
  margin-bottom: 1em;
  border-left: 1px solid $primary;
  display: block;
  color: $primary;
}

#app {
  width: 50%;
}
</style>
