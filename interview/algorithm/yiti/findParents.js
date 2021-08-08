// 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

const data = [
  {
    id: "1",
    name: "test1",
    children: [
      {
        id: "11",
        name: "test11",
        children: [
          {
            id: "111",
            name: "test111",
          },
          {
            id: "112",
            name: "test112",
          },
        ],
      },
      {
        id: "12",
        name: "test12",
        children: [
          {
            id: "121",
            name: "test121",
          },
          {
            id: "122",
            name: "test122",
          },
        ],
      },
    ],
  },
];

function bfs(target, id) {
  const quene = [...target];
  do {
    const current = quene.shift();
    if (current.children) {
      quene.push(
        ...current.children.map((x) => ({
          ...x,
          path: (current.path || current.id) + "-" + x.id,
        }))
      );
    }
    if (current.id === id) {
      return current;
    }
  } while (quene.length);
  return undefined;
}

function dfs(target, id) {
  const stask = [...target];
  do {
    const current = stask.pop();
    if (current.children) {
      stask.push(
        ...current.children.map((x) => ({
          ...x,
          path: (current.path || current.id) + "-" + x.id,
        }))
      );
    }
    if (current.id === id) {
      return current;
    }
  } while (stask.length);
  return undefined;
}

// 公共的搜索方法，默认bfs
function commonSearch(target, id, mode) {
  const staskOrQuene = [...target];
  do {
    const current = staskOrQuene[mode === "dfs" ? "pop" : "shift"]();
    if (current.children) {
      staskOrQuene.push(
        ...current.children.map((x) => ({
          ...x,
          path: (current.path || current.id) + "-" + x.id,
        }))
      );
    }
    if (current.id === id) {
      return current;
    }
  } while (staskOrQuene.length);
  return undefined;
}

console.log(commonSearch(data, "122"));
