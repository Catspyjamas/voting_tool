<template>
  <button
    class="button"
    :style="{ color: iconColor, backgroundColor }"
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
      default: "#00cfbb"
    }
  }
};
</script>

<style scoped>
.button {
  border: none;
  border-radius: 50%;
  height: 5em;
  width: 5em;
  cursor: pointer;
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
