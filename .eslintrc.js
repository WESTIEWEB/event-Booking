const baseConfig = require('eslint-config-airbnb-base/rules/style')

module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    'max-len': ['error', { code: 150, ignoreComments: true }],
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    // we partially override indent here because of a known bug in eslint v8 that affects decorators
    // have a look at this and see if someone has solved it: https://github.com/eslint/eslint/issues/15299
    '@typescript-eslint/indent': [
      baseConfig.rules.indent[0],
      baseConfig.rules.indent[1],
      {
        ...baseConfig.rules.indent[2],
        ignoredNodes: [
          ...baseConfig.rules.indent[2].ignoredNodes,
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params[decorators.length > 0] ~ .params',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
          'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key'
        ]
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': [
          '**/*.e2e-spec.ts',
          '**/*.int-spec.ts',
          '**/*.spec.ts',
          '**/*.test.ts',
          '**/test/**/*.ts'
        ]
      }
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { 
        argsIgnorePattern: '^_+$',
        varsIgnorePattern: '^_+$'
      },
    ]
  },
  ignorePatterns: [".eslintrc.js"],
};
