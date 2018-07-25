编辑器&Mac
-------

1、编辑器的使用`vs code`

*   插件

1.  git辅助工具，可查看代码的书写者：`Git Blame`

2、 Mac工具使用

*   强大终端 [item2](https://link.zhihu.com/?target=https%3A//www.iterm2.com/)

3、在 macOS 中完美配置文件名大小写敏感（解决git默认对大小写不敏感问题）[解决git大小写不敏感](https://zhuanlan.zhihu.com/p/35908178)

知识篇
---

一、git使用
-------

*   一般企业中使用代码管理工具Git开发时都是通过拉分支进行功能细致开发，所以掌握git的分支操作时必要的
*   使用Git下载指定分支命令为：`git clone -b 分支名仓库地址`
*   **初始开发git操作流程**  
    

*   本地创建公钥`ssh-keygen -t rsa -C "邮箱"`并配置
*   克隆最新主分支项目代码`git clone 地址`
*   创建本地分支`git branch 分支名`
*   查看本地分支`git branch`
*   查看远程分支`git branch -a`
*   切换分支`git checkout 分支名`(一般修改未提交则无法切换，大小写问题经常会有，可强制切换`git checkout 分支名 -f`非必须慎用)
*   将本地分支推送到远程分支`git push <远程仓库> <本地分支>:<远程分支>`

  

* * *

必备知识点
-----

*   **概念：**

  

![](https://pic3.zhimg.com/v2-f8b168effa15d7699d5861b1d0885d97_b.jpg)

![](https://pic3.zhimg.com/80/v2-f8b168effa15d7699d5861b1d0885d97_hd.jpg)

  

1.  **Remote:**远程主仓库；
2.  **Repository：**本地仓库；
3.  **Index：**Git追踪树,暂存区；
4.  **workspace：**本地工作区（即你编辑器的代码）

*   一般操作流程：《工作区》-\> `git status`查看状态 -\> `git add .`将所有修改加入暂存区-\> `git commit -m "提交描述"`将代码提交到本地仓库->`git push`将本地仓库代码更新到远程仓库

* * *

一、git remote
------------

*   为远程仓库指定别名，以便于管理远程主机，默认只有一个时为origin

1.  查看主机名：`git remote`
2.  查看主机名即网址：`git remote -v`  
    

*   默认克隆远程仓库到本地时，远程主机为origin，如需指定别名可使用`git clone -o <别名> <远程git地址>`

  

1.  查看主机的详细信息`git remote show <主机名>`
2.  添加远程主机`git remote add <主机名> <网址>`
3.  删除远程主机`git remote rm <主机名>`
4.  修改远程主机的别名：`git remote rename <原主机名> <新主机名>`

* * *

二、git fetch
-----------

*   将某个远程主机的更新，全部/分支 取回本地（此时之更新了Repository）它取回的代码对你本地的开发代码没有影响，如需彻底更新需合并或使用`git pull`

1.  远程主机的更新，全部取回本地`git fetch <远程主机名>`；
2.  将远程仓库特定分支更新到本地`git fetch <远程主机名> <分支名>`

*   如果需要将更新拉取但本地工作代码需要合并到本地某一分支`git merge <被合并的远程分支>`或者在此基础上创建出新分支并切换`git checkout -b <分支名> <在此分支上创建>`

* * *

三、git pull
----------

*   拉取远程主机某分支的更新，再与本地的指定分支合并（相当与fetch加上了合并分支功能的操作）

1.  拉取远程某分支并与本地某一分支合并（没有则默认会创建）：`git pull <远程主机名> <远程分支名>:<本地分支名>`
2.  如果远程分支是与当前所在分支合并，则冒号后面的部分可以省略：`git pull <远程主机名> <远程分支名>`
3.  如果当前分支与远程分支存在追踪关系,则可以省略远程分支名：`git pull <远程主机名>`
4.  如果当前分支只有一个追踪分支，则远程主机名都可以省略：`git pull`

三、git push
----------

*   将本地分支的更新，推送到远程主机，其命令格式与`git pull`相似

1.  将本地分支推送到远程分支：`git push <远程主机名> <本地分支名>:<远程分支名>`
2.  如果省略远程分支名，则默认为将本地分支推送到与之关联的远程分支：(一般设置本地分支和与之关联的远程分支同名，防止混淆)`git push <远程主机名> <本地分支名>`  
    

*   如果对应的远程分支不存在，则会被创建（m默认与本地分支同名）

  

1.  如果省略本地分支名，则表示删除指定的远程分支，这等同于推送一个空的本地分支到对应远程分支：`git push origin :<远程分支>` 等同于 `git push origin --delete <远程分支>`
2.  如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略`git push origin`
3.  如果当前分支只有一个追踪分支，那么主机名也可以省略：`git push`
4.  如果当前分支与多个主机存在追踪关系(使用场景相对来说较少)，可以使用-u指定默认推送主机`git push -u origin <主机名>`设置时候需推送便可以直接使用`git push`
5.  将本地的所有分支都推送到远程主机:`git push --all origin`
6.  如果远程主机的版本比本地版本更新，推送时Git会报错，要求先在本地做`git pull`合并差异，然后再推送到远程主机。如果一定要推送，可以使用`--force`选项(谨慎使用，除非你非常确认):`git push --force origin`

*   **注意**:分支推送顺序的格式为**<来源地>:<目的地>**，所以`git pull`格式：**<远程分支>:<本地分支>**，`git push`格式为：**<本地分支>:<远程分支>**。

* * *

四、分支操作
------

1.  创建本地分支：`git branch test`:(创建名为test的本地分支)
2.  切换分支：`git checkout test`:(切换到test分支)
3.  创建并切换分支`git branch -b test`:(相当于以上两条命令的合并)
4.  查看本地分支：`git branch`
5.  查看远程仓库所有分支：`git branch -a`
6.  删除本地分支：`git branch -d test`:(删除本地test分支)
7.  分支合并：`git merge master`:(将master分支合并到当前分支)

*   **分支关联：**

1.  查看当前的本地分支与远程分支的关联关系:`git branch -vv`

  

![](https://pic4.zhimg.com/v2-8c639da805ca2f5889b0cec87dbff50a_b.jpg)

![](https://pic4.zhimg.com/80/v2-8c639da805ca2f5889b0cec87dbff50a_hd.jpg)

  

1.  把当前本地分支与远程origin的某分支进行关联处理(通过 --set-upstream-to 命令):`git branch --set-upstream-to=origin/feature/clear-server-eslint-error_180713`

  

![](https://pic4.zhimg.com/v2-f84273b6805abf5ebe3b7ff6312c2c0e_b.jpg)

![](https://pic4.zhimg.com/80/v2-f84273b6805abf5ebe3b7ff6312c2c0e_hd.jpg)

  

*   **分支差异查看**

1.  查看本地当前分支与远程某一分支的差异：`git diff origin/feature/reserve-3.4`
2.  查看本地特定分支与远程分支的差异：`git diff master origin/feature/reserve-3.4` (查看本地master分支与远程feature/reserve-3.4分支的差异，如图)

  

![](https://pic4.zhimg.com/v2-5c98738860d604a3d5d121b6d0277a8b_b.jpg)

![](https://pic4.zhimg.com/80/v2-5c98738860d604a3d5d121b6d0277a8b_hd.jpg)

  

* * *

五、修改撤销
------

1.  `git checkout -- <文件名>`：丢弃工作区的修改，就是让这个文件回到最近一次`git commit`或`git add`时的状态。
2.  `git reset HEAD <文件名>`：把暂存区的修改撤销掉（unstage），重新放回工作区。
3.  `git reset --hard commit_id`:git版本回退，回退到特定的commit_id版本  
    

*   流程：
*   `git log`查看提交历史，以便确定要回退到哪个版本(commit 之后的即为ID);

  

  

![](https://pic4.zhimg.com/v2-c3f76030d6b355e7972c33d549d328c6_b.jpg)

![](https://pic4.zhimg.com/80/v2-c3f76030d6b355e7972c33d549d328c6_hd.jpg)

  

*   `git reset --hard commit_id`:回退到commit_id版本；
*   `git reflog`查看命令历史，以便确定要回到未来的哪个版本;  
    

*   更新远程代码到本地  
    `git fetch origin master(分支)`  
    `git pull // 将fetch下来的代码pull到本地`  
    `git diff master origin/master // 查看本地分支代码和远程仓库的差异`

  

*   拉取远程分支并创建本地分支

1.  `git checkout -b 本地分支名 origin/远程分支名`:使用此方式会在本地新建分支，并自动切换到该本地分支；
2.  `git fetch origin 远程分支名:本地分支名`:使用此方式会在本地新建分支，但是不会自动切换到该本地分支，需要手动checkout。

六、配置
----

*   `git config -l` // 陈列出所有的git配置项
*   `git config core.ignorecase false` //配置git不忽略大小写（默认忽略）参照(git 大小写)

> **“积跬步、行千里”**—— 持续更新中~，喜欢留下个赞哦！

*   往期经典好文：  
    

1.  [JavaScript经典面试题汇总](https://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000015162142)
2.  [我的前端面试日记](https://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000015268943)

  

*   相关好文推荐：  
    

1.  [http报文详解](https://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000015017908)