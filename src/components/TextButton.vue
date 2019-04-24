<template>
  <button
    :class="['button', direction]"
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
    },
    direction: {
      type: String,
      default: "center"
    }
  }
};
</script>

<style lang="scss" scoped>
.center {
  margin: $xsmall auto;
}

.left {
  margin: $xsmall auto $xsmall 0;
}

.right {
  margin: $xsmall 0 $xsmall auto;
}

.button {
  font-family: "speziabold";
  letter-spacing: 0.1em;
  background-color: $mint;
  display: flex;
  align-items: center;
  border: none;
  text-transform: uppercase;
  color: white;
  font-size: $standard;
  padding: $xsmall;
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
