#### 创建分支提交到远程
>
  git checkout -b test //创建并进入新的分支
  
  git push --set-upstream origin test // 当前分支与远程分支关联

  
  //git branch --set-upstream-to=origin/test test
  
  本地文件夹关联github
  git remote add origin https://github.com/liubin915249126/Test.git
  git push -u origin mastegit

>

#### 删除本地与远程分支
>
  git branch -d test

  git branch -r -d origin/test

  git push origin :test
>