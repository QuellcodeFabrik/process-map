<template>
  <div class="evo-process-map">
    <div class="evo-process-map-item evo-process-map-item__management">
      <process-container
          title="Managementprozesse"
          title-position="top"
          :process="getProcessData(3)"></process-container>
    </div>
    <div class="evo-process-map-item evo-process-map-item__core">
      <process-container
          title="Kernprozesse"
          title-position="top"
          :process="getProcessData(1)"></process-container>
    </div>
    <div class="evo-process-map-item evo-process-map-item__support">
      <process-container
          title="Unterstützende Prozesse"
          title-position="bottom"
          :process="getProcessData(2)"></process-container>
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
  'beforeRouteEnter'
]);

@Component({
  components: {
    ProcessContainer
  },
  mixins: [ApiMixin]
})
export default class Home extends Vue {
  private processDefinitions: Process[];
  private loading: boolean;

  constructor() {
    super();

    this.processDefinitions = [];
    this.loading = true;
  }

  private created() {
    this.getProcessDefinition().then((result: Process[]) => {
      this.$log.info('Result coming from API:');
      this.$log.info(result);

      // this.processDefinitions = result;
      result.forEach((process: Process) => {
        this.processDefinitions.push(process);
      });
      this.loading = false;
    }).catch((err: Error) => {
      this.$log.error(err);
    });
  }

  public beforeRouteEnter(to: Route, from: Route, next: () => void) {
    next();
  }

  /**
   * Returns the process structure for the process type given as argument.
   * If the title is also given, it matches the title as well. This feature is
   * especially useful when rendering more than one process of a type.
   *
   * @param {ProcessType} processType
   * @param {string} title
   * @returns {Process | undefined}
   */
  private getProcessData(processType: ProcessType, title?: string): Process | undefined {
    if (!this.processDefinitions) {
      return undefined;
    }

    return this.processDefinitions.filter((process: Process) => {
      if (title !== undefined && process.title !== title) {
        return false;
      }
      return process.type === processType;
    })[0];
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .evo-process-map {
    position: relative;

    &-item {
      display: block;
      position: relative;
      width: 80%;
      padding: 0.5em 2em 1em 2em;
      margin: 0 auto;
      overflow: hidden;

      &__management {
        background-color: $c-process-container;

        &::after {
          content: ' ';
          background-color: $c-app-bg;
          display: block;
          width: 80%;
          height: 20em;
          position: absolute;
          top: 8em;
          left: -10em;
          transform: rotate(10deg);
        }

        &::before {
          content: ' ';
          background-color: $c-app-bg;
          display: block;
          width: 80%;
          height: 20em;
          position: absolute;
          top: 8em;
          right: -10em;
          transform: rotate(-10deg);
        }
      }

      &__core {
        margin: 2em auto;
        background-color: $c-app-bg;
      }

      &__support {
        background-color: $c-process-container;

        &::after {
          content: ' ';
          background-color: $c-app-bg;
          display: block;
          width: 80%;
          height: 20em;
          position: absolute;
          bottom: 8em;
          right: -10em;
          transform: rotate(10deg);
        }

        &::before {
          content: ' ';
          background-color: $c-app-bg;
          display: block;
          width: 80%;
          height: 20em;
          position: absolute;
          bottom: 8em;
          left: -10em;
          transform: rotate(-10deg);
        }
      }
    }

    &__side-bar-left {
      position: absolute;
      left: 0;
      top: 50%;
      height: auto;
      width: 16em;
      font-size: 20px;
      margin-left: -8em;
      padding: 1em;
      background-color: $c-side-box;

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
      font-size: 20px;
      margin-right: -8em;
      padding: 1em;
      background-color: $c-side-box;


      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
    }
  }
</style>