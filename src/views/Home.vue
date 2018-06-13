<template>
  <div class="evo-process-map">
    <div class="evo-process-map-item evo-process-map-item__management">
      <process-container
          title="evo.layout.title.management-process"
          title-position="top"
          :process="getProcessData(3)"></process-container>
    </div>
    <div class="evo-process-map-item evo-process-map-item__core">
      <process-container
          title="evo.layout.title.core-process"
          title-position="center"
          :process="getProcessData(1)"></process-container>
    </div>
    <div class="evo-process-map-item evo-process-map-item__support">
      <process-container
          title="evo.layout.title.support-process"
          title-position="bottom"
          :process="getProcessData(2)"></process-container>
    </div>
    <div class="evo-process-map__side-bar-left">
      <img src="../assets/process-frame-background.svg" alt="Process Frame Background">
      <span>
        {{ 'evo.layout.box.customer-requirements' | translate }}
      </span>
    </div>
    <div class="evo-process-map__side-bar-right">
      <img src="../assets/process-frame-background.svg" alt="Process Frame Background">
      <span>
        {{ 'evo.layout.box.customer-satisfaction' | translate }}
      </span>
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
      padding: 0;
      margin: 0 auto;

      &__core {
        margin: 6em auto;
      }
    }

    &__side-bar-left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 1.8em;
      font-size: 20px;
      background-color: white;
      font-weight: 600;

       &>span {
        display: block;
        position: absolute;
        left: -7em;
        height: 1em;
        width: 15em;
        top: 50%;
        text-align: center;
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
      }
    }

    &__side-bar-right {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 1.8em;
      font-size: 20px;
      background-color: white;
      font-weight: 600;

      &>span {
        display: block;
        position: absolute;
        right: -6.3em;
        top: 50%;
        height: 1em;
        width: 15em;
        text-align: center;
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
      }
    }
  }
</style>