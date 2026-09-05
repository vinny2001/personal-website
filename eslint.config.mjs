import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

// Vitest injects these as globals (see `test.globals` in vite.config.mjs).
const vitestGlobals = {
  describe: 'readonly',
  it: 'readonly',
  test: 'readonly',
  expect: 'readonly',
  vi: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
};

export default [
  { ignores: ['build/**', 'dist/**', 'coverage/**'] },

  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'], // new JSX transform — no `import React` needed
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  prettier, // turn off stylistic rules that Prettier owns — keep last

  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { 'react-hooks': reactHooks },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: {
          moduleDirectory: ['node_modules', 'src'], // absolute imports rooted at src/
          extensions: ['.js', '.jsx'],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'warn', // advisory; several existing effects trip it
      'react/prop-types': 'off', // project convention: plain JS, no PropTypes
      'react/no-unescaped-entities': 'off', // prose in JSX has plenty of apostrophes
      'import/no-unresolved': 'off',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [{ pattern: 'react', group: 'external', position: 'before' }],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'ignore',
        },
      ],
    },
  },

  {
    files: ['src/**/*.test.{js,jsx}', 'src/setupTests.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...vitestGlobals },
    },
  },
];
