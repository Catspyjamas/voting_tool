module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended',
    "eslint:recommended",
    "prettier/vue",
    "plugin:prettier/recommended",

  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "any"
      }
    }]
  }
}