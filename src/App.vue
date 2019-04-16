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
a {
  font-family: "nexablack";
  font-weight: normal;
}

body,
p {
  font-family: "speziabook", sans-serif;
  font-weight: normal;
  margin-top: unset;
  margin-bottom: $xsmall;
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

nav {
  background-color: white;
  margin: 0 auto 0 auto;
  position: sticky;
  display: flex;
  padding: 0 20vw 0 20vw;
  align-items: center;
}

.navlink {
  margin: $standard $small $standard 0;
  padding: 0.2em 0 0.2em 0;
  display: inline-block;
  text-decoration: none;
  color: $dark;
  text-transform: uppercase;
  font-family: "speziabook";
}

.breadcrumb {
  color: $primary;
  font-size: $standard;
}

.tagline {
  font-size: $small;
}

.container {
  padding: 1em 20vw 0 20vw;
}

.breadcrumb {
  text-transform: uppercase;
  letter-spacing: 0.5em;
  padding-bottom: $xsmall;
}

.feather__content {
  color: white;
}

.instructions {
  padding: 0 0 0 $xsmall;
  margin-bottom: 1em;
  border-left: 1px solid $primary;
  display: block;
  color: $primary;
}

.router-link-exact-active {
  border-bottom: 1px solid $dark;
  color: $dark;
}

#app {
  width: 100%;
}
</style>
