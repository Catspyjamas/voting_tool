<template>
  <div class="container">
    <h1>You have officially voted.</h1>
    <p v-if="!pollOver">Check or edit your choice:</p>
    <router-link
      v-if="!pollOver"
      :to="{
        name: 'Vote',
        params: { pollId: pollId }
      }"
      class="button-link"
    >
      <TextButton text="Changed my mind" direction="left" />
    </router-link>

    <div v-if="!pollOver">
      <p>Ending time: {{ getEnd }}</p>
      <h2>
        <span v-if="days !== 0">{{ days }} Days,&#32;</span>
        <span v-if="hours !== 0">{{ hours }} Hours,&#32;</span>
        <span v-if="minutes !== 0">{{ minutes }} Minutes,&#32;</span>
        {{ seconds }} Seconds left
      </h2>
      <TextButton
        text="Pretend it's later"
        direction="left"
        @click="closePoll"
      />
    </div>
    <div v-if="pollOver">
      <router-link :to="{ name: 'results', params: { pollId: pollId } }">
        <h2>Go to results</h2>
      </router-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import TextButton from "./TextButton.vue";
import { fetchPoll } from "../lib/api.js";
import { setInterval } from "timers";
import { closePoll } from "../lib/api.js";
export default {
  name: "Submitted",
  components: {
    TextButton
  },
  props: {
    pollId: {
      type: String,
      required: true,
      countdown: 0
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      poll: {},
      pollOver: false,
      days: "",
      hours: "",
      minutes: "",
      seconds: ""
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
  async created() {
    this.poll = await fetchPoll(this.pollId);
    setInterval(() => {
      const duration = moment.duration(moment().diff(this.poll.end));
      this.days = -duration.get("days");
      this.hours = -duration.get("hours");
      this.minutes = -duration.get("minutes");
      this.seconds = -duration.get("seconds");
    }, 1000);
  },
  methods: {
    async closePoll() {
      closePoll(this.pollId);
      this.pollOver = true;
      this.poll = await fetchPoll(this.pollId);
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
