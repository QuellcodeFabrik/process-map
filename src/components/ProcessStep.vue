<template>
  <div class="evo-process-step"
       v-bind:class="{ 'is-stacked': isStackedStep() }"
       v-on:click="triggerStepAction()"
       @mouseover="showSubProcess = true"
       @mouseleave="showSubProcess = false">
    {{ step.title }}
    <span class="evo-process-step__label">{{ step.label }}</span>
    <transition appear>
      <div v-if="showSubProcess && step.subProcess" class="evo-process-step__sub-process">
        <sub-process-view :process="step.subProcess"></sub-process-view>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ProcessStep as Step } from '../contracts';
  import SubProcessView from '@/components/SubProcessView.vue';

  @Component({
    name: 'process-step',
    components: {
      SubProcessView
    }
  })
  export default class ProcessStep extends Vue {
    @Prop() private step: Step;

    private showSubProcess: boolean;

    constructor() {
      super();
      this.showSubProcess = false;
    }

    private created() {
      this.$log.debug('Process Step Component loaded.');
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
        // TODO implement modal behaviour
        alert('Not yet implemented.');
      } else if (this.step.url) {
        window.open(this.step.url, '_blank');
      } else {
        this.$log.error('The process step has neither a URL nor a sub-process.');
      }
    }
  }
</script>

<style lang="scss" scoped>
  $step-height: 5em;

  .evo-process-step {
    position: relative;
    padding: 0 2em;
    height: $step-height;
    line-height: $step-height;
    background-color: whitesmoke;
    margin-right: 0.5em;
    vertical-align: top;
    cursor: pointer;

    &.is-stacked {
      height: $step-height / 2 - 0.25em;
      line-height: $step-height / 2 - 0.25em;
      overflow: visible;
      margin-bottom: 0.5em;
    }

    &__label {

    }

    &__sub-process {
      position: absolute;
      top: -0.5em;
      left: -0.5em;
      right: -0.5em;
    }
  }
</style>