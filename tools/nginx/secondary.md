## 前后端分离nginx配置二级域名

- 前端路由统一加上 /admin/
- publicPath -> /admin/
- 部署时，通过NGINX的反向代理
  - 首先，给需要部署的项目定义一个 NGINX 的 server
    ```conf
       server {
        listen 8001;
        location / {
            # vue h5 history mode 时配置
            try_files $uri $uri/ /index.html;
    
            root /home/html/travel_admin/dist;
            index index.html index.htm;
        }

    }
    ```
    - 再到配置域名的主配置server上做反向代理
    ```conf
       server {
        listen 80;
        server_name web.zjj7.com;
        location / {
            # 这里是根目录的项目
            try_files $uri $uri/ /index.html;
            root /home/html/travel/dist;
            index index.html index.htm;
        }
　　　　　# 这里是需要部署的二级目录应用配置
        location ^~/admin/ {
          proxy_redirect off;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_pass http://127.0.0.1:8001/;
        }
    }
    ```