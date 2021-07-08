function render(vDom, container) {
    let dom;
    // 检查当前节点是文本还是对象
    if(typeof vDom !== 'object') {
      dom = document.createTextNode(vDom)
    } else {
      dom = document.createElement(vDom.type);
    }
  
    // 将vDom上除了children外的属性都挂载到真正的DOM上去
    if(vDom.props) {
      Object.keys(vDom.props)
        .filter(key => key != 'children')
        .forEach(item => {
          dom[item] = vDom.props[item];
        })
    }
    
    // 如果还有子元素，递归调用
    if(vDom.props && vDom.props.children && vDom.props.children.length) {
      vDom.props.children.forEach(child => render(child, dom));
    }
  
    container.appendChild(dom);
  }