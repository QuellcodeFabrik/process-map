<template>
  <div class="evo-process-container"
       v-bind:class="{
        'evo-process-container--is-core-process': isCoreProcess()
       }">
    <div v-if="titlePosition === 'top'">
      <h2 class="evo-process-container__heading top">{{ title | translate }}</h2>
      <div class="evo-process-container__background top">
        <img src="../assets/process-container-background-top.svg" alt="Process Container Background">
      </div>
    </div>
    <div v-if="titlePosition === 'center'">
      <h2 class="evo-process-container__heading center">{{ title | translate }}</h2>
    </div>
    <div v-if="titlePosition === 'bottom'">
      <h2 class="evo-process-container__heading bottom">{{ title | translate }}</h2>
      <div class="evo-process-container__background bottom">
        <img src="../assets/process-container-background-bottom.svg" alt="Process Container Background">
      </div>
    </div>
    <div class="evo-process-container__list"
         v-if="processStepGroups"
         v-bind:class="{ top: titlePosition === 'top', bottom: titlePosition === 'bottom' }">
      <process-step-group
          v-for="(stepGroups, index) in processStepGroups"
          :steps="stepGroups"
          :step-type="stepType"
          :has-parallel-steps="processHasParallelSteps"
          :key="index"
          class="evo-process-steps__item">
      </process-step-group>
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
      this.stepType = StepType.Other;
      this.processHasParallelSteps = false;
    }

    @Watch('process')
    private onProcessChanged(): void {
      if (!this.process) {
        return;
      }

      if (this.process.type === ProcessType.Core) {
        this.stepType = StepType.Core;
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

    private isCoreProcess(): boolean {
      return this.stepType === StepType.Core;
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/variables';

  .evo-process-container {
    display: block;
    position: relative;
    width: 100%;

    &--is-core-process {
      background-color: $c-process-bg;
    }

    &__background {
      display: block;
      position: absolute;
      left: 0;
      right: 0;

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
      margin: 0.5em 0;
      color: white;
      font-weight: 400;

      &.top {
        top: 0;
      }

      &.center {
        color: #101010;
        font-weight: 600;
      }

      &.bottom {
        bottom: 0;
      }
    }

    &__list {
      display: block;
      padding-top: 4em;
      padding-bottom: 2em;

      &.top {
        padding-top: 3.5em;
        padding-bottom: 0;
      }

      &.bottom {
        padding-top: 0;
        padding-bottom: 2.5em;
      }
    }
  }
</style>