import dva from 'dva';
import 'moment/locale/zh-cn';
import models from './models';
//import browserHistory from 'history/createBrowserHistory'
import createHistory from 'history/createHashHistory';
import './polyfill';
import './g2';
// import { browserHistory } from 'dva/router';
import './index.less';

// 1. Initialize
const app = dva({
  //history: browserHistory
  history: createHistory(),
});

// 2. Plugins
// app.use({});

const cached = {};

function registerModel(app, model) {
  if (!cached[model.default.namespace]) {
    app.model(model.default);
    cached[model.default.namespace] = model.default.namespace;
  }
}
// 3. Model move to router
models.forEach((m) => {
  registerModel(app, m)
});

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store;
