// class
const checkNew = function (instance, con) {
    if (!(instance instanceof con)) {
        throw new TypeError(`Class constructor ${con.name} cannot be invoked without 'new'`);
    }
};
const defineProperties = function (target, obj) {
    for (const key in obj) {
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: false,
            value: obj[key],
            writable: true
        });
    }
};
const createClass = function (con, proto, staticAttr) {
    proto && defineProperties(con.prototype, proto);
    staticAttr && defineProperties(con, staticAttr);
    return con;
};

// 用法
function Person (name) {
    checkNew(this, Person);
    this.name = name;
}
var PersonClass = createClass(Person, {
    getName: function () {
        return this.name;
    }
}, {
    getAge: function () {}
});
