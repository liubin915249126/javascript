#### 热更新的触发的条件
devServer.hot 配置项为 true；
启用 inline 模式；
必须声明 module.hot.accept(url, callback);

#### loader plugin
```js
    class ReplacePlugin {
        constructor(option) { ...}

        apply(compiler) {
            compiler.hooks.compilation.tap('ReplacePlugin', (compilation, compilationParams) => {
                compilation.hooks.afterOptimizeAssets.tap('ReplacePlugin', (assets) => {
                    Object.keys(assets).forEach(key => {
                        assets[key] = new OriginalSource(assets[key].source().replace(/https:\/\/reactjs/, 'zjh'));
                    })
                });
            });
        }
    }
```

