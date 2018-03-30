<template>
  <div class="evo-sub-process-view" v-on:click="stopPropagation">
    <h3 class="evo-sub-process-view__title">{{ process.title }}</h3>
    <ul class="evo-sub-process-view__list">
      <li v-for="step in process.steps"
          :key="step.id"
          class="evo-sub-process-view__item">
        <a :href="step.url" target="_blank">{{ step.id + ' ' + step.title }}</a>
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