<template>
  <div class="evo-process-step"
       v-bind:class="{
         'evo-process-step--is-stacked': isStackedStep(),
         'evo-process-step--is-core-process': isCoreStep(),
         'evo-process-step--has-parallel-steps': parallelSteps,
         'evo-process-step--is-clickable': !!step.url,
         'evo-process-step--has-header': showHeader }"
       v-on:click="triggerStepAction()">

    <div class="evo-process-step__header evo-process-step-header"
         v-if="showHeader">
      <span class="evo-process-step-header__id">{{ step.id }}</span>
      <span class="evo-process-step-header__label">{{ step.label }}</span>
    </div>

    <div class="evo-process-step__body">
      {{ step.title }}
    </div>

    <div class="evo-process-step__sub-process-trigger"
         v-if="step.subProcess"
         @mouseover="showSubProcess = true">
    </div>

    <transition appear>
      <div v-if="showSubProcess && step.subProcess"
           class="evo-process-step__sub-process"
           @mouseleave="showSubProcess = false">
        <sub-process-view :process="step.subProcess"></sub-process-view>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ProcessStep as Step, StepType } from '../contracts';
  import SubProcessView from '@/components/SubProcessView.vue';
  import ConfigurationMixin from '../utils/config.utils';

  @Component({
    name: 'process-step',
    components: {
      SubProcessView
    },
    mixins: [ConfigurationMixin]
  })
  export default class ProcessStep extends Vue {
    @Prop() private step: Step;

    // used to increase the individual step height, if there are stacked
    // process steps within the process container
    @Prop() private parallelSteps: boolean;
    @Prop() private type: number;

    private showSubProcess: boolean;
    private showHeader: boolean;

    constructor() {
      super();
      this.showSubProcess = false;
      this.showHeader = true;
    }

    private created() {
      this.$log.debug('Process Step Component loaded.');
      this.showHeader = this.getConfigurationValue('SHOW_STEP_HEADER') as boolean;
    }

    /**
     * Checks if the step is part of a core process.
     */
    private isCoreStep(): boolean {
      return this.type === StepType.Core;
    }

    /**
     * Returns true, if the step is a so called stacked step meaning it is
     * stacked below / on top of another step in the process lane.
     *
     * @returns {boolean}
     */
    private isStackedStep(): boolean {
      return this.step.position.indexOf('.') > -1;
    }

    /**
     * If the process step has a link defined, that link will be opened in a
     * new tab.
     */
    private triggerStepAction(): void {
      if (this.step.url) {
        window.open(this.step.url, '_blank');
      } else {
        this.$log.error('The process step has no URL to be opened.');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  $step-height-core: 10em;
  $step-height-box: 2.5em;

  .evo-process-step {
    display: block;
    position: relative;
    height: $step-height-box;
    line-height: $step-height-box;
    background: $c-process-step-bg;
    margin-right: .5em;
    margin-bottom: 1em;
    cursor: default;
    border-radius: 5px;
    border: 2px solid black;
    color: black;
    text-align: center;
    font-weight: bold;

    &--is-core-process {
      background: $c-process-step-core-bg;
      color: #e2e2e2;
      border-radius: 15px;
      width: auto;
      min-width: 12em;
      max-width: 20em;
    }

    &--has-parallel-steps {
      height: $step-height-core - 2.5em;
      line-height: $step-height-core - 2.5em;

      &.evo-process-step--has-header {
        height: $step-height-core;
        line-height: $step-height-core;
      }
    }

    &--is-stacked {
      height: ($step-height-core - 2.5em) / 2 - 0.25em;
      line-height: ($step-height-core - 2.5em) / 2 - 0.25em;
      overflow: visible;
      margin-bottom: 0.5em;
      border-radius: 10px;

      &.evo-process-step--has-header {
        height: $step-height-core / 2 - 0.25em;
      }
    }

    &--is-clickable {
      cursor: pointer;
    }

    &__body {
      font-size: 20px;

      &::after {
        content: ' ';
        display: block;
      }
    }

    &__sub-process-trigger {
      position: absolute;
      height: 18px;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: $c-sub-process-trigger;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
    }

    &__sub-process {
      position: absolute;
      bottom: 0;
      left: -3em;
      right: -3em;
      z-index: 20;
      color: black;
    }

    &-header {
      display: block;
      font-size: 14px;
      font-weight: bold;
      line-height: 1.1em;
      text-align: left;
      height: 32px;
      background-image: $c-process-step-title-bg;
      color: $c-process-step-text;

      &__id {
        display: inline-block;
        vertical-align: top;
        margin: 0.5em 0.8em 0.5em 0.5em;
      }

      &__label {
        display: inline-block;
        text-align: right;
        max-width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: top;
        margin-top: 0.5em;
      }
    }
  }
</style>