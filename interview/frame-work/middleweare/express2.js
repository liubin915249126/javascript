proto.use = function use(route, fn) {
    var handle = fn;
    var path = route;

    // 这里是对直接填入回调函数的进行容错处理
    // default route to '/'
    if (typeof route !== 'string') {
        handle = route;
        path = '/';
    }
    .
    .
    .
    this.stack.push({ route: path, handle: handle });

    return this;
};


proto.handle = function handle(req, res, out) {
    var index = 0;
    var stack = this.stack;

    function next(err) {

        // next callback
        var layer = stack[index++];

        // all done
        if (!layer) {
            defer(done, err);
            return;
        }

        // route data
        var path = parseUrl(req).pathname || '/';
        var route = layer.route;

        // skip this layer if the route doesn't match
        if (path.toLowerCase().substr(0, route.length) !== route.toLowerCase()) {
            return next(err);
        }

        // call the layer handle
        call(layer.handle, route, err, req, res, next);
    }

    next();
};
