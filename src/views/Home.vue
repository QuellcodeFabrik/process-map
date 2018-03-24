<template>
  <div class="evo-process-map">
    <div class="evo-process-map__management-process">
      <process-container
          title="Managementprozesse"
          :process-structure="getProcessStructure(3)"></process-container>
    </div>
    <div class="evo-process-map__core-process">
      <process-container
          title="Kernprozesse"
          :process-structure="getProcessStructure(1)"></process-container>
    </div>
    <div class="evo-process-map__support-process">
      <process-container
          title="Unterstützende Prozesse"
          :process-structure="getProcessStructure(2)"></process-container>
    </div>
    <div class="evo-process-map__side-bar-left">
      Kundenanforderungen
    </div>
    <div class="evo-process-map__side-bar-right">
      Kundenzufriedenheit
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Route } from 'vue-router';
import { Process, ProcessType } from '../contracts';
import ProcessContainer from '@/components/ProcessContainer.vue';
import ApiMixin from '../utils/api.utils';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave'
]);

@Component({
  components: {
    ProcessContainer
  },
  mixins: [ApiMixin]
})
export default class Home extends Vue {
  private processDefinitions: Process[];

  private created() {
    this.getProcessDefinition().then((result: Process[]) => {
      this.$log.info('Result coming from API:');
      this.$log.info(result);

      this.processDefinitions = result;
    }).catch((err: Error) => {
      this.$log.error(err);
    });
  }

  public beforeRouteEnter(to: Route, from: Route, next: () => void) {
    next();
  }

  /**
   * Returns the process structure for the process type given as argument.
   *
   * @param {ProcessType} processType
   * @returns {Process | undefined}
   */
  private getProcessStructure(processType: ProcessType): Process | undefined {
    if (!this.processDefinitions) {
      return undefined;
    }

    return this.processDefinitions.filter((process: Process) => {
      return process.type === processType;
    })[0];
  }
}
</script>

<style lang="scss" scoped>
  .evo-process-map {
    position: relative;

    &__management-process {
      display: block;
      width: 80%;
      max-width: 840px;
      margin: 0 auto;
      padding: 2em;
      background-color: rgba(0, 250, 168, 0.38);
    }

    &__core-process {
      display: block;
      width: 80%;
      max-width: 840px;
      margin: 2em auto;
      padding: 2em;
      background-color: rgba(0, 250, 168, 0.38);
    }

    &__support-process {
      display: block;
      width: 80%;
      max-width: 840px;
      margin: 0 auto;
      padding: 2em;
      background-color: rgba(0, 250, 168, 0.38);
    }

    &__side-bar-left {
      position: absolute;
      left: 0;
      top: 50%;
      height: auto;
      width: 16em;
      margin-left: -8em;
      padding: 2em;
      background-color: rgba(255, 122, 0, 0.31);

      -webkit-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
    }

    &__side-bar-right {
      position: absolute;
      right: 0;
      top: 50%;
      width: 16em;
      margin-right: -8em;
      padding: 2em;
      background-color: rgba(255, 122, 0, 0.31);


      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
    }
  }
</style>