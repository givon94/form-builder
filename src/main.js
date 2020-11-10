import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import './styles/reset.css'
import './styles/iconfont/iconfont.css'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { size: 'small' });

new Vue({
  store,
  router,
  axios,
  render: h => h(App),
}).$mount('#app')
