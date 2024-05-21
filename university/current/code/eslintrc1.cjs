const resolve = (root, dir) => `./${dir}`;

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'airbnb-base', '@vue/prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    baseMainurl: 'readonly',
    responseWrap: 'readonly',
    errorResponse: 'readonly',
    baseGateWay: 'readonly',
    cache: 'readonly',
    log: 'readonly',
    localesCache: 'readonly',
    githubToken: 'readonly'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
        semi: true,
        printWidth: 120,
        jsxBracketSameLine: false,
        bracketSameLine: false,
        trailingComma: 'none',
        useTabs: false,
        htmlWhitespaceSensitivity: 'ignore'
      }
    ],
    'no-console': 1,
    'vue/max-attributes-per-line': [
      1,
      {
        singleline: 5,
        multiline: {
          max: 1
        }
      }
    ],
    'vue/no-v-model-argument': 'off',
    'vue/html-indent': 'off',
    'vue/attributes-order': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'vue/order-in-components': 'off',
    'vue/html-self-closing': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'vue/script-setup-uses-vars': 'off', // vue3写法规则，暂时关闭
    'vue/no-parsing-error': 1,
    'no-const-assign': 2,
    'no-var': 2,
    'no-duplicate-imports': 2,
    'func-names': 0,
    semi: ['error', 'always'],
    'semi-spacing': ['error', { before: false, after: true }],
    'import/extensions': 0,
    eqeqeq: [1, 'always'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  },
  plugins: ['vue', 'prettier', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', './']],
        extensions: ['.vue', '.js', '.json', '.ts']
      }
    }
  }
};
