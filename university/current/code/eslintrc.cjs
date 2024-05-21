module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
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
      githubToken: 'readonly',
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
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
          trailingComma: 'es5',
          useTabs: false,
          htmlWhitespaceSensitivity: 'ignore',
        },
      ],
      'no-console': 1,
      'vue/max-attributes-per-line': [
        1,
        {
          singleline: 5,
          multiline: {
            max: 1,
          },
        },
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
      'no-unused-vars': [2, { vars: 'all', args: 'none', ignoreRestSiblings: false }],
      'vue/script-setup-uses-vars': 'off', // vue3写法规则，暂时关闭
      'vue/no-parsing-error': 1,
      'no-const-assign': 2,
      'no-var': 2,
      'no-duplicate-imports': 2,
      'func-names': 0,
      'no-unresolved': 0,
      semi: ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      eqeqeq: [1, 'always'],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    plugins: ['vue', 'prettier', '@typescript-eslint'],
    //   settings: {
    //     'import/resolver': {
    //       webpack: {
    //         config: {
    //           resolve: {
    //             alias: {
    //               '~': __dirname,
    //               '@': __dirname,
    //               static: resolve(__dirname, 'static'), // use in template with <img src="~static/nuxt.png" />
    //               '~static': resolve(__dirname, 'static'),
    //               assets: resolve(__dirname, 'assets'), // use in template with <img src="~static/nuxt.png" />
    //               '~assets': resolve(__dirname, 'assets'),
    //               '~plugins': resolve(__dirname, 'plugins'),
    //               '~store': resolve(__dirname, '.nuxt/store'),
    //               '~router': resolve(__dirname, '.nuxt/router'),
    //               '~pages': resolve(__dirname, 'pages'),
    //               '~components': resolve(__dirname, 'components'),
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },

    // settings: {
    //     'import/resolver': {
    //         alias: {
    //             map: [
    //               ["~", __dirname],
    //               ["@", __dirname],
    //               ['~components': resolve(__dirname, 'components')],
    //               ['~pages', resolve(__dirname, 'pages')],
    //               ['assets', resolve(__dirname, 'assets')],
    //               ['~assets', resolve(__dirname, 'assets')],
    //               ['static', resolve(__dirname, 'static')],
    //               ['~static', resolve(__dirname, 'static')],
    //               ['~plugins',  resolve(__dirname, 'plugins')],
    //               ['~router', resolve(__dirname, '.nuxt/router')],
    //               ['~store', resolve(__dirname, '.nuxt/store')],
    //             ],
    //             extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    //         },
    //     },
    //   },
  };

//  eslint-import-resolver-alias
"eslint-config-airbnb-base": "^15.0.0",

  ```
  //   eslint-import-resolver-webpack
  settings: {
    'import/resolver': {
        'webpack': {
            'config': 'node_modules/nuxt/webpack.config.js'
        }
    }
},
  ```
  