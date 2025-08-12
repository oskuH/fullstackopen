import { defineConfig } from 'eslint/config';
import js from '@eslint/js'
import playwright from 'eslint-plugin-playwright'
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  {
    ignores: [
      'playwright.config.js'
    ]
  },
  js.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    plugins: {
      ...playwright.configs['flat/recommended'].plugins,
      '@stylistic': stylistic
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'eqeqeq': 'error',
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/comma-dangle': ['error', 'never']
    }
  }
]);
