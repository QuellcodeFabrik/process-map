<template>
  <ul
    class="evo-process-step-group"
    ref="stepGroup">
    <li
      class="evo-process-step-group__row evo-process-step-group-row"
      v-for="(stepContainer, index) in steps"
      :key="index">
      <process-step
        class="evo-process-step-group-row__item"
        v-for="step in stepContainer"
        :key="step.id"
        :step="step"
        :type="stepType">
      </process-step>
    </li>
  </ul>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import ProcessStep from '@/components/ProcessStep.vue';
  import { ProcessStep as Step } from '../contracts';
  import ConfigurationMixin from '../utils/config.utils';

  @Component({
    name: 'ProcessStepGroup',
    components: {
      ProcessStep
    },
    mixins: [ConfigurationMixin]
  })
  export default class ProcessStepGroup extends Vue {
    @Prop() private hasParallelSteps: boolean;
    @Prop() private steps: Step[];
    @Prop() private stepType: number;

    protected created() {
      this.$log.debug('ProcessStepGroup::created()');
    }

    protected mounted() {
      const singleStepHeight = this.getConfigurationValue('STEP_HEIGHT') as number;
      const stepHeight = this.hasParallelSteps ? 2 * singleStepHeight : singleStepHeight;
      (this.$refs.stepGroup as any).style.height = `${stepHeight}px`;
    }
  }
</script>

<style lang="scss" scoped>
.evo-process-step-group-row {
  display: flex;
  height: 100%;

  &:not(:first-of-type) {
    margin-top: .5rem;
  }
}

.evo-process-step-group {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
