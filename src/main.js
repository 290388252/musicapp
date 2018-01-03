// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import VueLazyLoad from 'vue-lazyload';
import './common/stylus/index.styl';

Vue.config.productionTip = false;
fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('./assets/logo.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
});
