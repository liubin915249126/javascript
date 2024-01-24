const reverse = (linkedList) =>
{
    const arr = [linkedList.header]
    const next = linkedList.next
    while (linkedList.next)
    {
        arr.push(next)
        next=  next.next
    }
    linkedList.header = arr[arr.length - 1]
    arr.reverse().forEach(item =>
    {
        linkedList.next = item
    })
    return linkedList
}