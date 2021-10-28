	// 1.创建一个名为test.js的worker文件，放到test.html相同目录下:
    var sum = 0; //声明全局变量，下面计时器中sum才能完成不断自加：
    
    setInterval(function() {
        sum++;
        postMessage(sum); //2.将sum发送给worker对象
        console.log("111")
    }, 1000);
