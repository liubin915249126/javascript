## cli

#### npm
- 当前npm 服务指向 本地 
  - npm set registry https://npm-internal.bybit.com
- 注册用户 
  - npm adduser --registry https://npm-internal.bybit.com
  - npm profile set password --registry https://npm-internal.bybit.com
- 发布
  - npm whoami
  - npm publish --registry https://npm-internal.bybit.com
  - lerna publish patch
    1）用git pull/git merge/git fetch等命令从远程拉取代码；
    2）使用命令git fetch origin --prune从远程拉取tag记录，这一步至关重要；
    3）先在本地运行lerna diff或者lerna changed，如果提示有变化或者有待发布的包，说明上一个开发者的最近一个commit没有加tag，需要联系到他，使用命令git tag -a v1.2 9fceb02 -m 'my description'为最近一个commit补充上tag标签；
    4）重复1、2、3步，如果提示无diff，后面就可以开始开发了，发包后，检查最后一次commit是否拥有tag，如果没有请加上（防止坑别人）；

# 常用的仓库地址
  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
#### git 删除tag  
批量删本地:  git tag -l| awk '/rc_[0-9]{1}[0-9]{0,}$/ {print  $1}' | xargs git tag -d
git tag | xargs -I {} git tag -d {}
批量删远程: git show-ref --tag | awk '/rc_[0-9]{1}[0-9]{0,}$/ {print ":" $2}' | xargs git push origin //这里的空格要注意 
git tag | xargs -I {} git push origin :refs/tags/{}