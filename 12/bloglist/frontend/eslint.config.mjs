import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist/**']),
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { '@stylistic': stylistic },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: { ...globals.browser }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'eqeqeq': 'error',
      'react/prop-types': 0,
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double']
    }
  }
]);
