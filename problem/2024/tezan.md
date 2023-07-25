/\*\*

- 背景：前端在遇到多文件上传时会遇到异步任务的并发控制问题，比如上传 10 个文件，最多允许同时上传 3 个
- 问题：实现一个通用的并发控制方法, 可以控制并发数量
  \*/

interface Option<D> {
data: D[]; //需要处理的数据
mapper: (item: D, index: number, data?: D[]) => Promise<void>; // 处理每个数据的方法
concurrency: number; // 并发数量
}
/\*\*

-
- @param options Option
- @returns Promise
  \*/
  async function concurrently<D>(options: Option<D>): Promise<void> {
  // 在这里实现

}

interface DataItem {
data: number;
timeout: number;
}

function upload(item: DataItem) {
return new Promise<DataItem["data"]>((resolve) => {
setTimeout(() => {
resolve(item.data);
}, item.timeout);
});
}

const testData: DataItem[] = [
{ data: 0, timeout: 390 },
{ data: 1, timeout: 920 },
{ data: 2, timeout: 640 },
{ data: 3, timeout: 50 },
{ data: 4, timeout: 420 },
{ data: 5, timeout: 320 },
{ data: 6, timeout: 700 },
{ data: 7, timeout: 720 },
{ data: 8, timeout: 300 },
{ data: 9, timeout: 390 },
];

const processedList = [];
const expectProcessedList = [0, 3, 2, 4, 1, 5, 8, 6, 7, 9];

concurrently<DataItem>({
data: testData,
mapper: (item: DataItem) => {
return upload(item).then((data) => {
processedList.push(data);
});
},
concurrency: 3,
}).then(() => {
console.log("processedList:", processedList);
console.log(
"expect true:",
processedList.join() === expectProcessedList.join()
);
});
