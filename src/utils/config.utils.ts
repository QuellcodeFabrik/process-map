import Vue from 'vue';
import Component from 'vue-class-component';

declare var window: {
  [key: string]: any; // add missing index definition
  prototype: Window;
  new(): Window;
};

declare module 'vue/types/vue' {
  interface Vue {
    getConfigurationValue(param: string): string | boolean | number;
  }
}

@Component
export default class ConfigurationMixin extends Vue {

  private configuration: {[index: string]: string | boolean | number} = {
    LANGUAGE: 'de-DE',
    PROCESS_DEFINITION_LIST: 'https://evocomcloud.sharepoint.com/sites/DemoApps/qm/',
    SHOW_STEP_HEADER: true,
    STEP_HEIGHT: 48,
    USE_ARROW_STYLE: true
  };

  public created() {
    this.$log.debug('Configuration Mixin loaded.');

    if (window.hasOwnProperty('_spPageContextInfo')) {
      this.configuration.LANGUAGE = window._spPageContextInfo.currentUICultureName || 'de-DE';
    }
  }

  /**
   * Returns the parameter being defined on the window object or if there is no
   * such definition use the locally defined parameter.
   *
   * @param {string} param
   * @returns {string | boolean | number}
   */
  public getConfigurationValue(param: string): string | boolean | number {
    if (window.hasOwnProperty(param)) {
      return window[param];
    } else {
      return this.configuration ? this.configuration[param] : '' || '';
    }
  }
}
