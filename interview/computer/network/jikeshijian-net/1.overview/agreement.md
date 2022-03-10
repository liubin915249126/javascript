## 协议
无类型域间选路，简称 CIDR
将 32 位的 IP 地址一分为二，前面是网络号，后面是主机号
10.100.122.2/24，这个 IP 地址中有一个斜杠，斜杠后面有个数字 24。这种地址表示形式，就是 CIDR。后面 24 的意思是，32 位中，前 24 位是网络号，后 8 位是主机号
子网掩码

#### MAC 地址   
在 IP 地址的上一行是 link/ether fa:16:3e:c7:79:75 brd ff:ff:ff:ff:ff:ff，这个被称为 MAC 地址，是一个网卡的物理地址，用十六进制，6 个 byte 表示。
<BROADCAST,MULTICAST,UP,LOWER_UP> net_device flags，网络设备的状态标识
UP 表示网卡处于启动的状态；BROADCAST 表示这个网卡有广播地址，可以发送广播包；MULTICAST 表示网卡可以发送多播包；LOWER_UP 表示 L1 是启动的，也即网线插着呢。MTU1500 是指什么意思呢？是哪一层的概念呢？最大传输单元 MTU 为 1500，这是以太网的默认值。

你知道 net-tools 和 iproute2 的“历史”故事吗？

#### IP
动态主机配置协议（Dynamic Host Configuration Protocol），简称 DHCP。
DHCP Discover
DHCP Offer
预启动执行环境（Pre-boot Execution Environment），简称 PXE。
