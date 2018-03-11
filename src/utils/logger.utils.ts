import VueLogger from 'vuejs-logger';
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $log: VueLogger;
  }
}

const options = {
  logLevel : 'debug', // ['debug', 'info', 'warn', 'error', 'fatal']
  stringifyArguments : false,
  showLogLevel : false,
  showMethodName : false,
  separator: '|',
  showConsoleColors: true
};

export class Logger {
  public static init() {
    Vue.use(VueLogger, options);
  }
}
