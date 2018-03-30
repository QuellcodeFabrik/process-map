<template>
  <div class="evo-process-container">
    <h2 v-if="titlePosition === 'top'" class="evo-process-container__heading">{{ title | translate }}</h2>
    <div v-if="processStepGroups" class="evo-process-steps__list">
      <process-step-group
          v-for="stepGroups in processStepGroups"
          :steps="stepGroups"
          :has-parallel-steps="processHasParallelSteps"
          class="evo-process-steps__item">
      </process-step-group>
    </div>
    <h2 v-if="titlePosition === 'bottom'" class="evo-process-container__heading">{{ title | translate }}</h2>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import ProcessStepGroup from '@/components/ProcessStepGroup.vue';
  import { Process, ProcessStep, ProcessType, StepType } from '../contracts';

  @Component({
    name: 'process-container',
    components: {
      ProcessStepGroup
    }
  })
  export default class ProcessContainer extends Vue {
    @Prop() private title: string;
    @Prop() private titlePosition: string;
    @Prop() private process: Process;

    private processStepGroups: ProcessStep[][];
    private stepType: StepType;
    private processHasParallelSteps: boolean;

    constructor() {
      super();
      this.processStepGroups = [];
      this.stepType = StepType.Box;
      this.processHasParallelSteps = false;
    }

    @Watch('process')
    private onProcessChanged(): void {
      if (!this.process) {
        return;
      }

      if (this.process.type === ProcessType.Core) {
        this.stepType = StepType.Arrow;
      }

      // sort steps
      this.process.steps.sort((a: ProcessStep, b: ProcessStep): number => {
        return parseFloat(a.position) - parseFloat(b.position);
      });

      // sort steps into step groups
      this.process.steps
        .reduce((previousValue: ProcessStep[][], currentValue: ProcessStep): ProcessStep[][] => {
          if (currentValue.showOnMap && currentValue.position.indexOf('.') > -1) {
            if (previousValue.length && previousValue[previousValue.length - 1][0].position.indexOf('.') > -1) {
              previousValue[previousValue.length - 1].push(currentValue);
              return previousValue;
            }
          }
          previousValue.push([currentValue]);
          return previousValue;
        }, [])
        .forEach((stepGroup: ProcessStep[]) => {
          if (stepGroup.length > 1) {
            this.processHasParallelSteps = true;
          }
          this.processStepGroups.push(stepGroup);
        });
    }

    private created() {
      this.$log.debug('Process Container Component loaded.');
    }
  }
</script>

<style lang="scss" scoped>
  .evo-process-container {
    display: block;

    &__heading {
      display: block;
      font-size: 1.5em;
      -webkit-margin-before: 0.83em;
      -webkit-margin-after: 0.83em;
      -webkit-margin-start: 0;
      -webkit-margin-end: 0;
    }
  }
</style>