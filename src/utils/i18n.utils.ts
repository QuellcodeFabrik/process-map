import Vue from 'vue';
import vuexI18n from 'vuex-i18n';
import store from './store.utils';

// initialize the internationalization plugin on the vue instance. note that
// the store must be passed to the plugin. the plugin will then generate some
// helper functions for components (i.e. this.$i18n.set, this.$t) and on the vue
// instance (i.e. Vue.i18n.set).
Vue.use(vuexI18n.plugin, store);

// add some translations (could also be loaded from a separate file i.e.
// resources/i18n/de.json). Note that it is possible to use placeholders: {...}
const translationsEn = {
  'evo.layout.box.customer-requirements': 'Customer Requirements',
  'evo.layout.box.customer-satisfaction': 'Customer Satisfaction'
};

const translationsDe = {
  'evo.layout.box.customer-requirements': 'Kundenanforderungen',
  'evo.layout.box.customer-satisfaction': 'Kundenzufriedenheit'
};

// add translations directly to the application
Vue.i18n.add('en', translationsEn);
Vue.i18n.add('de', translationsDe);

// set the start locale to use
Vue.i18n.set('de');

export default store;
