<template>
  <div class="poll-list">
    <div v-for="poll of polls" :key="poll._id" class="polls">
      <div class="poll-head">
        <h2>{{ poll.title }}</h2>
        <div class="poll-links">
          <router-link
            v-if="isOpen(poll)"
            :to="{ name: 'Vote', params: { pollId: poll._id } }"
          >
            <IconButton icon="package" direction="right" />
          </router-link>
          <router-link
            v-if="isClosed(poll)"
            :to="{ name: 'Results', params: { pollId: poll._id } }"
          >
            <Text-Button
              text="Results"
              direction="right"
              background-color="#2B239E"
            />
          </router-link>
          <div class="dropdown-menu">
            <transition name="slide-fade">
              <IconButton
                v-if="showMenu === poll._id"
                id="dropdown-open"
                icon="more-vertical"
                class="dropdown-button"
                @click="showMenu = null"
              />
              <IconButton
                v-else
                id="dropdown-closed"
                icon="more-horizontal"
                class="dropdown-button"
                @click="showMenu = poll._id"
              />
            </transition>
            <transition name="move">
              <div
                v-if="showMenu === poll._id"
                :class="{ active: showMenu === poll._id }"
              >
                <ul class="dropdown-ul">
                  <li
                    v-if="isDraft(poll)"
                    class="dropdown-li"
                    @click="$emit('status-change', poll._id, 'OPEN')"
                  >
                    Open Vote
                  </li>
                  <li
                    v-if="isOpen(poll)"
                    class="dropdown-li"
                    @click="$emit('status-change', poll._id, 'CLOSED')"
                  >
                    Close Poll
                  </li>
                  <li
                    v-if="isClosed(poll) || isOpen(poll)"
                    class="dropdown-li"
                    @click="$emit('status-change', poll._id, 'DRAFT')"
                  >
                    Move in Drafts
                  </li>
                  <li
                    v-if="isDraft(poll)"
                    class="dropdown-li"
                    @click="$emit('delete-poll', poll._id)"
                  >
                    Delete Poll
                  </li>
                  <li v-if="isDraft(poll)" class="dropdown-li">
                    <router-link
                      :to="{ name: 'EditPoll', params: { pollId: poll._id } }"
                      >Edit Poll</router-link
                    >
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="poll-content">
        <p>{{ poll.description }}</p>
        <table class="poll-facts">
          <tbody>
            <tr>
              <td class="table-em">Start:</td>
              <td>{{ dateString(poll.start) }}</td>
            </tr>
            <tr>
              <td class="table-em">End:</td>
              <td>{{ dateString(poll.end) }}</td>
            </tr>
            <tr>
              <td class="table-em">Options:</td>
              <td>{{ poll.options.length }}</td>
            </tr>
            <tr>
              <td class="table-em">Votes:</td>
              <td>{{ poll.votes.length }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p v-if="polls.length === 0" class="no-polls">
      There aren't any polls in here.
    </p>
    <router-link :to="{ name: 'NewPoll' }" class="button-link">
      <IconButton icon="plus" />
    </router-link>
  </div>
</template>

<script>
import TextButton from "./TextButton";
import IconButton from "./IconButton";
import { isClosed, isOpen, isDraft } from "../lib/poll.js";

export default {
  components: {
    TextButton,
    IconButton
  },
  props: {
    polls: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showMenu: null,
      isClosed,
      isOpen,
      isDraft,
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    };
  },
  methods: {
    dateString(date) {
      //Doesn't work properly... Use moment instead?
      return date.toLocaleString("en-US", this.dateOptions);
    }
  }
};
</script>

<style lang="scss">
ul {
  display: flex;
  justify-content: left;
}

.poll-content {
  min-width: 100%;
  font-size: 0.9em;
  max-width: 600px;
}

.polls {
  width: 100%;
  border: 1px solid #4b4b4b;
  margin: 0 0 $standard 0;
  padding: 0 $standard $standard $standard;
  flex-direction: column;
}

.poll-head {
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 10px 0;
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  border-bottom: 1px solid #4b4b4b;
  margin-bottom: $standard;
  h2 {
    display: block;
    min-width: 30%;
    margin-top: 0;
  }
  a {
    border: 0;
    margin: 0;
    display: flex;
    align-items: baseline;
    padding-left: $small;
  }
}

.no-polls {
  padding-top: 1em;
}

.poll-list {
  flex-wrap: wrap;
  flex-direction: column;
  margin: -1px 0 20px -1px;

  padding: $small;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
}

.poll-facts {
  color: $grey2;
}

.table-em {
  font-family: "plex-medium";
  margin-right: $small;
  padding-right: 2em;
  color: $grey1;
}
.poll-links {
  margin-left: auto;
  display: flex;
  flex-wrap: nowrap;
  a {
    padding: 0;
  }
}

.dropdown-menu {
  position: relative;
  height: 3em;
  width: 4em;
}

.dropdown-button {
  position: absolute;
  right: 0;
}

.dropdown-ul {
  position: absolute;
  top: 2.5em;
  right: -4em;
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-width: 80px;
  margin-top: 1rem;
}

.dropdown-li {
  transition: background-color 0.5s ease, color 0.5s ease;
  font-family: "nexablack";
  text-decoration: none;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: $xsmall $xsmall;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  color: $dark;
  background-color: $grey1;
  a {
    color: inherit;
  }
  &:hover {
    background-color: white;
    cursor: pointer;
  }
}

// Animation Menu Icon

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: rotate(90);
}
.slide-fade-leave-active {
  transform: rotate(180);
}

// Dropdown Animation

.move-enter-active,
.move-leave-active {
  transition: all 0.6s;
}
.move-enter,
.move-leave-to {
  opacity: 0;
  transform: translateY(2em);
}
</style>
