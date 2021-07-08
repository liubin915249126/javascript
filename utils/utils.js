export const objToArr = (obj)=>{
    return Object.keys(obj).map(key =>({
      value:key,
      name:obj[key],
    }))
  }