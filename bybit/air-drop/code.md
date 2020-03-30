#### 倒计时
```js
  counter() {
      // const { appointedAt, startedAt, isAppointed } = this.airdropInfo || {};
      // this.appionted = isAppointed;
      let interval = 500;
      const dateScens = new Date().getTime();
      const func = () => {
        const dateScens1 = new Date().getTime();
        // 越接近循环判断的频率越大
        // interval = parseInt(
        //   ((this.isBegin ? startedAt.valueOf() : appointedAt.valueOf() + 1)
        //       - dateScens1)
        //       / 50,
        //   10,
        // ) || 4;
        interval = parseInt((
          (this.isBegin ? dateScens - 4001 : dateScens - 8001)
           - dateScens1) / 10, 10) || 4;

        if (interval > 500) {
          interval = 500;
        }
        if (interval < 4) {
          interval = 4;
        }

        console.log(111, interval, this.timer);
        if (dayjs(dateScens1).isAfter(dateScens - 8001)) {
          // 活动开始
          this.isBegin = true;
        }
        if (dayjs(dateScens1).isAfter(dateScens - 4001)) {
          // 活动结束
          this.isBegin = true;
          this.isEnd = true;
        }
        clearInterval(this.timer);
        this.timer = setInterval(func, interval);
        if (this.isEnd) {
          clearInterval(this.timer);
        }
      };
      this.timer = setInterval(func, interval);
    },
```