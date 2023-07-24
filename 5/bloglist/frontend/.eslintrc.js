/* eslint-env node */
module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true,
    'cypress/globals': true
  },
  'extends': [
    'react-app',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended'
  ],
  'plugins': ['jsx-a11y', 'react', 'jest', 'cypress'],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  overrides: [
    {
      files: ['cypress/**/*.cy.js'],
      plugins: ['cypress'],
      rules: {
        'jest/expect-expect': 'off',
        'jest/no-focused-tests': 'off'
      },
    },
  ],
}