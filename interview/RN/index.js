async function test1() {
    await new Promise(resolve=>{
      setTimeout(()=>resolve(),0)
    }).then(()=>console.log(1))
    setTimeout(() => console.log(2), 0);
    new Promise(resolve => {
      console.log(3);
      resolve()
    }).then(() => {
      console.log(4);
    });
    console.log(5);
  }
  test1().then(()=>{
    console.log(7)
  });
  console.log(6)