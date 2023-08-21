module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off', // Done at build time
    'react/prop-types': 'off', // TODO: disable this (#20)
    '@typescript-eslint/no-unused-vars': 'off', // letting typescript handle this instead
    'no-case-declarations': 'off',
  },
  settings: {
    react: {
      version: '18',
    },
  },
};
