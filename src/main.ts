import Vue from 'vue';
import App from './App.vue';
import VueLogger from 'vuejs-logger';

import router from './utils/router.utils';
import store from './utils/i18n.utils';

Vue.config.productionTip = false;

Vue.use(VueLogger, {
  logLevel : 'info', // ['debug', 'info', 'warn', 'error', 'fatal']
  stringifyArguments : false,
  showLogLevel : false,
  showMethodName : false,
  separator: '|',
  showConsoleColors: true
} as any);

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

  render: (h: any) => h(App),
}).$mount('#app');
