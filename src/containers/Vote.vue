<template>
  <VoteForm
    v-if="votesArrived"
    :poll="poll"
    :initial-ranked-options="rankedOptions"
    :status-text="statusText"
    :user-id="userId"
    @submitVote="submitVote"
  />
</template>

<script>
import { fetchVote, saveVote, fetchPoll } from "../lib/api.js";
import VoteForm from "../components/VoteForm.vue";

export default {
  components: {
    VoteForm
  },
  props: {
    pollId: {
      type: String,
      required: true
    },
    userIdByParams: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      rankedOptions: [],
      usersFirstVote: undefined,
      voted: false,
      statusText: "",
      poll: null,
      userId: this.userIdByParams
    };
  },
  computed: {
    votesArrived() {
      return this.rankedOptions.length !== 0;
    }
  },
  async created() {
    const [vote, poll] = await Promise.all([
      fetchVote(this.pollId, this.userId),
      fetchPoll(this.pollId)
    ]);
    this.poll = poll;
    this.userId = vote.userId;
    if (vote.usersFirstVote) {
      this.statusText = `This is the first time you're voting for ${
        this.poll.title
      }.`;
      this.usersFirstVote = true;
      this.rankedOptions = this.shuffleArray(poll.options);
    }
    if (vote.ranking.length === 0) {
      this.statusText = `You're currently abstaining. If you'd like to vote for ${
        this.poll.title
      } after all, please resubmit.`;
      this.rankedOptions = this.shuffleArray(this.poll.options);
    } else {
      this.statusText = `This is what you voted for ${
        this.poll.title
      }. Change the order and resubmit if you would like to change your ranking.`;
      this.rankedOptions = vote.ranking.map(optionId => {
        return this.poll.options.find(option => {
          return option._id === optionId;
        });
      });
    }
  },
  methods: {
    async submitVote(rankedOptions) {
      try {
        await saveVote(
          this.poll._id,
          rankedOptions,
          this.userId,
          this.usersFirstVote
        );
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
