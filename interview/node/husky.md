## husky
- npx --no-install husky-upgrade
- GIT_PARAMS env 变量，请将其重命名为HUSKY_GIT_PARAMS
- 从1.0.0开始，husky 可以使用配置.huskyrc，.huskyrc.json，.huskyrc.js或husky.config.js文件。
```js
{
  "scripts": {
-   "precommit": "npm test",
-   "commitmsg": "commitlint -E GIT_PARAMS"
  },
+ "husky": {
+   "hooks": {
+     "pre-commit": "npm test",
+     "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
+   }
+ }
}
```
#### 访问Git参数和标准输入
Git挂钩可以通过命令行参数和stdin获取参数。husky 使它们可以通过HUSKY_GIT_PARAMS和HUSKY_GIT_STDIN环境变量来访问。
可以简单测试一下，你就能看到这些参数其实获取到的就是你输入的message信息
```sh
"commit-msg": "echo $HUSKY_GIT_PARAMS"
```
```sh
HUSKY_SKIP_HOOKS = 1 git rebase ... # 跳过所有挂钩
HUSKY_SKIP_INSTALL=1 npm install # 不希望husky自动安装Git挂钩
```