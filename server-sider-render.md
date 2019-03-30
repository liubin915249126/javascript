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