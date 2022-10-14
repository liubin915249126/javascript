1. npm i husky -D
2. 在 package.json 中添加 prepare 命令

```js
{
"script": {
"prepare": "husky install"
}
}
```

3. 执行 prepare 命令 npm run prepare 会在项目跟目录下创建 .husky/文件夹，用来存放所有的 git hooks。

4. 添加 commit-msg

```js
  npx husky add .husky/commit-msg 'yarn commitlint --edit "$1"'
  // 如果不生效请使用yarn
  yarn husky add .husky/commit-msg 'yarn commitlint --edit "$1"'
```

5. 自定义 git 提交规范
   npm i @commitlint/cli @commitlint/config-conventional -D
   项目跟目录下创建 commitlint.config.js 在里面定义提交规则

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2, // type必须输入
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'style', // 修改格式，删除代码空格、缩进等
        'docs', // 文档、注释修改
        'refactor', // 代码重构，没有功能修改
        'merge', // 代码合并
        'revert', // 版本回滚
        'chore', // 构建过程或辅助工具的变动
        'test',
        'perf',
        'build',
        'ci',
        'revert',
        'wip',
        'workflow',
        'types',
        'release',
      ],
    ],
  },
}
```

git hooks

```js
  npx husky add .husky/pre-commit "npm run lint"
  // 如果不生效请使用yarn
  yarn husky add .husky/pre-commit "npm run lint"
```

npm i lint-staged -D
在 package.json 中添加 lint 命令

```js
{
  "script": {
    "lint": "lint-staged"
  }
}
```

package.json

```js
{
  "lint-staged": {
    "*.{js.vue}": [
      "prettier --write",
      "eslint --cache --fix"
    ]
  }
}
```

链接：https://www.jianshu.com/p/15a6cff4087e

./node_modules/.bin/eslint --init
