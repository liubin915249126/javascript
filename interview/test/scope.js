let a = 3;
function func(a) {
  a = 10;
  console.log(a);
}
func();
console.log(a);