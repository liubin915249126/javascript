## 工厂模式
```js
   function CreatePerson(name,age,sex) {
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    obj.sayName = function(){
        return this.name;
    }
    return obj;
}
var p1 = new CreatePerson("longen",'28','男');
var p2 = new CreatePerson("tugenhua",'27','女');
console.log(p1.name); // longen
console.log(p1.age);  // 28
console.log(p1.sex);  // 男
console.log(p1.sayName()); // longen

console.log(p2.name);  // tugenhua
console.log(p2.age);   // 27
console.log(p2.sex);   // 女
console.log(p2.sayName()); // tugenhua

// 返回都是object 无法识别对象的类型 不知道他们是哪个对象的实列
console.log(typeof p1);  // object
console.log(typeof p2);  // object
console.log(p1 instanceof Object); // true
```
其成员对象的实列化推迟到子类中，子类可以重写父类接口方法以便创建的时候指定自己的对象类型。

父类只对创建过程中的一般性问题进行处理，这些处理会被子类继承，子类之间是相互独立的，具体的业务逻辑会放在子类中进行编写。
父类就变成了一个抽象类，但是父类可以执行子类中相同类似的方法，具体的业务逻辑需要放在子类中去实现；比如我现在开几个自行车店，那么每个店都有几种型号的自行车出售
```js
// 定义自行车的构造函数
var BicycleShop = function(name){
    this.name = name;
    this.method = function(){
        return this.name;
    }
};
BicycleShop.prototype = {
    constructor: BicycleShop,
    /*
     * 买自行车这个方法
     * @param {model} 自行车型号
    */
    sellBicycle: function(model){
            var bicycle = this.createBicycle(model);
            // 执行A业务逻辑
            bicycle.A();

            // 执行B业务逻辑
            bicycle.B();

            return bicycle;
        },
        createBicycle: function(model){
            throw new Error("父类是抽象类不能直接调用，需要子类重写该方法");
        }
    };
    // 实现原型继承
    function extend(Sub,Sup) {
        //Sub表示子类，Sup表示超类
        // 首先定义一个空函数
        var F = function(){};

        // 设置空函数的原型为超类的原型
        F.prototype = Sup.prototype; 

        // 实例化空函数，并把超类原型引用传递给子类
        Sub.prototype = new F();
                    
        // 重置子类原型的构造器为子类自身
        Sub.prototype.constructor = Sub;
                    
        // 在子类中保存超类的原型,避免子类与超类耦合
        Sub.sup = Sup.prototype;

        if(Sup.prototype.constructor === Object.prototype.constructor) {
            // 检测超类原型的构造器是否为原型自身
            Sup.prototype.constructor = Sup;
        }
    }
    var BicycleChild = function(name){
        this.name = name;
// 继承构造函数父类中的属性和方法
        BicycleShop.call(this,name);
    };
    // 子类继承父类原型方法
    extend(BicycleChild,BicycleShop);
// BicycleChild 子类重写父类的方法
BicycleChild.prototype.createBicycle = function(){
    var A = function(){
        console.log("执行A业务操作");    
    };
    var B = function(){
        console.log("执行B业务操作");
    };
    return {
        A: A,
        B: B
    }
}
var childClass = new BicycleChild("龙恩");
console.log(childClass);
```