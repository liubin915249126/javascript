## 责任链模式
```js
function order500(orderType,isPay,count){
    if(orderType == 1 && isPay == true)    {
        console.log("亲爱的用户，您中奖了100元红包了");
    }else {
        //我不知道下一个节点是谁,反正把请求往后面传递
        return "nextSuccessor";
    }
};
function order200(orderType,isPay,count) {
    if(orderType == 2 && isPay == true) {
        console.log("亲爱的用户，您中奖了20元红包了");
    }else {
        //我不知道下一个节点是谁,反正把请求往后面传递
        return "nextSuccessor";
    }
};
function orderNormal(orderType,isPay,count){
    // 普通用户来处理中奖信息
    if(count > 0) {
        console.log("亲爱的用户，您已抽到10元优惠卷");
    }else {
        console.log("亲爱的用户，请再接再厉哦");
    }
}
// 下面需要编写职责链模式的封装构造函数方法
var Chain = function(fn){
    this.fn = fn;
    this.successor = null;
};
Chain.prototype.setNextSuccessor = function(successor){
    return this.successor = successor;
}
// 把请求往下传递
Chain.prototype.passRequest = function(){
    var ret = this.fn.apply(this,arguments);
    if(ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor,arguments);
    }
    return ret;
}
//现在我们把3个函数分别包装成职责链节点：
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

// 然后指定节点在职责链中的顺序
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

//最后把请求传递给第一个节点：
chainOrder500.passRequest(1,true,500);  // 亲爱的用户，您中奖了100元红包了
chainOrder500.passRequest(2,true,500);  // 亲爱的用户，您中奖了20元红包了
chainOrder500.passRequest(3,true,500);  // 亲爱的用户，您已抽到10元优惠卷 
chainOrder500.passRequest(1,false,0);   // 亲爱的用户，请再接再厉哦
```
异步
```js
function Fn1() {
    console.log(1);
    return "nextSuccessor";
}
function Fn2() {
    console.log(2);
    var self = this;
    setTimeout(function(){
        self.next();
    },1000);
}
function Fn3() {
    console.log(3);
}
// 下面需要编写职责链模式的封装构造函数方法
var Chain = function(fn){
    this.fn = fn;
    this.successor = null;
};
Chain.prototype.setNextSuccessor = function(successor){
    return this.successor = successor;
}
// 把请求往下传递
Chain.prototype.passRequest = function(){
    var ret = this.fn.apply(this,arguments);
    if(ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor,arguments);
    }
    return ret;
}
Chain.prototype.next = function(){
    return this.successor && this.successor.passRequest.apply(this.successor,arguments);
}
//现在我们把3个函数分别包装成职责链节点：
var chainFn1 = new Chain(Fn1);
var chainFn2 = new Chain(Fn2);
var chainFn3 = new Chain(Fn3);

// 然后指定节点在职责链中的顺序
chainFn1.setNextSuccessor(chainFn2);
chainFn2.setNextSuccessor(chainFn3);

chainFn1.passRequest();  // 打印出1，2 过1秒后 会打印出3
```