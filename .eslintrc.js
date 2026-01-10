module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Backend-friendly rules
    "no-console": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "no-underscore-dangle": "off",
    "consistent-return": "off",
    "spaced-comment": "off",
    "import/order": "off",
    "no-shadow": "off",
    "max-classes-per-file": "off",
    "func-names": "off",
  },
};
