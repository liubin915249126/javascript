function reverse(list) {
  var p = list.head,
    q = null;
  while (p.next !== null) {
    q = p.next;
    p.next = q.next;
    q.next = list.head.next;
    list.head.next = q;
  }
  return list;
}

// 定义两个指针P，Q；
// Q是P的next；
// 贯穿的思想是将P后面的一个插入到Head之后，后面的连接起来；
// 前提是P的后一个非空