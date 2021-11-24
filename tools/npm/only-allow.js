// only-allow/bin.js
#!/usr/bin/env node
const whichPMRuns = require('which-pm-runs')
const boxen = require('boxen')

const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.log('Please specify the wanted package manager: only-allow <npm|pnpm|yarn>')
  process.exit(1)
}
// 第一个参数则是 用户传入的希望使用的包管理器
// 比如 npx only-allow pnpm 
// 这里调试是 node bin.js pnpm
const wantedPM = argv[0]
// npm pnpm yarn 都不是，则报错
if (wantedPM !== 'npm' && wantedPM !== 'pnpm' && wantedPM !== 'yarn') {
  console.log(`"${wantedPM}" is not a valid package manager. Available package managers are: npm, pnpm, or yarn.`)
  process.exit(1)
}
// 使用的包管理器
const usedPM = whichPMRuns()
// 希望使用的包管理器 不相等，则报错。
// - npm  提示使用 npm install
// - pnpm 提示使用 pnpm install
// - yarn 提示使用 yarn install
// 最后退出进程
if (usedPM && usedPM.name !== wantedPM) {
  const boxenOpts = { borderColor: 'red', borderStyle: 'double', padding: 1 }
  switch (wantedPM) {
    case 'npm':
      console.log(boxen('Use "npm install" for installation in this project', boxenOpts))
      break
    case 'pnpm':
      console.log(boxen(`Use "pnpm install" for installation in this project.

If you don't have pnpm, install it via "npm i -g pnpm".
For more details, go to https://pnpm.js.org/`, boxenOpts))
      break
    case 'yarn':
      console.log(boxen(`Use "yarn" for installation in this project.

If you don't have Yarn, install it via "npm i -g yarn".
For more details, go to https://yarnpkg.com/`, boxenOpts))
      break
  }
  process.exit(1)
}

[referer][https://juejin.cn/post/7033560885050212389)