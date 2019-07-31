<template>
  <div class="evo-process-container">
    <div v-if="titlePosition === 'top'">
      <h2 class="evo-process-container__heading evo-process-container__heading--top">{{ title | translate }}</h2>
      <div class="evo-process-container__background evo-process-container__background--top">
        <img src="../assets/process-container-background-top.svg" alt="Process Container Background">
      </div>
    </div>
    <div v-if="titlePosition === 'bottom'">
      <h2 class="evo-process-container__heading evo-process-container__heading--bottom">{{ title | translate }}</h2>
      <div class="evo-process-container__background evo-process-container__background--bottom">
        <img src="../assets/process-container-background-bottom.svg" alt="Process Container Background">
      </div>
    </div>
    <div 
      class="evo-process-container__steps evo-process-container-steps"
      v-if="processStepGroups"
      :class="{
        'evo-process-container-steps--top': titlePosition === 'top',
        'evo-process-container-steps--bottom': titlePosition === 'bottom'
      }">
      <process-step-group
        class="evo-process-container-steps__item"
        v-for="(stepGroups, index) in processStepGroups"
        :steps="stepGroups"
        :step-type="process.type"
        :has-parallel-steps="processHasParallelSteps"
        :key="index">
      </process-step-group>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import ProcessStepGroup from '@/components/ProcessStepGroup.vue';
  import { Process, ProcessStep, ProcessType, StepType } from '../contracts';

  @Component({
    name: 'ProcessContainer',
    components: {
      ProcessStepGroup
    }
  })
  export default class ProcessContainer extends Vue {
    @Prop() private title: string;
    @Prop() private titlePosition: string;
    @Prop() private process: Process;

    private processHasParallelSteps: boolean = false;
    private processStepGroups: ProcessStep[][][] = [];
    private stepType: StepType = StepType.Box;

    protected created() {
      this.$log.debug('ProcessContainer::created()');
    }

    private sortSteps(steps: ProcessStep[]) {
      this.$log.debug('ProcessContainer::sortSteps()');

      steps.sort((a: ProcessStep, b: ProcessStep): number => {
        const aFragments = a.position.split('.');
        const bFragments = b.position.split('.');

        if (aFragments.length > 2 || bFragments.length > 2) {
          // if the first two fragments of the number are unequal we can parse them as
          // float value and directly compare them
          // e.g. 2.1 is smaller than 2.5 is bigger than 1
          if (aFragments.slice(0, 2).join('.') !== bFragments.slice(0, 2).join('.')) {
            return parseFloat(aFragments.slice(0, 2).join('.')) - parseFloat(bFragments.slice(0, 2).join('.'));
          }

          // only sort those numbers by the third fragment
          // e.g. 2.1.1 is smaller than 2.1.2 is bigger than 2.1
          return (parseInt(aFragments[2], 10) || 0) - (parseInt(bFragments[2], 10) || 0);
        }

        return parseFloat(a.position) - parseFloat(b.position);
      });
    }

    /**
     *
     */
    private splitUpStepGroup(stepGroup: ProcessStep[]): ProcessStep[][] {
      this.$log.debug('ProcessContainer::splitUpStepGroup()');

      return stepGroup
        .reduce((accumulator: ProcessStep[][], currentValue: ProcessStep): ProcessStep[][] => {
          if (!accumulator.length) {
            accumulator.push([currentValue]);
            return accumulator;
          }

          const stepPositionMinor = currentValue.position.split('.')[1];
          const previousStepPositionMinor = accumulator[accumulator.length - 1][0].position.split('.')[1];

          if (stepPositionMinor === previousStepPositionMinor) {
            accumulator[accumulator.length - 1].push(currentValue);
            return accumulator;
          }

          accumulator.push([currentValue]);
          return accumulator;
        }, []);
    }

    @Watch('process')
    private onProcessChanged(): void {
      if (!this.process) {
        return;
      }

      if (this.process.type === ProcessType.Core) {
        this.stepType = StepType.Arrow;
      }

      this.sortSteps(this.process.steps);
      this.$log.debug('ProcessContainer::created() -> sorted steps', this.process.steps);

      // put steps into step groups
      this.processStepGroups =
        this.process.steps
          .filter((step: ProcessStep) => !!step.showOnMap)
          .reduce((accumulator: ProcessStep[][], currentValue: ProcessStep): ProcessStep[][] => {
            if (
              currentValue.position.indexOf('.') > -1 &&
              accumulator.length &&
              accumulator[accumulator.length - 1][0].position.indexOf('.') > -1 &&
              accumulator[accumulator.length - 1][0].position.split('.')[0] === currentValue.position.split('.')[0]
            ) {
              accumulator[accumulator.length - 1].push(currentValue);
              return accumulator;
            }
            accumulator.push([currentValue]);
            return accumulator;
          }, [])
          .map((stepGroup: ProcessStep[]) => {
            return this.splitUpStepGroup(stepGroup);
          });

      this.processStepGroups.forEach((stepGroup: ProcessStep[][]) => {
        if (stepGroup.length > 1) {
          this.processHasParallelSteps = true;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>

.evo-process-container-steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  padding-top: 4em;
  padding-bottom: 4em;

  &__item {
    margin-bottom: 1rem;
  }

  &--top {
    padding-top: 5em;
    padding-bottom: 0;
  }

  &--bottom {
    padding-top: 0;
    padding-bottom: 4.5em;
  }
}

.evo-process-container {
  display: block;
  position: relative;
  width: 100%;

  &__background {
    display: block;
    position: absolute;
    left: 0;
    right: 0;

    &--top {
      top: 0;
    }

    &--bottom {
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

    &--top {
      top: 0;
    }

    &--bottom {
      bottom: 0;
    }
  }
}
</style>