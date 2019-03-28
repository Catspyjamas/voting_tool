<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/newPollForm">Voting</router-link>
      <router-link to="/ballot">Ballot</router-link>
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

<style>
@import "./assets/css/fonts.css";

* {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
a {
  font-family: "nexablack", sans-serif;
}

body,
p,
label,
input {
  font-family: "Lato", sans-serif;
  font-weight: 300;
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

button {
  border-radius: 50%;
  height: 5em;
  width: 5em;
  border: none;
  position: absolute;
  bottom: -2.5em;
}

p {
  font-size: 1.25em;
}

nav a {
  padding: 0.6em;
  display: inline-block;
  text-decoration: none;
  background: #fff;
  color: #161616;
  text-transform: uppercase;
}

legend {
  display: none;
}

fieldset {
  border: unset;
  margin: unset;
  padding: unset;
  position: relative;
}

input {
  width: 100%;
  border: 0;
  padding: 0.8em;
  font-size: 1.3em;
  background: #e8e8e8;
}

.button-next {
  position: relative;
  background-color: #00cfbb;
  display: flex;
  margin: 1em auto 1em auto;
  left: 0;
  right: 0;
  border-radius: unset;
  text-transform: uppercase;
  color: white;
  font-size: 1.1em;
  width: unset;
  height: unset;
  padding: 1.2em 1.5em 1em 1.5em;
  letter-spacing: 0.1em;
  bottom: 0;
}

.button__icon {
  padding-right: 0.5em;
}

.breadcrumb,
.instructions {
  color: rgba(232, 232, 232, 0.5);
  font-size: 1.2em;
}

.tagline {
  font-size: 1.25em;
}

.container {
  padding-top: 3em;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.7s ease;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.breadcrumb {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding-bottom: 1em;
}

.feather__content {
  color: white;
}

.error-message {
  display: block;
  color: #fff385;
}

.instructions {
  padding: 0 0 0 1em;
  margin-bottom: 1em;
  border-left: 1px solid rgba(232, 232, 232, 0.5);
  display: block;
}

.error-message {
  position: absolute;
  z-index: 1;
  background-color: gold;
  color: #06050e;
  bottom: 0.5em;
  right: -0.5em;
}

#app {
  width: 50%;
}
</style>
