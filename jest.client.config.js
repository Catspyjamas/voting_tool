// Set Vue CLI flags manually
// We don't want to use @vue/cli-plugin-unit-jest because
// it comes with its own set of assumptions.
process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  watchPathIgnorePatterns: ["node_modules"]
};
