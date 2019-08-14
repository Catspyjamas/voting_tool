<template>
  <VoteForm
    v-if="!isLoading"
    :poll="poll"
    :vote="vote"
    :status-text="statusText"
    @submit="saveVote"
  />
</template>

<script>
import { fetchPoll, fetchVote, saveVote } from "../lib/api.js";
import VoteForm from "../components/VoteForm.vue";

//TO DO: Ranking-Ids übersetzen in Props, die das Component braucht
// bei submit nur ranking als array aus option-ids filtern und speichern
export default {
  components: {
    VoteForm
  },
  props: {
    pollId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      poll: null,
      vote: [],
      voted: false,
      statusText: ""
    };
  },
  computed: {
    isLoading() {
      return this.poll === null;
    }
  },
  async created() {
    this.poll = await fetchPoll(this.pollId);
    try {
      const result = await fetchVote(this.pollId, "xxx");
      if (result.ranking.length === 0) {
        this.statusText = `You're currently abstaining. If you'd like to vote for ${
          this.poll.title
        } after all, please resubmit.`;
        this.vote = this.shuffleArray(this.poll.options);
      } else {
        this.statusText = `This is what you voted for ${
          this.poll.title
        }. Change the order and resubmit if you would like to change your ranking.`;
        this.vote = result.ranking.map(choice => {
          return this.poll.options.find(option => {
            return option.id === choice;
          });
        });
      }
    } catch (error) {
      this.statusText = `This is the first time you're voting for ${
        this.poll.title
      }.`;
      this.vote = this.shuffleArray(this.poll.options);
    }
  },
  methods: {
    saveVote(ranking) {
      saveVote(this.poll._id, {
        userId: "xxx",
        ranking
      });
      this.voted = true;
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
