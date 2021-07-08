#### HTTP 如何实现长连接？在什么时候会超时？

HTTP 如何实现长连接？

HTTP 分为长连接和短连接，其实本质上说的是 TCP 的长短连接。TCP 连接是一个双向的通道，它是可以保持一段时间不关闭的，因此 TCP 连接才有真正的长连接和短连接这一个说法。
长连接是指的是 TCP 连接，而不是 HTTP 连接。
TCP 长连接可以复用一个 TCP 连接来发起多次 HTTP 请求，这样可以减少资源消耗，比如一次请求 HTML，短连接可能还需要请求后续的 JS/CSS/图片等

要实现 HTTP 长连接，在响应头设置 Connection 为 keep-alive，HTTP1.1 默认是长连接，而 HTTP 1.0 协议也支持长连接，但是默认是关闭的。
在什么时候会超时呢？

HTTP 一般会有 httpd 守护进程，里面可以设置 keep-alive timeout，当 tcp 链接闲置超过这个时间就会关闭，也可以在 HTTP 的 header 里面设置超时时间
TCP 的 keep-alive 包含三个参数，支持在系统内核的 net.ipv4 里面设置：当 TCP 连接之后，闲置了 tcp_keepalive_time，则会发生侦测包，如果没有收到对方的 ACK，那么会每隔 tcp_keepalive_intvl 再发一次，直到发送了 tcp_keepalive_probes，就会丢弃该连接。

tcp_keepalive_intvl = 15
tcp_keepalive_probes = 5
tcp_keepalive_time = 1800
