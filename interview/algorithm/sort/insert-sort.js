// 插入排序
// 平均复杂度：o(n^2)    空间复杂度：o(1)    稳定性：稳定
// 从左（右）侧开始遍历，视当前位置前（后）为有序部分，对当前元素进行插入
// 找到位置对有序部分进行元素移动，直到遍历完成
// 插入算法可以优化为 二分查找插入，提高比较效率

function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}