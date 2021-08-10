// 有效的二叉搜索树
// 有效的二叉搜索树 (BST) 具有所有值小于父节点的左子节点，以及值大于父节点的所有右子节点。

// 定义当前节点可以具有的最小值和最大值
// 如果节点的值不在这些范围内，则返回 false
// 递归验证节点的左孩子，最大边界设置为节点的值
// 递归验证节点的右孩子，最小边界设置为节点的值

const isValidBST = (root) => {
    const helper = (node, min, max) => {
        if (!node) return true
        if (node.val <= min || node.val >= max) return false
        return helper(node.left, min, node.val) && helper(node.right, node.val, max)
    }
    return helper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
}


// 如何找到二叉树最大深度
const maxDepth = function(root) {
    const calc = (node) => {
        if (!node) return 0
        return Math.max(1 + calc(node.left), 1 + calc(node.right))
    }
    return calc(root)
};

// 如何找到两个树节点之间的最小公共祖先
// 验证是否在左子树或右子树中找到 p 或 q
// 然后，验证当前节点是 p 还是 q
// 如果在左子树或右子树中找到 p 或 q 之一，并且 p 或 q 之一是节点本身，我们就找到了 LCA
// 如果在左子树或右子树中都找到了 p 和 q，我们就找到了 LCA

const lowestCommonAncestor = function(root, p, q) {
    let lca = null
    const isCommonPath = (node) => {
        if (!node) return false
        var isLeft = isCommonPath(node.left)
        var isRight = isCommonPath(node.right)
        var isMid = node == p || node == q
        if (isMid && isLeft || isMid && isRight || isLeft && isRight) {
            lca = node
        }
        return isLeft || isRight || isMid
    }
    isCommonPath(root)
    return lca
};
