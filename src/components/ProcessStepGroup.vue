<template>
  <div class="evo-process-step-group">
    <process-step
        v-for="step in steps"
        :key="step.id"
        :step="step"
        class="evo-process-step-group__step">
    </process-step>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import ProcessStep from '@/components/ProcessStep.vue';
  import { ProcessStep as Step} from '../contracts';

  @Component({
    name: 'process-step-group',
    components: {
      ProcessStep
    }
  })
  export default class ProcessStepGroup extends Vue {
    @Prop() private steps: Step[];

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
      z-index: 2;

      &:first-of-type {
        z-index: 3;
      }
    }
  }
</style>