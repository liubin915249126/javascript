class Set1 {
  constructor(arr = []) {
    this.size = 0;
    this.obj = new Map();
    if (arr.length) {
      arr.forEach((item) => this.add(item));
    }
  }

  add(val) {
    if (this.has(val)) return false;
    this.obj.set(val, val);
    this.size++;
    return true;
  }

  has(val) {
    //这里有2个细节   NaN===NaN 是false的   所以要用es6 的Object.is处理，这里还有+0 和-0的处理，你们自己可以研究下，哈哈
    let flag = false;
    for (let [key, item] of this.obj.entries()) {
      if (isNaN(val)) {
        if (Object.is(val, item)) {
          flag = true;
        }
      } else {
        if (val === item) {
          flag = true;
        }
      }
    }
    return flag;
  }

  delete(val) {
    if (this.has(val)) {
      this.obj.delete(val);
      this.size--;
      return true;
    }
    return false;
  }

  clear(val) {
    this.size = 0;
    this.obj = {};
  }

  keys() {
    return this.obj.values();
  }

  values() {
    return this.obj.values();
  }

  forEach(fn, that = this) {
    for (let [key, item] of this.obj.entries()) {
      fn.call(that, item, item, this.this.obj);
    }
  }
}

class Map1 {
  constructor() {
    this.size = 0;
    this.obj = {};
  }

  set(key, val) {
    this.obj[key] = val;
    this.size++;
  }

  get(key) {
    return this.obj[key];
  }

  has(key) {
    return this.obj.hasOwnProperty(key);
  }

  delete(key) {
    if (this.has(key)) {
      delete this.obj[key];
      this.size--;
      return true;
    }
    return false;
  }

  clear() {
    this.size = 0;
    this.obj = {};
  }

  forEach(fn, that = this) {
    for (let i = 0; i < this.size; i++) {
      let key = Object.keys(this.obj)[i];
      let value = this.obj[key];
      fn.call(that, value, key, this.obj);
    }
  }

  values() {
    return Object.values(this.obj);
  }

  keys() {
    return Object.keys(this.obj);
  }
}
