// 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。
// 判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。
// 如果存在，返回 true ；否则，返回 false 。
// 叶子节点 是指没有子节点的节点。

const hasPathSum = (root, sum) => {
    if (root == null) { // 遍历到null节点
      return false;
    }                
    if (root.left == null && root.right == null) { // 遍历到叶子节点
      return sum - root.val == 0;                  // 如果满足这个就返回true。否则返回false
    }
    // 不是上面的情况，则拆成两个子树的问题，其中一个true了就行
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val); 
  }
  
// https://leetcode.cn/problems/path-sum/