<template>
  <div class="container">
    <h1>You have officially voted.</h1>
    <p>If you've changed your mind, you can still edit your vote.</p>
    <router-link to="poll" class="button-link">
      <TextButton text="Edit vote" direction="left" />
    </router-link>

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
    poll: {
      type: Object,
      required: true,
      default: function() {
        return {
          id: "",
          title: "",
          start: "",
          end: "",
          info: "",
          options: [{ title: "", id: "", addInfo: "" }]
        };
      }
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
      return moment(this.poll.end, "YYYY-MM-DD HH:mm").format(
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

<style lang="scss">
.button-link {
  font-family: unset;
  text-decoration: unset;
  border-bottom: unset;
  padding: unset;
  margin: 1em 0;
  display: unset;
}
</style>
