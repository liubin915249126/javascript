var lowestCommonAncestor = function(root, p, q) {
    if (root === null || root === p || root === q) {
        return root;
    }

    let x = lowestCommonAncestor(root.left,p,q);
    let y = lowestCommonAncestor(root.right,p,q);

    if (x && y) {
        return root;
    } else {
        return x || y;   // 返回存在的那一个
    }
};


// 先遍历二叉树的所有节点，用Map保存每个子节点的父节点。
// 使用Map，遍历p的所有父节点，将其保存在Set中。
// 遍历q的所有父节点，当父节点第一次存在于Set中时，其就是最近公共祖先。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
// 保存每个节点的父节点
let parentMap = new Map();

// 递归遍历所有节点，并保存其父节点
function dfs(node) {
  if (node.left) {
    // 如果子节点存在，则将其父节点保存到Map中
    parentMap.set(node.left, node);
    // 继续递归遍历子节点
    dfs(node.left);
  }
  if (node.right) {
    parentMap.set(node.right, node);
    dfs(node.right);
  }
}
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  dfs(root); // 遍历二叉树的所有节点，保存其子父关系

  // 用Set保存p的所有父节点
  let visitedSet = new Set();

  // 遍历并保存所有p的父节点
  while (p) {
    // 每次遍历的p都是一个父节点，将其保存到Set中
    visitedSet.add(p);
    // 不断在Map中查找p的父节点，并将其更新到p，用于下一次遍历
    p = parentMap.get(p);
  }

  // 遍历q的父节点，如果父节点已在visitedSet中保存过，则它就是最近公共祖先
  while (q) {
    // 当第一次发现q在visitedSet中，那么它就是最近公共祖先，将其返回即可
    if (visitedSet.has(q)) {
      return q;
    }
    // 每次遍历都查找q的父节点，并将其更新，继续循环
    q = parentMap.get(q);
  }
};
