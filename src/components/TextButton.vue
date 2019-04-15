<template>
  <button
    class="button"
    :style="{ color: textColor, backgroundColor }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <feather v-if="icon" :type="icon" />
    &nbsp;{{ text }}
  </button>
</template>

<script>
export default {
  name: "TextButton",
  props: {
    text: {
      type: String,
      required: true,
      default: "blabla"
    },
    textColor: {
      type: String,
      default: "white"
    },
    backgroundColor: {
      type: String,
      default: "#00cfbb"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  background-color: $mint;
  display: flex;
  margin: $small auto;
  border: none;
  text-transform: uppercase;
  color: white;
  font-size: 1.1em;
  padding: $small;
  bottom: 0;
  cursor: pointer;
}
</style>

<docs>
This is a normal text button that can have an icon.

```jsx
<TextButton text="Hello" textColor="black"/>
```

```jsx
<TextButton icon="x" backgroundColor="#2b239e" text="Hello" />
```

</docs>
