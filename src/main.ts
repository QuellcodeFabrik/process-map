import Vue from 'vue';
import App from './App.vue';
import router from './utils/router.utils';
import store from './utils/store.utils';

Vue.config.productionTip = false;

new Vue({
  router,
  store,

  created() {
    if (window.hasOwnProperty('_spPageContextInfo')) {
      console.log('Application running in a SharePoint context!');
    } else {
      console.log('Application running in a standalone context!');
    }
  },

  render: (h) => h(App),
}).$mount('#app');
