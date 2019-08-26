<template>
  <button
    class="button"
    :style="{
      color: iconColor,
      height: iconSize,
      width: iconSize
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <feather :type="icon" />
  </button>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    icon: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: String,
      default: "white"
    },
    backgroundColor: {
      type: String,
      default: "#00bca9"
    },
    iconSize: {
      type: String,
      default: "4em"
    }
  }
};
</script>

<style lang="scss">
.button {
  transition: background-color 0.5s ease;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  background-color: $mint;
  &:hover {
    background-color: $mint-lighter;
  }
}
</style>

<docs>
This is a button that has only an icon and different types.

```jsx
<IconButton icon="plus" />
```

```jsx
<IconButton icon="x" iconColor="white" backgroundColor="#2b239e" />
```

</docs>
