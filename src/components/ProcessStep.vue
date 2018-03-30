<template>
  <div class="evo-process-step"
       v-bind:class="{
         'evo-process-step--is-stacked': isStackedStep(),
         'evo-process-step--is-arrow': isArrowStyle(),
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
           v-bind:class="{
            'evo-process-step__sub-process--asymmetric': isArrowStyle()
            }"
           @mouseleave="showSubProcess = false">
        <sub-process-view :process="step.subProcess"></sub-process-view>
      </div>
    </transition>

    <div class="evo-process-step__arrow evo-process-step-arrow"
         v-if="isArrowStyle()"
         v-bind:class="{
            'evo-process-step-arrow--stacked': isStackedStep()
         }">
      <img src="../assets/arrow-tip-header.svg" class="evo-process-step-arrow__header" alt="Arrow tip header">
      <img src="../assets/arrow-tip.svg" class="evo-process-step-arrow__tip" alt="Arrow tip">
    </div>
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

      this.$log.info('Step type:', this.type);
    }

    /**
     *
     */
    private isArrowStyle(): boolean {
      return this.type === 1 && this.getConfigurationValue('USE_ARROW_STYLE') as boolean;
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

  $step-height-arrow: 10em;
  $step-height-box: 5em;

  .evo-process-step {
    display: block;
    position: relative;
    text-align: left;
    height: $step-height-box;
    min-width: 12em;
    max-width: 20em;
    background: $c-process-step-bg;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
    margin-right: .5em;
    margin-bottom: 1em;
    vertical-align: top;
    cursor: default;

    &--has-parallel-steps {
      height: $step-height-arrow - 2.5em;

      &.evo-process-step--has-header {
        height: $step-height-arrow;
      }
    }

    &--is-stacked {
      height: ($step-height-arrow - 2.5em) / 2 - 0.25em;
      overflow: visible;
      margin-bottom: 0.5em;

      &.evo-process-step--has-header {
        height: $step-height-arrow / 2 - 0.25em;
      }

      &.evo-process-step--is-arrow {
        margin-right: 2.5em;
      }
    }

    &--is-clickable {
      cursor: pointer;
    }

    &--is-arrow {
      margin-right: 4em;
    }

    &__arrow {
      position: absolute;
      right: -3.2em;
      top: 0;
      bottom: -10px;
    }

    &__body {
      padding: 0.3em;
      font-size: 20px;

      &::after {
        content: ' ';
        display: block;
      }
    }

    &__sub-process-trigger {
      position: absolute;
      width: 0;
      height: 0;
      bottom: 0;
      left: 0;
      border-right: 24px solid transparent;
      border-left: 24px solid $c-sub-process-trigger;
      border-top: 24px solid transparent;
    }

    &__sub-process {
      position: absolute;
      bottom: 0;
      left: -3em;
      right: -3em;
      z-index: 20;

      &--asymmetric {
        left: -2em;
      }
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

    &-arrow {
      &__tip {
        display: block;
        position: relative;
        z-index: 0;
        height: 144px;
      }

      &__header {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
      }

      &--stacked {
        right: -1.55em;

        .evo-process-step-arrow__tip {
          height: 70px;
        }
      }
    }

  }
</style>