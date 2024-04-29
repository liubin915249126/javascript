#### 
``` js
    async function clientRoute(ctx, next) {
        let _renderProps

        match({routes, location: ctx.url}, (error, redirectLocation, renderProps) => {
            _renderProps = renderProps

        if (_renderProps) {
            await ctx.render('index', {
                root: renderToString(
        })
                    <Provider store={store}>
                        <RouterContext {..._renderProps}/>
                    </Provider>
                ),
                state: store.getState()
            })
        } else {
            await next()
        }
    }
```

```js
    import express from 'express'
    import serverRender from './render'
    import { matchRoutes } from 'react-router-config'
    import { routes } from '../routes'
    import serverStore from "../store/serverStore"

    const app = express()
    app.get('*', (req, res) => {
    const context = {css: []}
    const store = serverStore()
    // 用matchRoutes方法获取匹配到的路由对应的组件数组
    const matchedRoutes = matchRoutes(routes, req.path)
    const promises = []
    for (const item of matchedRoutes) {
        if (item.route.loadData) {
        const promise = new Promise((resolve, reject) => {
            item.route.loadData(store).then(resolve).catch(resolve)
        })
        promises.push(promise)
        }
    }
    // 所有请求响应完毕，将被HTML内容发送给浏览器
    Promise.all(promises).then(() => {
        // 将生成html内容的逻辑封装成了一个函数，接收req, store, context
        res.send(serverRender(req, store, context))
    })
    })
```
```js
   const app = dva({
   //history: browserHistory
    history: createHistory(),
    });

    // 2. Plugins
    // app.use({});

    // 3. Model move to router
    models.forEach((m) => {
    app.model(m);
    });

    // 4. Router
    app.router(require('./router'));

    // 5. Start
    app.start('#root');

    export default app._store;
```
location / {
   try_files $uri /index.html;
}