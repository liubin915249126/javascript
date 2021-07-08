// 判断括号是否匹配

// 方法一思路分析：

// 首先从头到尾遍历整个字符串；
// 当遇到字符"("则入栈，遇到字符")"则出栈；
// 出栈时，如果栈已经为空，则返回 false；
// 当字符串遍历完毕以后，判断栈是否为空。

// 方法二思路分析：

// 声明变量 num 为 0，并从头到尾遍历整个字符串；
// 当遇到字符"("则 num 加 1，遇到字符")"num 减 1；
// 在遍历的过程中，当 num 减 1 时，num 的值已经为 0 则返回 false；
// 当字符串遍历完毕以后，判断 num 是否为 0。

// 方式一：栈

function isPairing(str = '') {

    const stack = new Stack();

    for(let i of str) {

        if (i === '(') {

            stack.push(i);

        } else if (i === ')') {

            if (stack.isEmpty()) {

                return false;

            } else {

                stack.pop();

            }

        }

    }

    return stack.size() === 0;

}



// 方式二：计数

function isPairing(str = '') {

    let num = 0;

    for(let i of str) {

        if (i === '(') {

            num++;

        } else if (i === ')') {

            if (num === 0) {

                return false;

            } else {

                num--;

            }

        }

    }

    return num === 0;

}