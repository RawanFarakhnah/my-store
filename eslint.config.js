// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-config-prettier');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],

    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.spec.json'],
        tsconfigRootDir: __dirname,
      },
    },

    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      angular.configs.tsRecommended,
      prettier,
    ],

    processor: angular.processInlineTemplates,

    rules: {
      // Angular style rules
      // '@angular-eslint/template/prefer-control-flow': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

      '@angular-eslint/prefer-standalone': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },

  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
  },
]);
