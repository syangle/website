import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import 'lib-flexible'

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill() 
Es6Promise.polyfill()
import "@/utils/directive"
import '@/utils/validate'
import { Form,Field,Button,Calendar,Uploader,Icon } from 'vant';
// import { Header } from 'mint-ui';

// Vue.component(Header.name, Header);
Vue.use(ElementUI);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Calendar);
Vue.use(Uploader);
Vue.use(Icon);
Vue.use(MintUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
