import Vue from 'vue'
import App from './App.vue'
import {router} from './routes/routes'
import VueRouter from 'vue-router'

// element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
