<template>
  <div id="app">
    <nav>
      <div class="navlinks">
        <router-link class="navlink" to="/polls">Polls</router-link>
        <router-link class="navlink" to="/about">About</router-link>
        <router-link v-if="!$root.loggedIn" class="navlink" to="/login"
          >Login</router-link
        >
        <a v-if="$root.loggedIn" class="navlink" @click="logout">Logout</a>
        <router-link class="navlink" to="/signup">Sign Up</router-link>
      </div>
    </nav>
    <router-view />
    <footer>
      <a id="peerigon-link" :href="'//' + 'www.peerigon.com'" target="_blank">
        <svg id="peerigon-logo">
          <path
            d="M34.9 32c-.9.5-1.7 1.1-2.4 1.7l-2.6-4.5c.8-.4 1.6-.9 2.4-1.4 1.3-.8 2.8-1.9 3.7-3.6 1.8-3.2 1-7.4-1.7-9.7-1.3-1.1-3-1.8-4.7-1.9-1.9-.1-3.7.6-5 1.2-.8.4-1.5.8-2.3 1.2-.2.1-.5.3-.7.4L12 21l-.5.3 12.6 21.9.3.5.5-.3 9.4-6.8c.7-.5 1.6-1.1 2-1.4.7-.5 1.5-.7 2.3-.5.8.1 1.5.6 2 1.2s.7 1.4.5 2.2c-.1.7-.6 1.4-1.2 1.8-.7.4-1.5.6-2.3.4-.9-.2-1.8-.7-2.2-1.5l-2.9 1.7c.8 1.3 1.7 2.1 2.8 2.6.9.4 1.9.6 2.9.6 2.1 0 4.1-1 5.3-2.6 1.8-2.4 1.5-5.9-.7-8-2.1-2.1-5.4-2.5-7.9-1.1zm-5.2 3.7c-1.3.9-2.6 1.9-4.2 3l-9.4-16.3 8.7-5c2.4-1.4 4.5-1.7 6.1-1 2 .9 3.1 3.3 2.4 5.4-.3.9-.8 1.9-3.9 3.7-1.4.8-3.8 2.2-3.8 2.2l-.3.3 4.4 7.7z"
          />
          <path
            d="M28.8 0C12.9 0 0 12.9 0 28.8s12.9 28.8 28.8 28.8 28.8-12.9 28.8-28.8S44.6 0 28.8 0zm0 54C14.9 54 3.5 42.7 3.5 28.8c0-13.9 11.3-25.2 25.2-25.2S54 14.9 54 28.8C54 42.7 42.7 54 28.8 54z"
          />
          <g>
            <path
              d="M74.1 19.9c-1.5 0-3.5.6-4.7 2.3l-.3.4-.3-2.4h-3.1v20.7H69v-8.4l.3.5c1 1.5 3.1 2 4.8 2 4.4 0 7.3-3.1 7.3-7.6.1-4.4-3-7.5-7.3-7.5zm-.3 11.9c-2.5 0-4.4-1.9-4.4-4.4 0-2.6 1.8-4.4 4.4-4.4 2.6 0 4.4 1.8 4.4 4.4 0 2.5-1.9 4.4-4.4 4.4zM126.3 21.8l-.2.4-.3-2h-3.1v14.5h3.3V27c0-2.5 1.4-3.9 3.9-3.9 1.2 0 1.9.3 2.6.9l1.5-2.9c-.8-.8-2.2-1.3-3.6-1.3-1.5 0-2.9.2-4.1 2z"
            />
            <ellipse cx="138.2" cy="15.8" rx="2" ry="2" />
            <path
              d="M136.5 20.1h3.3v14.5h-3.3zM156.5 18.7l-1.5 1.9-.1-.1c-1.1-.7-2.3-.8-3.3-.8-4.3 0-7.3 3-7.3 7.3 0 4.5 2.8 7.3 7.3 7.3 1.9 0 3.9 1 3.9 3.2 0 2-1.6 3.4-3.9 3.4-2.2 0-4-1.4-4.1-3.2h-3.3c.1 3.7 3.1 6.3 7.3 6.3 4.3 0 7.3-2.6 7.3-6.4 0-2.3-.9-3.7-3-4.7l-.3-.2.3-.2c2.8-1.3 3-4.4 3-5.4 0-1.7-.5-3.1-1.5-4.3l-.1-.1 1.6-2.1-2.3-1.9zm-4.9 12.6c-2.4 0-4.1-1.8-4.1-4.3s1.7-4.4 4.1-4.4c2.3 0 4 1.8 4 4.4 0 2.5-1.7 4.3-4 4.3zM169.9 19.9c-4.3 0-7.5 3.2-7.5 7.6 0 4.5 3.1 7.6 7.5 7.6 4.5 0 7.6-3.1 7.6-7.6 0-4.4-3.2-7.6-7.6-7.6zM170 32c-2.9 0-4.2-2.4-4.2-4.5 0-2.3 1.4-4.6 4.2-4.6 2.6 0 4.2 2.3 4.2 4.6 0 2.1-1.4 4.5-4.2 4.5zM189.4 19.9c-1.8 0-3.2.7-4.8 2.2l-.3.2-.3-2.2h-3v14.5h3.3v-7.4c0-2.5 1.7-4.3 4-4.3s3.8 1.6 3.8 4.1v7.6h3.3V27c.1-4.2-2.3-7.1-6-7.1zM92.8 32.1c-2.6 0-4.3-1.3-4.6-3.3v-.2h11.6c.2-2.9-.4-5.2-1.7-6.7-1.3-1.4-3.2-2.1-5.6-2.1-4.6 0-7.7 3.1-7.7 7.6 0 4.8 3.1 7.7 8 7.7 2.2 0 4.7-.7 6.1-2l-1.5-2.5c-1.3 1-2.9 1.5-4.6 1.5zm-4.5-6.4c.5-1.9 2.1-3 4.3-3 2.3 0 3.8 1.1 4 3v.2h-8.4l.1-.2zM111.6 32.1c-2.6 0-4.3-1.3-4.6-3.3v-.2h11.6c.2-2.9-.4-5.2-1.7-6.7-1.3-1.4-3.2-2.1-5.6-2.1-4.6 0-7.7 3.1-7.7 7.6 0 4.8 3.1 7.7 8 7.7 2.2 0 4.7-.7 6.1-2l-1.5-2.5c-1.3 1-2.9 1.5-4.6 1.5zm-4.5-6.4c.5-1.9 2.1-3 4.3-3 2.3 0 3.8 1.1 4 3v.2H107l.1-.2z"
            />
          </g>
        </svg>
        <div id="pitch">
          The JavaScript experts: we develop mobile web apps using open
          standards.
        </div>
      </a>
    </footer>
  </div>
</template>

<script>
import { logout } from "./lib/api";
export default {
  name: "App",
  components: {},
  methods: {
    async logout() {
      const response = await logout();
      console.log("RESPONSE:".response);

      if (response.status === "success") {
        this.$root.loggedIn = false;
      }
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 8px white;
  }
}

h1,
h2,
h3,
h4 {
  font-family: "nexablack";
  font-weight: normal;
  text-decoration: none;
  color: white;
  hyphens: auto;
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
  font-size: 3rem;
  margin-bottom: 3rem;
  margin-top: 2rem;
  line-height: 1.1rem;
  @media (max-width: 750px) {
    font-size: 2rem;
  }
}

h2 {
  font-size: 1.8em;
  margin: 0 0;
  line-height: 110%;
  @media (max-width: 750px) {
    font-size: 1.6em;
  }
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

button {
  cursor: pointer;
}

router-view {
  min-height: 100vh;
}

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
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
  &:hover,
  &:active {
    box-shadow: inset 0 -0.6em 0 0 rgba(222, 251, 227, 0.8);
    font-weight: 500;
  }
}

.tagline {
  font-size: $small;
}

.container {
  padding: 1.5em 0 6em 0;
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

#peerigon-logo {
  transition: 0.8s ease-in-out;
  height: 60px;
  width: 205px;
  fill: white;
  margin: auto;
  &:hover,
  &:focus {
    filter: drop-shadow(0px 0px 2px rgba(103, 255, 242, 0.65));
  }
}

#peerigon-link {
  transition: 0.8s ease-in-out;
  margin: 0 0;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-content: center;
  &:hover,
  &:focus {
    text-shadow: 0 0 2px rgba(103, 255, 242, 0.65);
    box-shadow: none;
  }
}

#pitch {
  margin: 5px auto;
  font-size: 0.9rem;
  font-family: "plex-light", sans-serif;
  text-decoration: none;
  letter-spacing: 0;
  text-transform: none;
  color: white;
}
</style>
