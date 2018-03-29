import Vue from 'vue';
import Component from 'vue-class-component';

declare var window: {
  [key: string]: any; // add missing index definition
  prototype: Window;
  new(): Window;
};

declare module 'vue/types/vue' {
  interface Vue {
    getConfigurationValue(param: string): string | boolean;
  }
}

@Component
export default class ConfigurationMixin extends Vue {

  private configuration: {[index: string]: string | boolean} = {
    PROCESS_DEFINITION_LIST: 'https://evocomcloud.sharepoint.com/sites/DemoApps/qm/',
    PROCESS_VISUALIZATION: 'box', // could be 'arrow'
    SHOW_STEP_HEADER: true,
    LANGUAGE: 'de-DE'
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
   * @returns {string}
   */
  public getConfigurationValue(param: string): string | boolean {
    return window[param] || this.configuration[param] || '';
  }
}
