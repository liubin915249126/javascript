// 给你一个整数数组  flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花。另有一个数 n
// ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false。

// flowerbed = [1,0,0,0,1], n = 1

const flowers = () => {
  let curCount = 0,
    len = flowerbed.length;
  for (let i = 0; i < len; i++) {
    let ele = flowerbed[i];
    if (ele == 0) {
      if (
        (flowerbed[i - 1] == undefined || flowerbed[i - 1] == 0) &&
        (flowerbed[i + 1] == undefined || flowerbed[i + 1] == 0)
      ) {
        curCount++;
        flowerbed[i] = 1;
      }
    }
  }

  if (curCount >= n) {
    return true;
  } else {
    return false;
  }
};
