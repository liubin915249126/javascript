let shell = require('shelljs')

if(!shell.which('git')) {
  shell.echo('你还没安装git,请先安装git')
  shell.exit(1)
}

shell.echo('查看哪些文件变动')

if(shell.exec('git status').stdout.indexOf('working tree clean') !== -1) {
  shell.echo('没有变动文件')
  shell.exit(1)
}

if(shell.exec('git status').code !== 0) {
  shell.echo('git status执行出错')
  shell.exit(1)
}

shell.echo('开始添加新文件追踪')

if(shell.exec('git add .').code !== 0) {
  shell.echo('git add执行出错')
  shell.exit(1)
}

let intro = process.argv[2]

if(!intro) {
  shell.echo('请填写提交信息,格式为feat(xxxx):xxxxx')
  shell.exit(1)
}

if(shell.exec(`git commit -m ${intro}`).code !== 0) {
  shell.echo('git  commit执行出错')
  shell.exit(1)
}

let BranchName = shell.exec('git rev-parse --abbrev-ref HEAD')

shell.echo(`代码提交到本地完成,当前分支是${BranchName}`)

if(new Date().getHours() >= 19) {
  if(shell.exec(`git push origin ${BranchName}`).code !== 0) {
    shell.echo('推送远程失败')
    shell.exit(1)
  }
  shell.echo('推送远程完成')
}
