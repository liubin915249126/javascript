// main.js（主线程）
const myWorker = new Worker('/worker.js'); // 创建 worker

myWorker.addEventListener('message', e => {
    console.log(e.data);
    myWorker.terminate(); // 关闭 worker
});

myWorker.postMessage('Greeting from Main.js');


// worker.js（worker线程）

self.addEventListener('message', e => {

    postMessage('Greeting from Worker');
    
    setTimeout(() => {
        console.log('setTimeout run');
        postMessage('Greeting from SetTimeout');
    });
    
    Promise.resolve().then(() => {
        console.log('Promise run');
        postMessage('Greeting from Promise');
    })
    
    for (let i = 0; i < 1001; i++) {
        if (i === 1000) {
            console.log('Loop run');
            postMessage('Greeting from Loop');
        }
    }
    
});