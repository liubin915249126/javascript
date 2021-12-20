class A {
  print() {
    console.log("print a", this);
  }
}

class C extends A {
  print() {
    super.print();
    console.log("print c", this);
  }
}

const c = new C();
c.print();

class B {
  print = () => {
    console.log("print b",this);
  };
}
class D extends B {
  print() {
    super.print();
    console.log("print d");
  }
}
const d = new D();
d.print();
