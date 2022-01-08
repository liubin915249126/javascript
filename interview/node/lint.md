## code Lint
- eslint 规范并校验 ECMAScript/JavaScript code的编写
- tslint 规范并校验 TypeScript code的编写
- stylelint 规范并校验css/scss/less code的编写
- commitlint 负责校验commit msg是否符合规范
- prettier 或 beautifyjs 统一代码排版格式

- husky 能够监听git hooks的nodejs包，让nodejs开发者处理git hooks任务变得更加容易
- lint-staged 可以将git“已暂存(staged)”的文件作为参数传入你要执行的shell script之中

#### 
```js
// 这是NPM原生支持的脚本执行定义，当执行“npm run 脚本名”时执行
"scripts": {
    "test": "node test.js"
},
// 这是husky扩展的脚本执行的定义方式，当对应git hooks触发时执行
"husky": {
    "hooks": {
      // 可以执行一个js文件，将控制权转移给我们更熟悉的nodejs
      "pre-commit": "node heihei.js", 
      // 也可以调用其他脚本或者执行一段原生shell命令
      "commit-msg": "npm run test && echo succeed" ,
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS" 
    }
}
```

#### 安装配置commitlint
@commitlint/cli 是commitlint提供的命令行工具，安装后会将cli脚本放置在./node_modules/.bin/目录下
@commitlint/config-conventional是社区中一些共享的配置，我们可以扩展这些配置，也可以不安装这个包自定义配置
```sh
npm install @commitlint/cli --save-dev  
npm install @commitlint/config-conventional --save-dev
```
commitlint.config.js
```js
/**
* feature：新功能
* update：更新某功能
* fixbug：修补某功能的bug
* refactor：重构某个功能
* optimize: 优化构建工具或运行时性能
* style：仅样式改动
* docs：仅文档新增/改动
* chore：构建过程或辅助工具的变动
*/
module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'type-enum': [2, 'always', [
      'feature', 'update', 'fixbug', 'refactor', 'optimize', 'style', 'docs', 'chore'
    ]],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
};
// 这些配置是什么意思？请自行查阅commitlint文档
```
#### 集成ESLint
```sh
# 和commitlint一样， 这会在./node_modules/.bin/目录下创建一个名为eslint.cmd的执行脚本（在windows系统下生成的是cmd脚本，在linux下就是sh脚本咯，这由nodejs自动帮你处理），eslint.cmd是eslint包提供的cli工具。
npm install --save-dev eslint
npm install --save-dev eslint-config-standard
npm install --save-dev eslint-plugin-vue
npm install --save-dev babel-eslint
```
.eslintrc.js
```js
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugin:[],
  extends: [
      'plugin:vue/essential',// 识别vue语法，并提供vue默认校验规则
      'standard'
  ],
  rules:[]
}
```
执行
```sh
./node_modules/.bin/eslint ./** --fix
npx eslint ./** --fix
```
#### 集成StyleLint
```sh
npm install --save-dev stylelint
npm install --save-dev stylelint-config-standard
```
npx stylelint ./ --fix
.stylelintrc.js
```js
"use strict";
module.exports = {
  ignoreFiles: [
    "./**",
    "!./client/views/**/*.vue",
    "!./client/views/**/*.scss",
    "!./client/styles/**/*.scss",
    "!./client/plugin/**/*.vue",
    "!./client/plugin/**/*.scss"
  ],
  extends: ["stylelint-config-standard"],
  rules: {
      // 这里可以覆盖一些配置
  }
};
```
####
只对 staged 的文件进行“增量校验”
```sh
npm install --save-dev lint-staged
```
```json
{
  "scripts": {
    "eslint:fix": "eslint --fix --ext \".js,.vue\"",
    "eslint:lint": "eslint --ext \".js,.vue\"",
    "stylelint:fix": "stylelint \"./**\" --fix"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  // "lint-staged"这个配置，它会匹配Git中处于staged状态的文件名，并针对这些匹配到的文件执行相对应的脚本，以vue文件为例，它会你在执行git commit -m 'test'时，依次执行npm run stylelint:fix、npm run eslint:fix 和 git add，如果没有错误或者错误能被自动修复(--fix)， 则会将改动自动add 将修复后的代码加入 git staged, 继续进行commitlint的校验，若全部通过，才会生成一个新的commit
  "lint-staged": {
    "linters": {
      "*.{scss,css}":[
        "npm run stylelint:fix",
        "git add"
      ],
      "*.vue": [
        "npm run stylelint:fix",
        "npm run eslint:fix",
        "git add"
      ],
      "*.{js}": [
        "npm run eslint:fix",
        "git add"
      ]
    },
    "ignore": [
      "**/test/**"
      // 你要忽略的其他目录...
    ]
  }
}
```