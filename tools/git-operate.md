#### 创建分支提交到远程
>
  git checkout -b test //创建并进入新的分支
  
  git push --set-upstream origin test // 当前分支与远程分支关联

  
  git checkout -b liubin origin/liubin
  git push --set-upstream origin liubin

  //git branch --set-upstream-to=origin/test test
  
  本地文件夹关联github
  git remote add origin https://github.com/liubin915249126/Test.git
  git push -u origin master

  ssh-keygen -t rsa -C "1050794513@qq.com"

  git push origin HEAD:feature/5/forestV2.0

  git config --global user.name "liubin"
  git config --global user.email "915249126@qq.com"
   
  git config -e --global  

  git config --global push.default upstream
  git config --global push.default simple 

>

npm cache clean --force

#### 删除本地与远程分支
>
  git branch -d test

  git branch -r -d origin/test

  git push origin :test 
>

#### git 切换源 
git remote remove origin # 删掉原来git源
git remote add origin [YOUR NEW .GIT URL] # 将新源地址写入本地版本库配置文件


### nginx commend
```bash
   /usr/local/etc/nginx/
   sudo apachectl stop
   sudo nginx -c /usr/local/etc/nginx/nginx.conf
   sudo nginx -s reload
   查询nginx主进程号：ps -ef|grep nginx
   正常停止   sudo kill -QUIT 主进程号
   快速停止   sudo kill -TERM 主进程号  
   sudo lsof -i :8080
```
sudo vim /etc/hosts
修改host: 127.0.0.1       testadmin.portal.com
访问/api/下的请求全部转到http://127.0.0.1:9099/下面,
访问根目录转到服务器


find  . "(" -name "*.js" -or -name "*.jsx" ")" -print | xargs wc -l

c:\windows\system32\drivers\etc


http://IPAddress.com
github.com
assets-cdn.github.com1
github.global.ssl.fastly.net
ipconfig /flushdns
```js
  git tag -a 1.0 -m "note" //创建 tag
  git push origin --tags    //推送所有 tag
  git tag -d version //  删除tag
  git push origin :refs/tags/version //删除远程标签
```

HTTP 413 curl 22 The requested URL returned error: 413 Request Entity Too Large
git config --global http.postBuffer 52428800


[](https://blog.csdn.net/ligang2585116/article/details/51816372#t7)

工作区：即自己当前分支所修改的代码，git add xx 之前的！不包括 git add xx 和 git commit xxx 之后的。 git checkout -- a.txt 
暂存区：已经 git add xxx 进去，且未 git commit xxx 的。 git reset HEAD a.txt //取消暂存  git checkout fileName //撤销修改
本地分支：已经git commit -m xxx 提交到本地分支的。

git reset
–hard：重设index和working directory，从<commit>以来在working directory中的任何改变都被丢弃，并把HEAD指向<commit>
–soft：index和working directory中的内容不作任何改变，仅仅把HEAD指向<commit>
–mixed：仅重设index，但是不重设working directory。

将本地的状态回退到和远程一样  $ git reset --hard origin/devlop
要想在develop分支，但错误地提交到了maser分支
```js
    git checkout master
    git add .
    git commit -m"..."
    git reset --mixed HEAD~1
    git stash
    git checkout develop
    git stash pop
```

撤销合并 
```js
   $ git reset --hard HEAD~1 //这个方法的缺点是它会重写历史，在一个共享的仓库中这会造成问题的。如果其他人已经有你将要重写的提交，你应当避免使用 reset。 如果有任何其他提交在合并之后创建了，那么这个方法也会无效；移动引用实际上会丢失那些改动。
   $ git revert -m 1 HEAD //-m 1 标记指出 “mainline” 需要被保留下来的父结点。上述示例为以上次提交的结点为当前主线父节点。同理：$ git   -m 1 HEAD~3 表示最近3次的提交会被干掉。
```

#### 403
清除缓存
git config --local --unset credential.helper
git config --global --unset credential.helper
git config --system --unset credential.helper

git config --global credential.helper store

#### 切换源
git remote remove origin # 删掉原来git源
git remote add origin [YOUR NEW .GIT URL] # 将新源地址写入本地版本库配置文件

#### 杀死进程
sudo lsof -i:3000
sudo kill -9 7748   (PID)