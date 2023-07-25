const fs = require('fs');
const exif = require('exif');
 
// 读取图片文件
const imageBuffer = fs.readFileSync('./img/img1.jpg');
 
// 解析图片的元信息
const imageMetaData = exif(imageBuffer);
 
// 输出元信息
console.log(imageMetaData);