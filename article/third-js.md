一般来说，引入第三方库有一下三种情况：

1.  通过CDN引入；
2.  通过npm 安装并引入；
3.  第三方js文件就在本地

通过CDN
-----

这是最简单的一种方式，例如引入高德地图，可以直接把以下代码放在index.html文件底部，这种情况与webpack无关，因为webpack的入口文件并不在此处

    <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.8&key=您申请的key值"></script>
    

npm
---

通过npm install安装的包会放在node modules文件夹下，当使用时，可以直接在用到的文件顶部引入进来，例如import或者require。但如果每个模块化的文件都会用到，那么每个文件都要去引入这个第三方文件，很繁琐，这时候就可以用webpack的插件：[ProvidePlugin](https://link.zhihu.com/?target=https%3A//webpack.docschina.org/plugins/provide-plugin/)，可以理解这个插件的作用就是把第三方库引入，且它的作用域是全局的。  
例如引入jquery

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'})
    

那么就可以用$和jQuery了，它们两个都表示jquery，需注意的是$和jQuery后面的值（jquery）必须和npm install jquery中的jquery保持一致，不然会找不到。

本地JS库文件
-------

会有这么一种情况：第三方的js文件就在本地，怎么通过webpack引入呢？比如第二种jquery的情况，

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'})
    

这样写肯定会找不到jquery了，因为它并不在node modules中，这时可以用webpack配置中的[resolve](https://link.zhihu.com/?target=https%3A//webpack.docschina.org/configuration/resolve/%23resolve)选项，给jquery指定一个别名，并配置其路径。  
假如我们的jquery.js文件放在dist文件夹下面

    resolve:{
        alias: {
          $: path.resolve(__dirname, './dist/jquery.js'),
          jQuery: path.resolve(__dirname, './dist/jquery.js'),
        }
    }
    

这样就可以了。

通过loader
--------

除了ProvidePlugin这个插件，还有一个[imports-loader](https://link.zhihu.com/?target=https%3A//webpack.docschina.org/loaders/imports-loader/)可以完成引入第三方库的工作。  
test来指定哪个文件需要引入第三方库,通过options配置jquery。然后打包后可以看出，打包后的app.js文件变大了。

  

    module: {
            rules: [
                {
                    test: path.resolve(__dirname, "./src/app.js"),
                    use: "imports-loader"                options:{
                        $:'jquery'                }
                }
            ]
        }