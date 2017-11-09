## 用SVG连接两个div的直线，拖动实时改变位置
![效果图](https://github.com/liubin915249126/javascript/blob/master/SVG/image/svgDrag.gif)
用d3.js动态添加 path,line 节点，并动态修改节点属性

#### 1.产品经理提出的需求
>
  用带箭头的虚线将两个位置不固定的div连接起来,初听到这个需求一头雾水，传统的div可以做直线，但斜起来不太好做，幸亏之前接触过svg,里面有一个line标签，知道起始中止两个点的位置，就可以将两个点连接起来了。
  至于箭头,可以这么做先定义箭头：
  ```
        <svg>
            <defs>
                <marker id="arrow" markerUnits="strokeWidth" markerWidth="12" markerHeight="12" viewBox="0 0 12 12" refX="6" refY="6" orient="auto">
                    <path xmlns="http://www.w3.org/2000/svg" d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill: #000000;" />
                </marker>
            </defs>
        </svg>
  ```
  将箭头放在直线上：marker-end="url(#arrow)"
  ```
     <line  x1="0" y1="0" x2="200" y2="50" stroke="#000" stroke-width="2" marker-end="url(#arrow)"stroke-dasharray="10,10"></line> 
  ```
>
#### 2.确定起始中止两个点位置
>
  需要连接的两个div及SVG都相对于某一个div.wrap绝对定位，
>
