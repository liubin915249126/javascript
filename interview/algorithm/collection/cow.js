// 一个农夫，买了一头小牛，这头牛，成长到第四年开始，会每年生一头小牛，所生出来的小牛成长到第四年开始，也会每年生出一头小牛，请问 N 年之后，农夫共有多少头牛？
// 不考虑其他情况

class Cow {
  constructor() {
    this.age = 1
  }
  addAge() {
    this.age++
  }
  isCanBirth() {
    return this.age >= 4;
  }
}

function init(year) {
  let arr = [new Cow()];
  for(let i = 1; i <= year; i++) {
    for(let j = 0; j < arr.length; j ++) {
      let cow = arr[j];
      if(cow.isCanBirth()) {
        arr.push(new Cow())
      } else {
        cow.addAge()
      }
    }
    console.log(`第${i}年，有${arr.length}个牛`)
  }
}

init(10)
