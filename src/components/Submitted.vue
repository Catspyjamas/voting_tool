<template>
  <div class="container">
    <h1>You successfully submitted your poll.</h1>
    <div v-if="!pollOver">
      <p class="subhead">Now we wait until the poll is over.</p>
      <p>End time: {{ getEnd }}</p>
      <TextButton
        text="Pretend it's later"
        direction="left"
        @click="timeWarp"
      />
    </div>

    <div v-if="pollOver">
      <h2>It's over!</h2>
      <router-link to="about">See the results</router-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import TextButton from "./TextButton.vue";
export default {
  name: "Submitted",
  components: {
    TextButton
  },
  props: {
    endTime: {
      type: String,
      default: "2013-02-08 09:30"
    }
  },
  data() {
    return {
      pollOver: false
    };
  },
  computed: {
    getNow() {
      return moment().format("dddd, MMMM Do YYYY, HH.mm");
    },
    getEnd() {
      return moment(this.endTime, "YYYY-MM-DD HH:mm").format(
        "dddd, MMMM Do YYYY, HH.mm"
      );
    }
  },
  methods: {
    timeWarp() {
      this.pollOver = true;
    }
  }
};
</script>

<style lang="scss"></style>
