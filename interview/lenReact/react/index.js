const createElement = (type, attrs, ...children) => {
    const props = {
         //直接添加到props
        ...config,
        //区分对象还是文本节点
        children:children.map((child)=>typeof child ==='object'?child:createElementText(child))
    }
    return{
        type,
        props
    }
}
const createElementText = (child) => {
    return{
        type:"TEXT",
        props:{
            children:[],
            nodeValue:child
        }
    }
}
const lenReact = {
    createElement
}

export default lenReact;