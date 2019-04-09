<template>
  <div class="container">
    <header>
      <div class="breadcrumb">
        <span>Vote</span>
      </div>
      <h1>{{ voteTitle }}</h1>
      <p class="subhead">{{ voteQuestion }}</p>
      <p class="subhead">
        Or would you rather not vore at all and leave your vote blank?
      </p>
      <button class="button__text">Abstain from the {{ voteTitle }} Poll</button>
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

      <button class="button-next">
        <feather type="arrow-right-circle" class="button__icon" />Submit your
        choice
      </button>
    </main>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "Ballot",
  components: {
    draggable
  },
  data() {
    return {
      voteTitle: "Birthday Event",
      voteQuestion:
        "You can rank! Drag and drop the options until the order of importance seems fine to you.",
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

<style>
h1,
h2 {
  color: white;
  margin: unset;
}

.subhead {
  color: rgba(232, 232, 232, 0.5);
  font-size: 1.3em;
}

.option {
  color: rgba(232, 232, 232, 0.5);
  display: flex;
  border-top: 1px solid rgba(232, 232, 232, 0.5);
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

.button__text {
  border-radius: 0;
  position: relative;
  bottom: 0;
  width: inherit;
  height:inherit;
  font-size: 1em;
  margin-bottom: 2em;
  padding: 0.6em 0.6em 0.6em 0.6em;
  background-color:lightcoral;
}

.option__handle {
  width: 4em;
  height: 4em;
  position: absolute;
  border-radius: 50%;
  background-color: #2b239e;
  top: -1em;
  right: -1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.red {
  background-color: red;
}
</style>
