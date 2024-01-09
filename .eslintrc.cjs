module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["vue","@stylistic/js"],
  rules: {
    "@stylistic/js/semi": ["error","always"],
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["Home", "About"],
      },
    ],
  },
};
