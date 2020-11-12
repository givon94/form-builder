import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
const VueInputMask = require('vue-inputmask').default

import './styles/reset.css'
import './styles/iconfont/iconfont.css'
import './styles/style.css'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { size: 'small', locale });
Vue.use(VueInputMask)

new Vue({
  store,
  router,
  axios,
  render: h => h(App),
}).$mount('#app')
