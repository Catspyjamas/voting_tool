<template>
  <div class="container">
    <Messages
      :status-messages="statusMessages"
      :error-messages="errorMessages"
    />
    <VoteForm
      v-if="votesArrived"
      :poll="poll"
      :initial-ranked-options="rankedOptions"
      :status-text="statusText"
      :user-id="userId"
      @submitVote="submitVote"
    />
  </div>
</template>

<script>
import { fetchVote, saveVote, fetchPoll } from "../lib/api.js";
import VoteForm from "../components/VoteForm.vue";
import Messages from "../components/Messages.vue";

export default {
  components: {
    VoteForm,
    Messages
  },
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      rankedOptions: [],
      voted: false,
      statusMessages: [],
      errorMessages: [],
      poll: null
    };
  },
  computed: {
    votesArrived() {
      return this.rankedOptions.length !== 0;
    },
    authToken() {
      if (localStorage.getItem("authToken")) {
        return localStorage.getItem("authToken");
      } else return undefined;
    }
  },
  async mounted() {
    const [voteResponse, pollResponse] = await Promise.all([
      fetchVote(this.pollId, this.authToken),
      fetchPoll(this.pollId)
    ]);
    if (pollResponse.status === "fail" || pollResponse.status === "error") {
      this.errorMessages.length = 0;
      this.errorMessages = pollResponse.errors.map(error => error.msg);
      setTimeout(() => (this.errorMessages = []), 7000);
      return;
    }
    if (voteResponse.status === "fail" || voteResponse.status === "error") {
      this.errorMessages.length = 0;
      this.errorMessages = voteResponse.errors.map(error => error.msg);
      setTimeout(() => (this.errorMessages = []), 7000);
      return;
    }
    if (voteResponse.data.usersFirstVote) {
      this.poll = pollResponse.data;

      this.statusText = `This is the first time you're voting for ${
        this.poll.title
      }.`;
      this.rankedOptions = this.shuffleArray(pollResponse.data.options);
      return;
    }
    this.poll = pollResponse.data;

    this.userId = voteResponse.data.userId;
    if (voteResponse.data.ranking && voteResponse.data.ranking.length === 0) {
      this.statusText = `You're currently abstaining. If you'd like to vote for ${
        this.poll.title
      } after all, please resubmit.`;
      this.rankedOptions = this.shuffleArray(this.poll.options);
      return;
    }
    this.statusText = `This is what you voted for ${
      this.poll.title
    }. Change the order and resubmit if you would like to change your ranking.`;
    this.rankedOptions = voteResponse.data.ranking.map(optionId => {
      return this.poll.options.find(option => {
        return option._id === optionId;
      });
    });
  },
  methods: {
    async submitVote(rankedOptions) {
      try {
        await saveVote(this.poll._id, rankedOptions, this.authToken);
        this.voted = true;
      } catch (error) {
        console.log(error);
      }
    },

    shuffleArray(arr) {
      return arr
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
    }
  }
};
</script>
