function ts (gen) {
    if (typeof gen === 'function') gen = gen();
    if (!gen || typeof gen.next !== 'function') return;
    (function next() {
        const start = performance.now();
        let res = null;
        do {
            res = gen.next();
        } while(!res.done && performance.now() - start < 25)
        if (res.done) return;
        setTimeout(next);
    })();
}

// 用法
ts(function* () {
    const start = performance.now();
    while (performance.now() - start < 1000) {
        yield;
    }
    console.log('done!');
});
