module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:testing-library/react',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'testing-library',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    semi: [2, 'never'],
  },
  overrides: [
    {
      files: [
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*.test.js',
        '**/*.test.jsx',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
