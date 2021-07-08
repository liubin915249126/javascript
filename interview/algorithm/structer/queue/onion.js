function createApp() {
  return {
    use(fn) {},

    run() {},
  };
}

const app = createApp();

app.use((next) => {
  setTimeout(function () {
    next();
  });

  console.log(new Date(), "1");
});

app.use((next) => {
  console.log(new Date(), "2");

  next();
});

app.use((next) => {
  console.log(new Date(), "3");

  next();
});

app.run();
