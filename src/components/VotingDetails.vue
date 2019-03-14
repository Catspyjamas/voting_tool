<template>
  <div class="container">
    <div class="breadcrumb">
      <span>Details ></span>
    </div>
  <form @submit.prevent="addOption">
      <fieldset>
        <legend >Title Vote</legend>
        <label class="instructions" for="vote__title">Add a title for your vote</label>
        <input id="vote__title" type="text" placeholder="Title" v-model="voteTitle" name="vote-title"></input>
      </fieldset>
      <fieldset>
        <legend>Question</legend>
        <label class="instructions" for="vote__question">Add a question and additional info about your vote</label>
        <input id="vote__question" type="text" placeholder="Instructions" v-model="voteQuestion" name="question">
      </fieldset>
      <p class="instructions">Add several options that you would like to vote on.</p>
      <div class="form__innerbox">
        <fieldset>
          <legend>Add Options</legend>
          <label class="instructions label__small" for="vote__option__title">Title</label>
          <input id="vote__option__title" type="text" placeholder="Option title" v-model="title" v-validate="'min:5'">
          <label class="instructions label__small" for="vote__option__info">Additional Information</label>
          <input id="vote__option__info" type="text" placeholder="Additional info" v-model="addInfo" >
          <button class="button__add" type="submit" v-on:click="addOption">
            <feather type="plus"></feather>
          </button>
        </fieldset>
      </div>
    </form>
    <ul>
      <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="bounceOutDown">
        <div v-for="(option, index) in options" :key='index'> 
          <li class="options-list-item">{{option.title}}</li>
          <p>{{option.addInfo}}</p>
        </div>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VotingDetails',
  data() {
    return {
    title: "",
    addInfo: "",
    voteQuestion: "",
    options: [
      {"title": "Radlfahren",
      "addInfo": "in Penzberg"}
    ],
    voteTitle: "",
    skills: [
      {"skill": "Vue.js"},
      {"skill": "Frontend"}
    ],
    alertObject: {
      alert: true
    }
    }
  },
  methods: {
    addOption() {
      this.$validator.validateAll().then((result) => {
        if(result) {
          this.options.push({title: this.title, addInfo: this.addInfo});
          this.title = "";
          this.addInfo="";
        } else {
          // eslint-disable-next-line
          console.log("not valid")
        }
      })
      },
    removeItem(index) {
      if(index !== -1) {
        this.skills.splice(index, 1)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

  

  input {
    width: 100%;
    border: 0;
    padding: 0.8em;
    font-size: 1.3em;
    background: #E8E8E8;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  

  li {
    display: flex;
    justify-content: space-between;
  }

  fieldset {
    border: unset;
    margin: unset;
    padding: unset;
  }

  legend {
    display: none;
  }

  .button__add {
    background-color:#00CFBB;
  }

  .breadcrumb,
  .instructions {
      color: rgba(232, 232, 232, 0.5);
      font-size: 1.2em;
  }


  .breadcrumb {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding-bottom: 1em;
  }

  .instructions {
    padding: 0 0 0 1em;
    margin-bottom: 1em;
    border-left: 1px solid rgba(232, 232, 232, 0.5);
    display: block;
  }


  .form__innerbox {
    padding: 1em;
  }


  .alert-in-enter-active {
    animation: bounce-in .5s;
  }

  .alert-in-leave-active {
      animation: bounce-in .5s reverse;
  }

  .form__innerbox {
    border:1px solid rgba(232, 232, 232, 0.5);
    position:relative;
  }

  .label__small {
    font-size: 0.9em;
    border-left: 0;
    padding: 0;
  }

  .options-list-item {
    font-family: nexablack;
    font-size: 1.3em;
    border-top: 1px solid rgba(255, 255, 255, 0.20);
    color: white;
    padding: 1em 0 0.5em 0;
  }

  @keyframes bounce-in {
    0%   {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
