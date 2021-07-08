// 判断 HTML 标签是否匹配

// 思路分析：

// 声明变量 stack、nodes；并从头遍历 HTML 字符串，查找字符"<"的位置；

// 如果字符"<"的位置等于 0：

// 则继续尝试匹配 HTML 结束标签，匹配成功并且与栈顶的标签名称一致，则弹出栈顶；否则报错；
// 匹配 HTML 结束标签失败以后，则尝试匹配开始标签的起始部分，然后循环匹配标签属性对，最后匹配开始标签的结束部分。匹配完成以后，将匹配到的标签压入栈顶；并构建 node 节点数；

// 如果字符"<"的位置大于 0：

// 则 html.slice(0, pos)，创建文本节点。

function parseHtml(html = "") {
  const startIndex = 0;

  const endIndex = 0;

  // 匹配标签<div>、<br/>等标签的开始部分"<div、<br"

  const startTagOpen = /^<([a-zA-Z\d]+)/;

  // 匹配标签<div>、<br/>等标签的闭合部分">、/>"

  const startTagClose = /^\s*(\/?)>/;

  // 匹配属性

  const attribute = /^\s*([\w-]+)(?:="([^"]*)")?\s*/;

  // 匹配闭合标签，例如</div>、</p>

  const endTag = /^<\/([a-zA-Z\d]+)>/;

  const stack = [];

  const nodes = [];

  while (html) {
    // 查找<的起始位置

    const index = html.indexOf("<");

    if (index === 0) {
      // 先匹配整体结束标签，例如</div>、</p>

      let endTagMatch = html.match(endTag);

      if (endTagMatch) {
        if (stack[stack.length - 1]) {
          if (stack[stack.length - 1].tag === endTagMatch[1]) {
            // 出栈

            stack.pop();

            advanced(endTagMatch[0].length);

            continue;
          } else {
            throw new Error(
              `起始标签和结束标签不匹配: 起始标签（${
                stack[stack.length - 1].tag
              }），结束标签（${endTagMatch[0]}）`
            );
          }
        } else {
          throw new Error(`${endTagMatch[0]}没有起始标签`);
        }
      }

      // 然后匹配起始标签的开始部分，例如<div>的<div、<p>的<p、<br/>的<br

      let startTagOpenMatch = html.match(startTagOpen);

      if (startTagOpenMatch) {
        const node = {
          nodeType: 1,

          tag: startTagOpenMatch[1],

          attrs: [],

          children: [],
        };

        advanced(startTagOpenMatch[0].length);

        let end, attr;

        // 匹配标签属性列表

        while (
          !(end = html.match(startTagClose)) &&
          (attr = html.match(attribute))
        ) {
          advanced(attr[0].length);

          node.attrs.push({
            name: attr[1],

            value: attr[2],
          });
        }

        // 匹配起始标签的结束部分

        if (end) {
          if (stack.length === 0) {
            nodes.push(node);
          } else {
            stack[stack.length - 1].children.push(node);
          }

          // 自闭和标签不加入栈中

          if (end[1] !== "/") {
            stack.push(node);
          }

          advanced(end[0].length);
        }
      }
    } else {
      // 文本

      const node = {
        nodeType: 3,

        textContent: html.slice(0, index),
      };

      if (stack.length === 0) {
        nodes.push(node);
      } else {
        stack[stack.length - 1].children.push(node);
      }

      advanced(node.textContent.length);
    }
  }

  function advanced(n) {
    html = html.substring(n);
  }

  return nodes;
}

parseHtml('<div id="test" class="a b"></div>');

parseHtml('<div id="test" class="a b">Hello World</div>');

parseHtml('开始<div id="test" class="a b">Hello World</div>');

parseHtml('<div id="test" class="a b"><br class="br" />Hello World</div>');

parseHtml("</div>");

parseHtml("<div></p>");
