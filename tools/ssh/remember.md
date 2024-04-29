## 多个 ssh key

#### 创建一个名为config的文件在~/.ssh，将以下配置粘贴保存。

```sh
# coding
Host *.coding.net
  HostName e.coding.net
  HostkeyAlgorithms +ssh-rsa
  PubkeyAcceptedAlgorithms +ssh-rsa
  IdentityFile ~/.ssh/coding_rsa

# github
Host github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/github_rsa
```

#### 如果是修改过密钥的名称，不仅需要在config中修改路径，还得需要执行以下命令：
```sh
# ssh agent 程序可以根据配置自动加载并管理这些密钥
ssh-agent bash
# `ssh-add` 命令将某个私钥交给 ssh-agent 保管
ssh-add -k ~/.ssh/github_rsa
# 显示ssh-agent中的密钥
ssh-add -l
```
#### 验证是否生效
ssh -T git@github.com
