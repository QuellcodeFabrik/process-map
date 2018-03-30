import Vue from 'vue';
import vuexI18n from 'vuex-i18n';
import store from './store.utils';

// initialize the internationalization plugin on the vue instance. Note that
// the store must be passed to the plugin.
Vue.use(vuexI18n.plugin, store);

// add some translations (could also be loaded from a separate file i.e.
// resources/i18n/de.json). Note that it is possible to use placeholders: {...}
const translationsEn = {
  'evo.layout.box.customer-requirements': 'Customer Requirements',
  'evo.layout.box.customer-satisfaction': 'Customer Satisfaction',
  'evo.layout.title.management-process' : 'Management Processes',
  'evo.layout.title.core-process' : 'Core Processes',
  'evo.layout.title.support-process' : 'Support Processes'
};

const translationsDe = {
  'evo.layout.box.customer-requirements': 'Kundenanforderungen',
  'evo.layout.box.customer-satisfaction': 'Kundenzufriedenheit',
  'evo.layout.title.management-process' : 'Managementprozesse',
  'evo.layout.title.core-process' : 'Kernprozesse',
  'evo.layout.title.support-process' : 'Unterstützende Prozesse'
};

// add translations directly to the application
Vue.i18n.add('en', translationsEn);
Vue.i18n.add('de', translationsDe);

// set the start locale to use
Vue.i18n.set('de');

export default store;
