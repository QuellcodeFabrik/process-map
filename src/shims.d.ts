declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vuejs-logger' {
  import { PluginFunction } from 'vue';

  export default class VueLogger {
    info (...args : any[]): void;
    debug (...args : any[]): void;
    warn (...args : any[]): void;
    error (...args : any[]): void;
    fatal (...args : any[]): void;

    static install: PluginFunction<never>;
  }
}
