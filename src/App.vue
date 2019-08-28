<template>
  <div id="app">
    <nav>
      <div class="navlinks">
        <router-link class="navlink" to="/polls">Polls</router-link>
        <router-link class="navlink" to="/about">About</router-link>
      </div>
    </nav>
    <router-view />
    <footer>
      <a id="peerigon-link" :href="'//' + 'www.peerigon.com'" target="_blank">
        <svg
          id="peerigon-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 226.8 68"
        >
          <path
            d="M48.5 37.2c-.9.5-1.7 1.1-2.4 1.7l-2.6-4.5c.8-.4 1.6-.9 2.4-1.4 1.3-.8 2.8-1.9 3.7-3.6 1.8-3.2 1-7.4-1.7-9.7-1.3-1.1-3-1.8-4.7-1.9-1.9-.1-3.7.6-5 1.2-.8.4-1.5.8-2.3 1.2-.2.1-.5.3-.7.4-1.2.7-9.6 5.5-9.6 5.5l-.5.3 12.6 21.9.3.5.5-.3 9.4-6.8c.7-.5 1.6-1.1 2-1.4.7-.5 1.5-.7 2.3-.5.8.1 1.5.6 2 1.2s.7 1.4.5 2.2c-.1.7-.6 1.4-1.2 1.8-.7.4-1.5.6-2.3.4-.9-.2-1.8-.7-2.2-1.5l-3 1.6c.8 1.3 1.7 2.1 2.8 2.6.9.4 1.9.6 2.9.6 2.1 0 4.1-1 5.3-2.6 1.8-2.4 1.5-5.9-.7-8-2.1-2-5.3-2.4-7.8-.9zm-5.2 3.6c-1.3.9-2.6 1.9-4.2 3l-9.4-16.3 8.7-5c2.4-1.4 4.5-1.7 6.1-1 2 .9 3.1 3.3 2.4 5.4-.3.9-.8 1.9-3.9 3.7-1.4.8-3.8 2.2-3.8 2.2l-.5.3 4.6 7.7z"
          />
          <path
            d="M42.3 5.1C26.5 5.1 13.6 18 13.6 33.9s12.9 28.8 28.8 28.8 28.8-12.9 28.8-28.8-13-28.8-28.9-28.8zm0 54c-13.9 0-25.2-11.3-25.2-25.2C17.1 20 28.4 8.6 42.3 8.6S67.6 20 67.6 33.9 56.3 59.1 42.3 59.1z"
          />
          <g>
            <path
              d="M87.7 25c-1.5 0-3.5.6-4.7 2.3l-.3.4-.3-2.4h-3.1V46h3.3v-8.4l.3.5c1 1.5 3.1 2 4.8 2 4.4 0 7.3-3.1 7.3-7.6.1-4.3-3-7.5-7.3-7.5zm-.3 11.9c-2.5 0-4.4-1.9-4.4-4.4 0-2.6 1.8-4.4 4.4-4.4 2.6 0 4.4 1.8 4.4 4.4 0 2.6-1.9 4.4-4.4 4.4zM139.9 26.9l-.2.4-.3-2h-3.1v14.5h3.3v-7.7c0-2.5 1.4-3.9 3.9-3.9 1.2 0 1.9.3 2.6.9l1.5-2.9c-.8-.8-2.2-1.3-3.6-1.3-1.5 0-3 .2-4.1 2z"
            />
            <ellipse cx="151.8" cy="20.9" rx="2" ry="2" />
            <path
              d="M150.1 25.2h3.3v14.5h-3.3zM170.1 23.9l-1.5 1.9-.1-.1c-1.1-.7-2.3-.8-3.3-.8-4.3 0-7.3 3-7.3 7.3 0 4.5 2.8 7.3 7.3 7.3 1.9 0 3.9 1 3.9 3.2 0 2-1.6 3.4-3.9 3.4-2.2 0-4-1.4-4.1-3.2h-3.3c.1 3.7 3.1 6.3 7.3 6.3 4.3 0 7.3-2.6 7.3-6.4 0-2.3-.9-3.7-3-4.7l-.3-.2.3-.2c2.8-1.3 3-4.4 3-5.4 0-1.7-.5-3.1-1.5-4.3l-.1-.1 1.6-2.1-2.3-1.9zm-5 12.6c-2.4 0-4.1-1.8-4.1-4.3s1.7-4.4 4.1-4.4c2.3 0 4 1.8 4 4.4.1 2.5-1.6 4.3-4 4.3zM183.5 25c-4.3 0-7.5 3.2-7.5 7.6 0 4.5 3.1 7.6 7.5 7.6 4.5 0 7.6-3.1 7.6-7.6 0-4.4-3.2-7.6-7.6-7.6zm0 12.1c-2.9 0-4.2-2.4-4.2-4.5 0-2.3 1.4-4.6 4.2-4.6 2.6 0 4.2 2.3 4.2 4.6 0 2.1-1.3 4.5-4.2 4.5zM203 25.1c-1.8 0-3.2.7-4.8 2.2l-.3.2-.3-2.2h-3v14.5h3.3v-7.4c0-2.5 1.7-4.3 4-4.3s3.8 1.6 3.8 4.1v7.6h3.3v-7.6c.1-4.3-2.3-7.1-6-7.1zM106.4 37.2c-2.6 0-4.3-1.3-4.6-3.3v-.2h11.6c.2-2.9-.4-5.2-1.7-6.7-1.3-1.4-3.2-2.1-5.6-2.1-4.6 0-7.7 3.1-7.7 7.6 0 4.8 3.1 7.7 8 7.7 2.2 0 4.7-.7 6.1-2l-1.5-2.5c-1.3 1-2.9 1.5-4.6 1.5zm-4.5-6.4c.5-1.9 2.1-3 4.3-3 2.3 0 3.8 1.1 4 3v.2h-8.4l.1-.2zM125.2 37.2c-2.6 0-4.3-1.3-4.6-3.3v-.2h11.6c.2-2.9-.4-5.2-1.7-6.7-1.3-1.4-3.2-2.1-5.6-2.1-4.6 0-7.7 3.1-7.7 7.6 0 4.8 3.1 7.7 8 7.7 2.2 0 4.7-.7 6.1-2l-1.5-2.5c-1.3 1-2.9 1.5-4.6 1.5zm-4.5-6.4c.5-1.9 2.1-3 4.3-3 2.3 0 3.8 1.1 4 3v.2h-8.4l.1-.2z"
            />
          </g>
        </svg>
      </a>

      <div id="pitch">
        The JavaScript experts: we develop mobile web apps using open standards.
      </div>
    </footer>
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
  font-size: 3em;
  margin-bottom: $xsmall;
  margin-top: 0.2em;
  line-height: 1.1em;
  @media (max-width: 750px) {
    font-size: 2em;
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

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
}
#peerigon-logo {
  min-width: 60px;
  max-width: 200px;
  max-height: 200px;
  fill: white;
}

#peerigon-link {
  margin: 0 0;
  padding: 0 0;
}

#pitch {
  font-size: 0.9rem;
}
</style>
