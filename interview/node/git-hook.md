## githooks 之使用 husky 规范 git 提交

Git Hooks 就是那些在 Git 执行特定事件（

- commit
- push
- receive
  ）后触发运行的脚本
  hooks 目录是$GIT_DIR/hooks，但是可以通过 core.hooksPath 配置变量来更改

#### Git Hooks 功能作用

.git/hooks

多人开发代码语法、规范强制统一
commit message 格式化、是否符合某种规范
如果有需要，测试用例的检测
服务器代码有新的更新的时候通知所有开发成员
代码提交后的项目自动打包 travis ci（git receive 之后） 等等

#### 钩子的作用域

对于任何 Git 仓库来说钩子都是本地的，而且它不会随着 git clone 一起复制到新的仓库。而且，因为钩子是本地的，任何能接触得到仓库的人都可以修改。在开发团队中维护钩子是比较复杂的，因为.git/hooks 目录不随你的项目一起拷贝，也不受版本控制影响。一个简单的解决办法是把你的钩子存在项目的实际目录中（在.git 外）。这样你就可以像其他文件一样进行版本控制。

#### 常用钩子

客户端 Hooks
客户端钩子只影响它们所在的本地仓库。有许多客户端挂钩，以下把他们分为：

- 提交工作流挂钩
  - pre-commit
    pre-commit 挂钩在键入提交信息前运行，最先触发运行的脚本。被用来检查即将提交的代码快照。例如，检查是否有东西被遗漏、运行一些自动化测试、以及检查代码规范。当从该挂钩返回非零值时，Git 放弃此次提交，但可以用 git commit --no-verify 来忽略。该挂钩可以被用来检查代码错误，检查代码格式规范，检查尾部空白（默认挂钩是这么做的），检查新方法（译注：程序的函数）的说明。
    pre-commit 不需要任何参数，以非零值退出时将放弃整个提交。这里，我们用 “强制代码格式校验” 来说明
  - prepare-commit-msg
    挂钩在提交信息编辑器显示之前，默认信息被创建之后运行，它和 pre-commit 一样，以非零值退出会放弃提交
    该挂钩接收一些选项：拥有提交信息的文件路径，提交类型。
  - commit-msg
    commit-msg 钩子和 prepare-commit-msg 钩子很像，但它会在用户输入提交信息之后被调用。这适合用来提醒开发者他们的提交信息不符合你团队的规范。传入这个钩子唯一的参数是包含提交信息的文件名。如果它不喜欢用户输入的提交信息，它可以在原地修改这个文件（和 prepare-commit-msg 一样），或者它会以非零值退出，放弃这个提交。比如说，下面这个脚本确认用户没有删除 prepare-commit-msg 脚本自动生成的 ISSUE-[#]字符串。
  - post-commit
    post-commit 挂钩在整个提交过程完成后运行，他不会接收任何参数，但可以运行 git log 来获得最后的提交信息。总之，该挂钩是作为通知之类使用的。虽然可以用 post-commit 来触发本地的持续集成系统，但大多数时候你想用的是 post-receive 这个钩子。它运行在服务端而不是用户的本地机器，它同样在任何开发者推送代码时运行。那里更适合进行持续集成。
- 电子邮件工作流挂钩
- 其他客户端挂钩

#### husky 介绍

Git hooks made easy 让 githooks 使用起来简单的工具

#### 使用 husky 实现以下功能

代码规范校验
commit message 规范

- 相关依赖
  husky
  lint-staged 只校验有更改的提交
  prettier 格式化
  @commitlint/cli
  @commitlint/config-angular(@commitlint/config-conventional)
  conventional-changelog-cli 生成 change log
- package.json

```json
"lint-staged": {
    "*.js": [
      "eslint --fix",
      "git add"
    ],
    "*.json": [
      "prettier --write",
      "git add"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged", // 校验代码规范
      // 当我们在当前项目中执行 git commit -m '测试提交' 时将触发commit-msg事件钩子并通知husky，从而执行 commitlint -E HUSKY_GIT_PARAMS命令，也就是我们刚开始安装的./node_modules/.bin/commitlint，它将读取commitlint.config.js配置规则并对我们刚刚提交的测试提交这串文字进行校验，若校验不通过，则在终端输出错误，commit终止。
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS" // 校验commit message规范
    }
  },
```

- 根目录新增 commitlint 配置文件 commitlint.config.js

```js
module.exports = { extends: ["@commitlint/config-angular"] };
```
