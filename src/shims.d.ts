declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vuejs-logger' {
  import { PluginFunction } from 'vue';

  export default class VueLogger {
    public info(...args: any[]): void;
    public debug(...args: any[]): void;
    public warn(...args: any[]): void;
    public error(...args: any[]): void;
    public fatal(...args: any[]): void;

    public static install: PluginFunction<never>;
  }
}
