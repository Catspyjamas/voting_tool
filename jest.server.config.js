module.exports = {
  // Necessary because otherwise mongoose will show a warning
  testEnvironment: "node",
  roots: ["<rootDir>/app"],
  transformIgnorePatterns: ["/node_modules/", "<rootDir>/app"]
};
