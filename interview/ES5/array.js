Array.prototype.myForEach=function (fn,obj) {
    for(var i=0;i<this.length;i++){
        if(typeof obj=="undefined"){
            //obj没有传
            fn(this[i],i,this);
        }else {
            fn.call(obj,this[i],i,this);
        }
    }
};

Array.prototype.myEvery = function (fn,obj){
    const len = this.length;
    if(len===0){
        return true;
    }
    for(let i=0; i<len; i++){
      if(typeof obj=="undefined"){
        if(!fn(this[i],i,this)){
            return false
        }
      }else{
        if(fn.call(obj,this[i],i,this)){
            return false
        }
      }
    }
    return true
}

Array.prototype.mySome = function (fn,obj){
    const len = this.length;
    if(len===0){
        return true;
    }
    for(let i=0; i<len; i++){
      if(typeof obj=="undefined"){
        if(fn(this[i],i,this)){
          return true;
        }
      }else{
        if(fn.call(obj,this[i],i,this)){
          return true;
        }
      }
    }
    return false
}

const flag = [1,2,3,4].myEvery((item)=>{
    if(item==3){
        return false;
    }else{
        console.log(item,false)
        return true;
    }
})