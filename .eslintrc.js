module.exports = {
  env: {
    commonjs: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:promise/recommended',
    'plugin:array-func/all',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:lodash/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/all',
    'prettier',
  ],
  overrides: [
    {
      files: ['./*', 'client/**/*.js', 'setup-tests.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'node/no-extraneous-import': 'off',
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'no-console': 'off',
      },
    },
    {
      env: {
        'jest/globals': true,
      },
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'lodash/prefer-constant': 'off',
        'no-magic-numbers': 'off',
        'node/no-extraneous-import': 'off',
      },
    },
    {
      env: {
        'jest/globals': true,
      },
      files: ['**/__mocks__/**'],
      rules: {
        'import/prefer-default-export': 'off',
        'no-magic-numbers': 'off',
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/prefer-default-export': 'off',
        'max-classes-per-file': 'off',
        'no-shadow': 'off',
      },
    },
    {
      files: ['client/**/*.tsx', 'client/**/*.ts'],
      rules: {
        'node/no-unsupported-features/node-builtins': 'off',
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              kebabCase: true,
              pascalCase: true,
            },
          },
        ],
      },
    },
    {
      files: ['functions/**/*.ts'],
      rules: {
        'no-underscore-dangle': [
          'error',
          {
            allow: ['_id'],
          },
        ],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    'promise',
    'unicorn',
    'array-func',
    'lodash',
    'node',
    'eslint-comments',
    'jest',
    '@typescript-eslint',
  ],
  root: true,
  rules: {
    'no-param-reassign': ['error', { props: false }],
    // 'consistent-return': 'off',
    // 'arrow-body-style': 0,
    // 'comma-dangle': 0,
    'node/no-unsupported-features/es-syntax': 'off',
    // 'import/prefer-await-to-then': 'off',
    // 'no-underscore-dangle': 'off',
    'lodash/prefer-lodash-method': [
      'error',
      {
        ignoreMethods: ['find'],
      },
    ],
    'node/no-missing-import': 'off',
    'node/no-unpublished-import': 'off',
    'unicorn/no-null': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-process-exit': 'off',
    'unicorn/no-process-exit': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'functional/no-conditional-statement': 'off',
    'functional/no-try-statement': 'off',
    'functional/no-throw-statement': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-void': ['error', { allowAsStatement: true }],
    'no-magic-numbers': [
      'error',
      {
        ignore: [0, 1, -1],
        ignoreDefaultValues: true,
      },
    ],
    'no-console': 'error',
    'jest/prefer-expect-assertions': 'off',
    'jest/no-conditional-expect': 'off',
    'jest/expect-expect': 'off',
    'jest/prefer-strict-equal': 'off',
    'unicorn/prefer-spread': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`,
        project: ['client', './functions'],
      },
    },
  },
};
