<template>
  <div id="app">
    <nav>
      <router-link class="navlink" to="/">Home</router-link>
      <router-link class="navlink" to="about">About</router-link>
      <router-link class="navlink" to="newPollForm">New Election</router-link>
      <router-link class="navlink" to="poll">Poll</router-link>
    </nav>
    <router-view :poll="polls[0]" @pollSubmit="addPoll" @voteSubmit="addVote" />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      polls: [
        {
          id: "bla-1jul80elt",
          title: "Birthday Event",
          start: "2019-07-28 09:30",
          end: "2019-07-31 09:30",
          info:
            "What should we do for our birthdays this year? Drag and drop the options until the order of importance seems fine to you.",
          options: [
            {
              title: "Radlfahren",
              id: "radlfahren",
              addInfo:
                "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
            },
            {
              title: "Canyoning",
              id: "canyoning",
              addInfo:
                "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
            },
            {
              title: "Europapark",
              id: "europapark",
              addInfo:
                "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
            },
            {
              title: "Go cart Driving",
              id: "gocartdriving",
              addInfo:
                "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
            }
          ],
          votes: []
        }
      ]
    };
  },
  methods: {
    addPoll(newPoll) {
      this.polls.push(newPoll);
    },
    addVote(newVote) {
      for (let element of this.polls) {
        if (element.id === newVote.pollId) {
          element.votes.push(newVote);
        }
      }
    }
  }
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

h2 {
  font-size: 1.6em;
}

a {
  font-family: "speziabook";
  text-decoration: none;
  border-bottom: 1px solid;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $mint;
  padding: $xsmall 0;
  margin: $standard 0;
  display: inline-block;
}

body,
p {
  font-family: "speziabook", sans-serif;
  color: $primary;
  font-weight: normal;
  margin-top: unset;
  margin-bottom: $xsmall;
}

h1 {
  font-size: 3em;
  margin-bottom: $xsmall;
  margin-top: 0.2em;
  line-height: 1.1em;
}

h2 {
  font-size: 1.6em;
  margin-top: unset;
  margin-bottom: unset;
}

body {
  background: $dark-gradient;
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
  padding: 0.1em 0 0.1em 0;
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
  min-height: 100vh;
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
  font-family: "speziabold";
  border-bottom: 2px solid $dark;
  color: $dark;
}

.button-link {
  font-family: unset;
  text-decoration: unset;
  border-bottom: unset;
  padding: unset;
  margin: 1em 0;
  display: unset;
}

#app {
  width: 100%;
}
</style>
