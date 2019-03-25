<template>
  <form class="form__innerbox" @submit.prevent="submitOption(title, addInfo)">
    <fieldset>
      <legend>Add Options</legend>
      <label class="instructions" for="vote__option__title">What's the option you would like to add?</label>
      <input id="vote__option__title" type="text" placeholder="Option title" v-model="title" v-validate="'min:5|required'" name="option-title" >
      <transition name="slide-fade">
        <div v-show="errors.items.length > 0" class="error-message">
          {{ errors.first('option-title') }}
        </div>
      </transition>
    </fieldset>
    <fieldset>
      <label class="instructions" for="vote__option__info">Add additional Information about the option</label>
      <input id="vote__option__info" type="text" placeholder="Additional info" v-model="addInfo" >
      <button class="button__add" type="submit" >
        <feather type="plus"></feather>
      </button>
    </fieldset>

  </form>
</template>
<script>
export default {
  name: "AddOption",
  data() {
    return { 
      title: "",
      addInfo: "",
    }
  },
  methods: {
    submitOption(title, addInfo) {
      this.$validator.validateAll().then((result) => {
        if(result) {
          this.$emit("onSubmit", {
          title,
          addInfo});
          this.title = "";
          this.addInfo = "";
        }
        else {
          // eslint-disable-next-line
          console.log("not valid")
        }
      })
    }
  }
}
</script>

<style>


  .button__add {
    background-color:#00CFBB;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }



  .form__innerbox {
    padding: 1em;
  }


  .form__innerbox {
    border:1px solid rgba(232, 232, 232, 0.5);
    position:relative;
  }
</style>

