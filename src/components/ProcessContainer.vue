<template>
  <div class="evo-process-container">
    <h2>{{ title }}</h2>
    <div v-if="processStepGroups" class="evo-process-steps__list">
      <process-step-group
          v-for="stepGroups in processStepGroups"
          :steps="stepGroups"
          class="evo-process-steps__item">
      </process-step-group>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import ProcessStepGroup from '@/components/ProcessStepGroup.vue';
  import { Process, ProcessStep } from '../contracts';

  @Component({
    name: 'process-container',
    components: {
      ProcessStepGroup
    }
  })
  export default class ProcessContainer extends Vue {
    @Prop() private title: string;
    @Prop() private process: Process;

    private processStepGroups: ProcessStep[][];

    constructor() {
      super();
      this.processStepGroups = [];
    }

    @Watch('process')
    private onProcessChanged(): void {
      if (!this.process) {
        return;
      }

      // sort steps
      this.process.steps.sort((a: ProcessStep, b: ProcessStep): number => {
        return parseFloat(a.position) - parseFloat(b.position);
      });

      // sort steps into step groups
      this.process.steps
        .reduce((previousValue: ProcessStep[][], currentValue: ProcessStep): ProcessStep[][] => {
          if (currentValue.position.indexOf('.') > -1) {
            if (previousValue.length && previousValue[previousValue.length - 1][0].position.indexOf('.') > -1) {
              previousValue[previousValue.length - 1].push(currentValue);
              return previousValue;
            }
          }
          previousValue.push([currentValue]);
          return previousValue;
        }, [])
        .forEach((stepGroup: ProcessStep[]) => {
          this.processStepGroups.push(stepGroup);
        });
    }

    private created() {
      this.$log.info('Process Container Component loaded.');
    }
  }
</script>

<style lang="scss" scoped>
  .evo-process-container {
    display: block;
  }
</style>