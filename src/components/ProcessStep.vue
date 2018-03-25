<template>
  <div class="evo-process-step"
       v-bind:class="{ 'is-stacked': isStackedStep(), 'is-arrow': isRenderedAsArrow() }"
       v-on:click="triggerStepAction()"
       @mouseover="showSubProcess = true"
       @mouseleave="showSubProcess = false">

    <div class="evo-process-step__header evo-process-step-header">
      <span class="evo-process-step-header__id">{{ step.id }}</span>
      <span class="evo-process-step-header__label">{{ step.label }}</span>
    </div>

    <div class="evo-process-step__body">
      {{ step.title }}
    </div>

    <transition appear>
      <div v-if="showSubProcess && step.subProcess" class="evo-process-step__sub-process">
        <sub-process-view :process="step.subProcess"></sub-process-view>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import {ProcessStep as Step, StepType} from '../contracts';
  import SubProcessView from '@/components/SubProcessView.vue';

  @Component({
    name: 'process-step',
    components: {
      SubProcessView
    }
  })
  export default class ProcessStep extends Vue {
    @Prop() private step: Step;
    @Prop() private type: number;

    private showSubProcess: boolean;

    constructor() {
      super();
      this.showSubProcess = false;
    }

    private created() {
      this.$log.debug('Process Step Component loaded.');
    }

    private isRenderedAsArrow(): boolean {
      return this.type === StepType.Arrow;
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
     * If process has a sub-process defined, a sub-process modal will be shown.
     * Else the link that is part of the step will be opened in a new tab.
     */
    private triggerStepAction(): void {
      if (this.step.subProcess) {
        this.$log.info('Sub Process is defined for this step.');
      } else if (this.step.url) {
        window.open(this.step.url, '_blank');
      } else {
        this.$log.error('The process step has neither a URL nor a sub-process.');
      }
    }
  }
</script>

<style lang="scss" scoped>
  $step-height-arrow: 9em;
  $step-height-box: 5em;

  .evo-process-step {
    position: relative;
    text-align: left;
    height: $step-height-box;
    min-width: 8em;
    max-width: 20em;
    background: #FFF4E3;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
    margin-right: 0.5em;
    margin-bottom: 1em;
    vertical-align: top;
    cursor: pointer;

    &.is-arrow {
      height: $step-height-arrow;
      min-width: 10em;
    }

    &.is-stacked {
      height: $step-height-arrow / 2 - 0.25em;
      overflow: visible;
      margin-bottom: 0.5em;
    }

    &-header {
      display: block;
      font-size: 14px;
      font-weight: bold;
      line-height: 1.1em;
      text-align: left;
      padding: 0.6em;
      background-image: linear-gradient(-180deg, rgba(250,217,97,0.74) 50%, rgba(246,125,57,0.60) 100%);
      color: #252525;

      &__id {
        margin-right: 0.8em;
        vertical-align: top;
      }

      &__label {
        display: inline-block;
        text-align: right;
        max-width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: top;
      }
    }

    &__body {
      padding: 0.3em;
      font-size: 20px;
    }

    &__sub-process {
      position: absolute;
      top: -0.5em;
      left: -0.5em;
      right: -0.5em;
    }
  }
</style>