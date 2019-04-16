<template>
  <div class="container">
    <h1>You successfully submitted your poll.</h1>
    <p class="subhead">Now we wait until the poll is over.</p>
    <p>Current time: {{ getNow }}</p>
    <p>End time: {{ getEnd }}</p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Submitted",
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
  created() {
    console.log(moment());
  }
};
</script>

<style lang="scss"></style>
