import Vue from 'vue';
import App from './App.vue';
import { Logger } from './utils/logger.utils';
import router from './utils/router.utils';
import store from './utils/i18n.utils';

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
