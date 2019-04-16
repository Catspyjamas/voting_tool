<template>
  <div class="container">
    <header>
      <div class="breadcrumb">
        <span>Poll</span>
      </div>
      <h1>{{ voteTitle }}</h1>
      <p class="subhead">{{ voteQuestion }}</p>
      <p class="subhead">
        Or, if you would you rather not vote at all and leave your vote blank,
        you can also choose to abstain from the vote.
      </p>
      <TextButton text="Abstain" background-color="coral" direction="left" />
    </header>
    <main>
      <draggable v-model="options" group="options">
        <li
          v-for="(option, index) in options"
          :key="option.id"
          class="option"
          :class="{ red: activeOption === option.id }"
        >
          <div class="option__number">#{{ index + 1 }}</div>
          <div class="option__main">
            <h2 class="option__head">{{ option.title }}</h2>
            <p>{{ option.addInfo }}</p>
          </div>
          <div class="option__handle">
            <feather type="move" />
          </div>
        </li>
      </draggable>
      <router-link to="submitted">
        <TextButton
          to="submitted"
          icon="arrow-right-circle"
          text="Submit your
        choice"
        />
      </router-link>
    </main>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TextButton from "./TextButton.vue";
export default {
  name: "Ballot",
  components: {
    draggable,
    TextButton
  },
  data() {
    return {
      voteTitle: "Birthday Event",
      voteQuestion:
        "Drag and drop the options until the order of importance seems fine to you.",
      options: [
        { title: "Radlfahren", id: "radlfahren", addInfo: "in Penzberg" },
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
          title: "Something Else",
          id: "somethingelse",
          addInfo:
            "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen."
        }
      ],
      activeOption: ""
    };
  }
};
</script>

<style lang="scss" scoped>
a {
  border-bottom: unset;
}
.subhead {
  color: $primary;
  font-size: $medium;
  line-height: 1.1em;
}

.option {
  color: $primary;
  display: flex;
  border-top: 1px solid $primary;
  padding-top: 1em;
  position: relative;
  cursor: move;
}

.option__number {
  font-family: "nexathin";
  font-size: 4em;
  margin-top: -0.2em;
  width: 20%;
}
.option__main {
  width: 80%;
  padding-right: 2em;
}

.option__handle {
  width: 4em;
  height: 4em;
  position: absolute;
  border-radius: 50%;
  background-color: #2b239e;
  top: -$standard;
  right: -$standard;
  display: flex;
  align-items: center;
  justify-content: center;
}

.red {
  background-color: red;
}
</style>
