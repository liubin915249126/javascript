#### 创建分支提交到远程
>
  git checkout -b test //创建并进入新的分支
  
  git push --set-upstream origin test // 当前分支与远程分支关联

  git checkout -b cash origin/cash
  
  //git branch --set-upstream-to=origin/test test
  
  本地文件夹关联github
  git remote add origin https://github.com/liubin915249126/Test.git
  git push -u origin mastegit
  
  git config --global user.name ""

>

#### 删除本地与远程分支
>
  git branch -d test

  git branch -r -d origin/test

  git push origin :test 
>

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



