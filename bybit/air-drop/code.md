#### 倒计时
```js
 counter() {
      const { appointedAt, startedAt, isAppointed } = this.airdropInfo || {};

      this.appionted = isAppointed;
      let interval = 500;
      // const dateScens = new Date().getTime();
      const func = () => {
        const dateScens1 = new Date().getTime();
        // 越接近循环判断的频率越大
        interval = parseInt(
          ((this.isBegin ? startedAt.valueOf() : appointedAt.valueOf() + 1)
              - dateScens1)
              / 50,
          10,
        ) || 4;
        // interval = parseInt((
        //   (this.isBegin ? dateScens + 8001 : dateScens + 4001)
        //    - dateScens1) / 10, 10) || 4;
        // console.log(111, interval);
        if (interval > 500) {
          interval = 500;
        }
        if (dayjs(dateScens1).isAfter(appointedAt)) {
          // 活动开始
          this.isBegin = true;
        }
        if (dayjs(dateScens1).isAfter(startedAt)) {
          // 活动结束
          this.isBegin = true;
          this.isEnd = true;
          clearInterval(this.timer);
        }
        clearInterval(this.timer);
        this.timer = setInterval(func, interval);
        // 活动结束清除最后一次定时器
        if (this.isEnd) {
          clearInterval(this.timer);
        }
      };
      this.timer = setInterval(func, interval);
    },
```