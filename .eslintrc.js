module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
  },
};
