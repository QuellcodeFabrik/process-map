import Vue from 'vue';
import VueLogger from 'vuejs-logger';

/**
 * Extend some Vue.js interfaces to cover the used plugins' injections.
 */

declare module 'vue/types/vue' {
  // global properties can be declared on the `VueConstructor` interface
  interface VueConstructor {
    $log: VueLogger;
    storage: VueStorage;
  }

  interface Vue {
    $log: VueLogger;
    $storage: VueStorage;
    $fullCalendar: any;
    $loadingSpinner: any;
    $hideGlobalLoadingSpinner: () => void;
    $showGlobalLoadingSpinner: (delay?: number) => void;
  }
}

// ComponentOptions is declared in types/options.d.ts
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    storage?: { [index: string]: { type?: any, default?: any } };
  }
}

interface VueStorage {
  get(storageKey: string, defaultValue?: any): any;
  remove(storageKey: string): void;

  /**
   * Store a value to the local storage.
   *
   * @param storageKey
   * @param value
   * @param expire life time in milliseconds
   */
  set(storageKey: string, value: any, expire?: number): void;
  clear(): void;
}
