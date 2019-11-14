async function test1() {
    await new Promise(resolve=>{
      setTimeout(()=>resolve(),0)
    })
    setTimeout(() => console.log(2), 0);
    new Promise(resolve => {
      console.log(3);
      resolve()
    }).then(() => {
      console.log(4);
    });
    console.log(5);
  }
  test1();
  console.log(6)