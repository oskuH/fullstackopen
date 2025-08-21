import js from '@eslint/js'
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: { '@stylistic': stylistic },
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        'beforeEach': 'readonly',
        'test': 'readonly',
        'describe': 'readonly',
        'expect': 'readonly',
        'afterAll': 'readonly',
        'db': 'readonly',
        'next': 'readonly'
      },
      ecmaVersion: 'latest',
    },
    rules: {
      'eqeqeq': 'error',
      'no-console': 'off',
      'no-underscore-dangle': ['error', { allow: ['_id', '__v'] }],
      'no-param-reassign': ['error', { ignorePropertyModificationsFor: ['returnedObject'] }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/comma-dangle': ['error', 'never']
    },
  },
]);