<template>
  <div class="evo-sub-process-view" v-on:click="stopPropagation">
    <h3 class="evo-sub-process-view__title">{{ process.title }}</h3>
    <ul class="evo-sub-process-view__list">
      <li
        class="evo-sub-process-view__item"
        v-for="step in visibleSteps"
        :key="step.id">
        <a v-if="step.url" :href="step.url" target="_blank">{{ step.id + ' ' + step.title }}</a>
        <span v-if="!step.url">{{ step.id + ' ' + step.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Process } from '../contracts';

  @Component({
    name: 'sub-process-view'
  })
  export default class SubProcessView extends Vue {
    @Prop() private process: Process;

    private created() {
      this.$log.debug('Sub Process View Component loaded.');
    }

    public stopPropagation(event: Event) {
      event.stopPropagation();
    }

    get visibleSteps() {
      return this.process.steps.filter((step: any) => !!step.showOnMap);
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .evo-sub-process-view {
    position: relative;
    display: block;
    padding: 1em;
    line-height: 1.2em;
    background-color: $c-sub-process-bg;
    -webkit-box-shadow: 0 0 10px 2px rgba(0,0,0,0.5);
    -moz-box-shadow: 0 0 10px 2px rgba(0,0,0,0.5);
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.5);
    cursor: default;
    z-index: 100;

    &__title {
      margin: 0 0 0.8em 0;
      line-height: 1.2em;
    }

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__item {
      display: block;
      margin-bottom: 0.3em;
    }
  }
</style>