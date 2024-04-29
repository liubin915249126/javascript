Host len.liu git.bybit.com
    HostName git.bybit.com
    IdentityFile ~/.ssh/id_rsa # private key for realname
    User len.liu@yijinin.com

Host len.liu code.bydev.io
    HostName code.bydev.io
    IdentityFile ~/.ssh/id_rsa # private key for realname
    User len.liu@yijinin.com    

Host liubin  github.com
    HostName github.com
    IdentityFile ~/.ssh/github-rsa  # different private key for realname2
    User 915249126@qq.com


IdentityFile ~/.ssh/id_rsa
IdentityFile ~/.ssh/id_rsa_old
IdentityFile ~/.ssh/id_ed25519

vi ~/.ssh/config

source  ~/.ssh/config
[referer](https://stackoverflow.com/questions/2419566/best-way-to-use-multiple-ssh-private-keys-on-one-client)


Host liubin  github.com
    HostName github.com
    IdentityFile ~/.ssh/id_rsa
    User 915249126@qq.com

Host liubin  code.qqtcs.com
    HostName code.qqtcs.com
    IdentityFile ~/.ssh/id_rsa1
    User 915249126@qq.com    


IdentityFile ~/.ssh/id_rsa
IdentityFile ~/.ssh/id_rsa1

