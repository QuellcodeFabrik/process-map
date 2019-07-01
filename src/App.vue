<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ConfigurationMixin from './utils/config.utils';

  @Component({
    name: 'app',
    mixins: [ConfigurationMixin]
  })
  export default class SubProcessView extends Vue {

    private created() {
      this.$log.debug('AppComponent loaded.');

      const activeLanguage = this.getConfigurationValue('LANGUAGE') as string;

      if (activeLanguage) {
        this.$log.info('Active language:', activeLanguage);
        Vue.i18n.set(activeLanguage);
      }
    }
  }
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 640px;
  font-size: 14px;
}
</style>
