export const objToArr = (obj)=>{
    return Object.keys(obj).map(key =>({
      value:key,
      name:obj[key],
    }))
  }

export const  downLoadFile = (res)=>{
  const blob = res.blob()
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = "filename.xlsx";
  a.click();
}