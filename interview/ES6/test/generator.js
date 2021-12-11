//准备
function prepare(sucess) {
    setTimeout(function () {
      console.log("prepare chicken");
      sucess();
    }, 500);
  }
  //流程控制
  function run(fn) {
    const gen = fn();
    function next() {
      //返回工序函数的句柄给result
      const result = gen.next();
      if (result.done) return; //结束
      // result.value就是yield返回的值，是各个工序的函数
      result.value(next); //next作为入参，即本工序成功后，执行下一工序
    }
    next();
  }
  //工序
  function* task() {
    yield prepare;
    yield prepare;
    yield prepare;
    yield prepare;
    yield prepare;
  }
  run(task); //开始执行