<template>
  <div class="evo-process-step" v-bind:class="{ 'is-stacked': isStackedStep() }">
    {{ step.title }}
    <span class="evo-process-step__label">{{ step.label }}</span>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ProcessStep as Step } from '../contracts';

  @Component({
    name: 'process-step'
  })
  export default class ProcessStep extends Vue {
    @Prop() private step: Step;

    private created() {
      this.$log.debug('Process Step Component loaded.');
    }

    /**
     * Returns true, if the step is a so called stacked step meaning it is
     * stacked below / on top of another step in the process lane.
     *
     * @returns {boolean}
     */
    private isStackedStep() {
      return this.step.position.indexOf('.') > -1;
    }
  }
</script>

<style lang="scss" scoped>
  $step-height: 5em;

  .evo-process-step {
    padding: 0 2em;
    height: $step-height;
    line-height: $step-height;
    background-color: whitesmoke;
    margin-right: 0.5em;
    vertical-align: top;

    &.is-stacked {
      height: $step-height / 2 - 0.25em;
      line-height: $step-height / 2 - 0.25em;
      margin-bottom: 0.5em;
    }

    &__label {

    }
  }
</style>