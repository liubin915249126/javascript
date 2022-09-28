# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH
ZSH_DISABLE_COMPFIX=true
# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"


ZSH_THEME="bullet-train"


plugins=(
  git
  zsh-autosuggestions
  zsh-history-substring-search
  zsh-syntax-highlighting  # 添加插件
)

# . /usr/share/autojump/autojump.sh
source $ZSH/oh-my-zsh.sh
source $HOME/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source $ZSH_CUSTOM/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
# eval $(thefuck --alias)


# 快捷键
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'
alias sa='source /home/venv_sp/bin/activate'
alias nf='neofetch'
alias up='unset https_proxy  && unset http_proxy'
alias py='python'
alias h='fc -il 1'
alias su='sudo su'
alias e='dde-file-manager'
alias msq='mycli -uroot -proot'
alias gg='git log'
alias mgd='mongod &'
alias kg8='fuser -k -n tcp 8000'
alias ydl='youtube-dl'
alias yg='you-get'
alias src='source ~/.zshrc'
alias vz='vim ~/.zshrc'
alias sai='sudo apt install'
alias sdi='sudo dpkg -i'
export TIME_STYLE='+%Y-%m-%d %H:%M:%S'

# 终端代理
proxy () {
  export http_proxy="http://127.0.0.1:12345"
  export https_proxy="http://127.0.0.1:12345"
  echo "HTTP 代理已启用"
}

# 关闭终端代理
up () {
  unset http_proxy
  unset https_proxy
  echo "HTTP 代理已关闭"
}

# pyenv配置
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"

# node.js配置
export NODE_HOME=/opt/soft/src/node-v14.16.0-linux-x64/bin
export PATH=$NODE_HOME:$PATH

