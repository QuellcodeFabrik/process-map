<template>
  <div class="evo-process-container">
    <div v-if="titlePosition === 'top'" >
      <h2 class="evo-process-container__heading top">{{ title | translate }}</h2>
      <div class="evo-process-container__background top">
        <img src="../assets/process-container-background-top.svg" alt="Process Container Background">
      </div>
    </div>
    <div class="evo-process-container__list"
         v-if="processStepGroups"
         v-bind:class="{ top: titlePosition === 'top', bottom: titlePosition === 'bottom' }">
      <process-step-group
          v-for="stepGroups in processStepGroups"
          :steps="stepGroups"
          :step-type="process.type"
          :has-parallel-steps="processHasParallelSteps"
          class="evo-process-steps__item">
      </process-step-group>
    </div>
    <div v-if="titlePosition === 'bottom'" >
      <h2 class="evo-process-container__heading bottom">{{ title | translate }}</h2>
      <div class="evo-process-container__background bottom">
        <img src="../assets/process-container-background-bottom.svg" alt="Process Container Background">
      </div>
    </div>
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
    position: relative;
    width: 100%;

    &__background {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      z-index: -1;

      &.top {
        top: 0;
      }

      &.bottom {
        bottom: 0;
      }

      img {
        width: 100%;
      }
    }

    &__heading {
      display: block;
      font-size: 1.5em;
      position: absolute;
      z-index: 10;
      left: 0;
      right: 0;
      text-align: center;

      &.top {
        top: 0;
      }

      &.bottom {
        bottom: 0;
      }
    }

    &__list {
      display: block;
      padding-top: 4em;
      padding-bottom: 4em;

      &.top {
        padding-top: 5em;
        padding-bottom: 0;
      }

      &.bottom {
        padding-top: 0;
        padding-bottom: 4.5em;
      }
    }
  }
</style>