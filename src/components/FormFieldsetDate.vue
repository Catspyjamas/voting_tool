<template>
  <fieldset>
    <label :for="fieldId">{{ labelText }}</label>
    <Datetime
      v-model="dateString"
      placeholder="Click to add a date"
      :minute-step="30"
      type="datetime"
      :min-datetime="minDatetime"
      @input="$emit('input', dateString)"
    />
  </fieldset>
</template>
<script>
import { Datetime } from "vue-datetime";

export default {
  name: "FormFieldSetDate",
  components: {
    Datetime
  },
  props: {
    dateStringInitial: {
      type: String
    },
    labelText: {
      type: String,
      required: true
    },
    fieldId: {
      type: String,
      required: true
    },
    minDatetime: {
      type: String
    }
  },
  data: function() {
    return {
      dateString: null
    };
  },
  watch: {
    dateStringInitial(newDateString) {
      this.dateString = newDateString;
    }
  },
  created() {
    this.dateString = this.dateStringInitial;
  }
};
</script>
<style lang="scss">
label {
  color: $grey1;
  font-size: 1.25rem;
  border-left: 1px solid $grey1;
  padding-left: $xsmall;
  margin-bottom: $xsmall;
  display: block;
}
fieldset {
  border: unset;
  margin: unset;
  padding: unset;
  position: relative;
}

.vdatetime-input {
  transition: background-color 0.5 ease;
  font-family: "nexablack";
  border-radius: 35px;
  letter-spacing: 0.18em;
  font-size: 0.9rem;
  padding: 0.6rem 0.8rem 0.6rem 0.8em;
  text-transform: uppercase;
  color: white;
  text-align: center;
  cursor: pointer;
  background-color: $grey2;
  &:hover {
    color: white;
  }
  border-radius: 30px;
  font-weight: 300;
  border: unset;
  margin: 0 0 20px 0;
}
</style>
