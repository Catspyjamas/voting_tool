<template>
  <div id="app">
    <nav>
      <div class="navlinks">
        <router-link class="navlink" to="/polls">Polls</router-link>
        <router-link class="navlink" to="/about">About</router-link>
      </div>
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
h4 {
  font-family: "nexablack";
  font-weight: normal;
  text-decoration: none;
  color: white;
}

a {
  font-family: "nexablack";
  text-decoration: none;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: $xsmall 0;
  margin: $standard 0;
  display: inline-block;
}

body,
p {
  font-family: "plex-light", sans-serif;
  color: $grey1;
  margin-top: unset;
  margin-bottom: $xsmall;
}
body {
  margin: 0;
}

h1 {
  font-size: 3em;
  margin-bottom: $xsmall;
  margin-top: 0.2em;
  line-height: 1.1em;
}

h2 {
  font-size: 1.8em;
  margin-top: unset;
  margin-bottom: unset;
  line-height: 110%;
}

body {
  background: $dark;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
}

p {
  font-size: 1.3em;
}

nav {
  background-color: white;
  position: sticky;
}

.navlinks {
  margin: 0 auto 0 auto;
  display: flex;

  max-width: 70vw;
  @media (max-width: 750px) {
    max-width: 90vw;
  }
  align-items: center;
  justify-content: space-between;
}

.navlink {
  transition: 200ms box-shadow ease-out, 200ms font-weight ease;
  margin: $standard $xsmall $standard 0;
  padding: 0.1em $xsmall 0 $xsmall;
  min-width: min-content;
  display: flex;
  text-decoration: none;
  color: $dark;
  font-family: "plex-light";
  letter-spacing: unset;
  text-transform: none;
  font-size: $small;
  box-shadow: inset 0 0px 0 0 $mint;
  &:hover {
    box-shadow: inset 0 -0.6em 0 0 #0bb3a25d;
    font-weight: 500;
  }
}

.breadcrumb {
  color: $grey1;
  font-size: $standard;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  padding-bottom: $xsmall;
}

.tagline {
  font-size: $small;
}

.container {
  padding: 2em 0 6em 0;
  margin: 0 auto 0 auto;
  max-width: 70vw;
  @media (max-width: 750px) {
    max-width: 90vw;
  }
  min-height: 100vh;
}

.feather__content {
  color: white;
}

.message {
  display: block;
  color: $mint;
  margin: $large auto $large auto;
  text-align: center;
}

.instructions {
  padding: 0 0 0 $xsmall;
  margin-bottom: 1em;
  border-left: 1px solid $grey1;
  display: block;
  color: $grey1;
}

.router-link-active,
.router-link-exact-active {
  color: $dark;
  font-family: "plex-medium";
}

.button-link {
  font-family: unset;
  text-decoration: unset;
  border-bottom: unset;
  padding: unset;
  margin: 1em 0;
  display: unset;
}

.edit {
  color: $mint;
  border-color: $mint;
}

#app {
  width: 100%;
}
</style>
