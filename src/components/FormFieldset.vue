<template>
  <fieldset>
    <label :for="fieldId">{{ labelText }}</label>
    <textarea
      v-if="textarea"
      :id="fieldId"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      rows="5"
      @input="$emit('input', $event.target.value)"
    />
    <input
      v-else
      :id="fieldId"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </fieldset>
</template>

<script>
export default {
  name: "FormFieldset",
  props: {
    value: {
      type: String,
      default: ""
    },
    fieldId: {
      type: String,
      required: true
    },
    labelText: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: "Fill in"
    },
    type: {
      type: String,
      default: "text"
    },
    textarea: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
legend {
  display: none;
}

label,
input,
textarea {
  font-family: "Lato", sans-serif;
  font-weight: 300;
  margin-top: unset;
  margin-bottom: 1em;
}

input,
textarea {
  width: 100%;
  border: 0;
  padding: 0.3em;
  font-size: 1.3em;
  background: #e8e8e8;
}

label {
  color: $primary;
  font-size: $small;
  border-left: 1px solid $primary;
  padding-left: 0.5em;
  margin-bottom: 0.5em;
  display: block;
}

fieldset {
  border: unset;
  margin: unset;
  padding: unset;
  position: relative;
}

textarea {
  resize: none;
}
</style>

<docs>
This is a Fieldset containing a label and an input field.
```jsx
<FormFieldset fieldId="vote__option__title" labelText="Blabla" />
```
</docs>
