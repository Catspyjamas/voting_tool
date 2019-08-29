<template>
  <li>
    <div class="number">#{{ index + 1 }}</div>
    <div class="main">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <IconButton icon="move" />
  </li>
</template>
<script>
import IconButton from "./IconButton.vue";
export default {
  name: "PollOption",
  components: { IconButton },
  props: {
    id: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
.option {
  color: white;
  background-color: $grey3;
  display: flex;
  position: relative;
  cursor: move;
  padding: 15px;
  margin-top: 2px;
  &:hover,
  &:focus {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 20px black;
    z-index: 2;
  }
  p {
    color: $grey1;
    font-size: 1.1rem;
  }
  h2 {
    font-family: "plex-medium";
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }
}

.number {
  font-family: "plex-mono-italic";
  font-size: 5rem;
  width: 20%;
  color: $mint;
}
.main {
  width: 80%;
  padding-right: 2em;
}

.handle {
  width: 4em;
  height: 4em;
  position: absolute;
  border-radius: 50%;
  top: -$standard;
  right: -$standard;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<docs>
This is how the poll's options look like.
```jsx
<PollOption key="thisandthat" index="2" title="Option title" description="Blablablabla" />
```
</docs>
