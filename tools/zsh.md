## zsh
cat /etc/shells  //查看可用的 shell 
#### plugin
vim ~/.zshrc   # 输入命令在 zshrc 中配置
source ~/.zshrc
```bash
plugins=(
  git
  zsh-syntax-highlighting
  zsh-autosuggestions
  zsh-history-substring-search
)
```

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
plugins=(其他的插件 zsh-syntax-highlighting)
```
```bash
git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search
```

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
plugins=(其他的插件 zsh-autosuggestions)
```
#### theme
[powerlevel10k](https://github.com/romkatv/powerlevel10k)

git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
git clone --depth=1 https://gitee.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

```bash
cat .zshrc | grep THEME
ls ~/.oh-my-zsh/themes //可查看当前已安装的主题
ZSH_THEME="agnoster"  robbyrussell
ZSH_THEME="powerlevel10k/powerlevel10k"
```

powerlevel10k emoji 
``` bash
typeset -g POWERLEVEL9K_DIR_CLASSES=(
    "/etc|/etc/*|*config*" ETC ⚙️ 
    "~" HOME  
    "~/*" HOME_SUBFOLDER  
    "*" DEFAULT  
  )
  typeset -g POWERLEVEL9K_ANACONDA_VISUAL_IDENTIFIER_EXPANSION=' '
  typeset -g POWERLEVEL9K_TIME_VISUAL_IDENTIFIER_EXPANSION=' '
  # typeset -g POWERLEVEL9K_VCS_UNTRACKED_ICON='❓'
  typeset -g POWERLEVEL9K_COMMAND_EXECUTION_TIME_VISUAL_IDENTIFIER_EXPANSION='⌛'
  typeset -g POWERLEVEL9K_CONTEXT_PREFIX='  '
  typeset -g POWERLEVEL9K_TIME_PREFIX=''
  typeset -g POWERLEVEL9K_STATUS_OK_VISUAL_IDENTIFIER_EXPANSION='✔️'
  typeset -g POWERLEVEL9K_STATUS_OK_PIPE_VISUAL_IDENTIFIER_EXPANSION='✔️'
  typeset -g POWERLEVEL9K_STATUS_ERROR_VISUAL_IDENTIFIER_EXPANSION='✘'
  typeset -g POWERLEVEL9K_STATUS_ERROR_SIGNAL_VISUAL_IDENTIFIER_EXPANSION='✘'
  typeset -g POWERLEVEL9K_STATUS_ERROR_PIPE_VISUAL_IDENTIFIER_EXPANSION='✘'
  typeset -g POWERLEVEL9K_TIME_FORMAT='%D{%b-%d %H:%M}'
  typeset -g POWERLEVEL9K_VCS_PREFIX=''
  typeset -g POWERLEVEL9K_LOCK_ICON=' '
  typeset -g POWERLEVEL9K_COMMAND_EXECUTION_TIME_PREFIX=''
```