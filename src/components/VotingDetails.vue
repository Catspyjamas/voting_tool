<template>
<div class="container">
  <div class="breadcrumb">
    <span>Details ></span>
  </div>
  <form id="vote" >
    <fieldset>
      <legend >Title Vote</legend>
      <label class="instructions" for="vote__title">Add a title for your vote</label>
      <input id="vote__title" type="text" placeholder="Title" v-model="voteTitle" name="vote-title" v-validate="'required'"/>
      <transition name="slide-fade">
      <div v-show="errors.items.length > 0" class="error-message">
        {{ errors.first('vote-title') }}
      </div>
    </transition>
    </fieldset>
    <fieldset>
      <legend>Question</legend>
      <label class="instructions" for="vote__question">Add a question and additional info about your vote</label>
      <input id="vote__question" type="text" placeholder="Instructions" v-model="voteQuestion" name="vote-question" v-validate="'required'">
      <transition name="slide-fade">
      <div v-show="errors.items.length > 0" class="error-message">
        {{ errors.first('vote-question') }}
      </div>
      </transition>
    </fieldset>
    <p class="instructions">Add several options that you would like to vote on.</p>
    <AddOption   v-on:onSubmit="addOption"/>
    </form>
    <ul>
      <transition-group name="list" class="list" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div v-for="(option, index) in options" :key='index'> 
          <div class="list__options">
            <button class="button__remove" type="submit" v-on:click="removeOption(index)" >
              <feather type="x"></feather>
            </button>
            <li class="list__options__title">{{option.title}}</li>
            <p>{{option.addInfo}}</p>
          </div>
        </div>
      </transition-group>
    </ul>

    <button type="submit" class="button__next" form="vote" @click="saveVotingInfo">
      <feather type="check"></feather> Go to voters
    </button>

</div>

</template>

<script>
import AddOption from "./AddOption.vue";
export default {
  name: 'VotingDetails',
  data() {
    return {
    voteTitle: "",
    voteQuestion: "",
    options: [
      {"title": "Radlfahren",
      "addInfo": "in Penzberg"}
    ],
    vote: {
    }
    }
  },
  components: {
    AddOption,
  },
  methods: {
    addOption(option) {
      this.options.push(option);
    },
    removeOption(index) {
      if(index !== -1) {
        this.options.splice(index, 1)
      }
    },
    saveVotingInfo() {
      this.$validator.validate().then((result) => {
        if(result) {        
          this.vote.voteTitle = this.voteTitle;
          this.vote.voteQuestion = this.voteQuestion;
          this.vote.options = this.options;}

        else{
          // eslint-disable-next-line
          console.log("not valid")
        }

      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

  


  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  

  li {
    display: flex;
    justify-content: space-between;
  }



.button__next {
  position: relative;
  background-color: #00CFBB;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  left:0;
  right:0;
  border-radius:unset;
  text-transform: uppercase;
  color: white;
  font-size: 1.1em;
  width:unset;
  height: unset;
  padding: 1.5em 1.5em 1em 1.5em;
}

  .container {
    min-height: 100vh;
  }

  .button__remove {
    background-color: #2B239E;
    right: -1em;
    top: -1.5em;
    margin-left: auto;
  }


  .list__options {
    color: white;
    position: relative;
    border-top: 1px solid rgba(232, 232, 232, 0.5);
    margin-top: 2em;
  }

  .list__options__title {
      font-family: nexablack;
      font-size: 1.3em;
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
