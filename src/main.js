import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router";
import store from './store'
import "./sass/overrides.sass";

// confirm
import VuetifyConfirm from '@/components/confirm'
Vue.use(VuetifyConfirm, { vuetify })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')