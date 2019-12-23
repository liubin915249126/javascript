#### 请求并上传
```js
   http.get(encodeURI(local + index), (sres) => {
          if (sres.statusCode !== 200) {
          }
          var datas = [];
          var size = 0;
          sres.on('data', function(data){
            datas.push(data);
            size += data.length;
        })
        sres.on('end', function(data){
            var buff = Buffer.concat(datas, size);
            var pic = buff.toString('base64');
          client.upload(buff, {
              key:index
            }, function (err, result) {
              if (err) {
                res.status(200).send({
                  subCode: 1,
                  msg: '上传失败'
                });
              } else {
                result.picRealurl = bucketManger.privateDownloadUrl(qiniconfig.origin, result.key, qiniconfig.timeout)
                res.status(200).send({
                  subCode: 0,
                  data: result
                })
              }
              // result.signatrueData = req.files[0]
            })
        })
        })
```