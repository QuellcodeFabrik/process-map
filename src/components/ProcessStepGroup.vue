<template>
  <div class="evo-process-step-group">
    <process-step
        v-for="step in steps"
        v-if="step.showOnMap"
        :key="step.id"
        :step="step"
        :type="stepType"
        :parallel-steps="hasParallelSteps"
        class="evo-process-step-group__step"
        v-bind:class="{
          stacked: hasParallelSteps
        }">
    </process-step>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import ProcessStep from '@/components/ProcessStep.vue';
  import { ProcessStep as Step } from '../contracts';

  @Component({
    name: 'process-step-group',
    components: {
      ProcessStep
    }
  })
  export default class ProcessStepGroup extends Vue {
    @Prop() private steps: Step[];
    @Prop() private stepType: number;
    @Prop() private hasParallelSteps: boolean;

    private created() {
      this.$log.debug('Process Step Group Component loaded.');
    }
  }
</script>

<style lang="scss" scoped>
  .evo-process-step-group {
    display: inline-block;
    margin-right: 0.5em;
    vertical-align: top;

    &__step {
      display: block;

      &.stacked {
        .evo-process-step-group__step {
          z-index: 10;

          &:first-of-type {
            z-index: 11;
          }
        }
      }
    }
  }
</style>