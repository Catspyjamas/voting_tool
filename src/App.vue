<template>
  <div id="app">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/votingDetails">Voting</router-link>
      </nav>
    <router-view/>
  </div>
</template>

<script>



export default {
  name: 'app',
  components: {
    // Skills,
    // About,
    // VotingDetails
  }
}
</script>

<style>
@import './assets/css/fonts.css';

* {
      box-sizing: border-box;
}


h1,
h2,
h3,
h4, 
a {
  font-family: 'nexablack', sans-serif;
}

body, 
p, 
label,
input {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  margin-top: unset;
  margin-bottom: 1em;
}

h1 {
  font-size: 3em;
}

.tagline {
  font-size: 1.25em;
}


body {
  background: linear-gradient(180deg, #06050E 0%, #23222A 100%);
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
}

button {
    border-radius: 50%;
    height: 5em;
    width: 5em;
    border:none;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    bottom: -2.5em;
}

p {
  font-size: 1.25em;
}

.container {
  padding-top: 3em;
}

nav a {
  padding: 0.6em;
  display: inline-block;
  text-decoration: none;
  background: #fff;
  color:#161616;
  text-transform: uppercase;
}

.feather__content {
  color: white;
}

#app {
    width: 50%;
}
</style>
