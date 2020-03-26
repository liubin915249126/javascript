### air-drop
- 多语言
  - v-html
  - .replace
- nuxt
  - vue-svg-loader vs file-loader 
  - static 静态资源目录不编译
- filter:drop-shadow(var(--brand-color) 15px 0)
- img video : object-fit: fill||cover

#### git
日常开发 
- git pull -r
  - git fetch origin
  - git rebase origin/master
- git rebase master
  提取当前分之相对于共同祖先c2相应的修改并存为临时文件,然后将当前分支指向目标基底 c3(c2+提交的更改)
  最后以此将之前另存为临时文件的修改依序应用当前分之
  [git](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA)