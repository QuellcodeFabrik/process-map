import Vue from 'vue';
import VueLogger from 'vuejs-logger';
import { Process } from '@/contracts';

/**
 * Extend some Vue.js interfaces to cover the used plugins' injections.
 */

declare module 'vue/types/vue' {
  // global properties can be declared on the `VueConstructor` interface
  interface VueConstructor {
    $log: VueLogger;
    getProcessDefinition(): Promise<Process[]>;
  }

  interface Vue {
    $log: VueLogger;
    getProcessDefinition(): Promise<Process[]>;
  }
}
