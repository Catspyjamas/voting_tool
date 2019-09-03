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
  color: $primary;
  display: flex;
  border-top: 1px solid $primary;
  padding-top: 1em;
  position: relative;
  cursor: move;
}

.number {
  font-family: "nexathin";
  font-size: 4em;
  margin-top: -0.2em;
  width: 20%;
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
  background-color: #2b239e;
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
