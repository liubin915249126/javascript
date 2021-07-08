export const arrayToTree=(items) => {
    const result = [];   // 存放结果集
    const itemMap = {};  // 
    for (const item of items) {
      const id = item.id;
      const pid = item.pid;
  
      if (!itemMap[id]) {
        itemMap[id] = {
          children: [],
        }
      }
  
      itemMap[id] = {
        ...item,
        children: itemMap[id]['children']
      }
  
      const treeItem =  itemMap[id];
  
      if (pid === 0) {
        result.push(treeItem);
      } else {
        if (!itemMap[pid]) {
          itemMap[pid] = {
            children: [],
          }
        }
        itemMap[pid].children.push(treeItem)
      }
  
    }
    return result;
  }
  