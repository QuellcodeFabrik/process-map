import Vue from 'vue';
import { polyfill } from 'es6-promise';
import App from './App.vue';
import { Logger } from './utils/logger.utils';
import router from './utils/router.utils';
import store from './utils/store.utils';

// load polyfill for the Promise object in IE
polyfill();

Vue.config.productionTip = false;

Logger.init();

new Vue({
  router,
  store,

  created() {
    if (window.hasOwnProperty('_spPageContextInfo')) {
      this.$log.info('Application running in SharePoint context!');
    } else {
      this.$log.info('Application running in standalone context!');
    }
  },

  render: (h) => h(App),
}).$mount('#app');
