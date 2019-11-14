Promise.resolve(1)
  .then(x => x + 1)
  .then(x => {
    throw new Error('My Error')
  })
  .catch(() => 1)
  .then(x => x + 1)
  .then()
  .then(x => console.log(x)) //2
  .catch(console.error)