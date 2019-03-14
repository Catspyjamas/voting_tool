<template>
  <div class="hello">
    <div class="holder">
      <form @submit.prevent="addSkill">
        <input type=text placeholder="Enter a skill you have..." v-model="skill" v-validate="'min:5'" name="skill">
        <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flixOutX">
          <p class="alert" v-if="errors.has('skill')"> {{errors.first('skill')}} </p>
        </transition>
      {{skill}}
      </form>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="bounceOutDown">
          <li v-for="(data, index) in skills" :key='index'> 
            {{index}} {{data.skill}}
            <i data-feather="circle" @click="removeItem(index)"></i>
          </li>
        </transition-group>
      </ul>
      <p>These are the skills that you posess.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
    skill: "",
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
    addSkill() {
      this.$validator.validateAll().then((result) => {
        if(result) {
          this.skills.push({skill: this.skill});
          this.skill = "";
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
@import "https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js";
  
  .holder {
    background: #fff;
  }

  input {
    width: calc(100% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: #323333;
    color: #687F7F;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }

  li {
    display: flex;
    justify-content: space-between;
  }

  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }

  .container {
    box-shadow: 0px 0px 40px lightgray;
  }

  .alert {
    background: #fdf2ce;
    font-weight: bold;
    display: inline-block;
    padding: 5px;
    margin-top: -20px;
  }

.alert-in-enter-active {
  animation: bounce-in .5s;
}

.alert-in-leave-active {
    animation: bounce-in .5s reverse;
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
