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
      <span>
        {{ 'evo.layout.box.customer-requirements' | translate }}
      </span>
    </div>
    <div class="evo-process-map__side-bar-right">
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

@Component({
  name: 'Home',
  components: {
    ProcessContainer
  },
  mixins: [ApiMixin]
})
export default class Home extends Vue {
  private processDefinitions: Process[] = [];
  private loading: boolean = true;

  protected created() {
    this.$log.debug('Home::created()');

    this.getProcessDefinition().then((result: Process[]) => {
      this.$log.debug('Home::created() -> processes', result);

      // this.processDefinitions = result;
      result.forEach((process: Process) => {
        this.processDefinitions.push(process);
      });
      this.loading = false;
    }).catch((err: Error) => {
      this.$log.error(err);
    });
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
        margin: 4em auto;
      }
    }

    &__side-bar-left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 1.8em;
      font-size: 20px;
      padding: 1em;
      background-color: $c-side-box;

      // background: -moz-linear-gradient(left, rgba(255,177,114,1) 0%, rgba(125,185,232,0) 100%); /* FF3.6-15 */
      // background: -webkit-linear-gradient(left, rgba(255,177,114,1) 0%,rgba(125,185,232,0) 100%); /* Chrome10-25,Safari5.1-6 */
      // background: linear-gradient(to right, rgba(255,177,114,1) 0%,rgba(125,185,232,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      // filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffb172', endColorstr='#007db9e8',GradientType=1 ); /* IE6-9 */

      &>span {
        display: block;
        position: absolute;
        left: -5.8em;
        height: 1em;
        width: 15em;
        top: 50%;
        text-align: center;
        transform: rotate(-90deg);
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
      padding: 1em;
      background-color: $c-side-box;

      // background: -moz-linear-gradient(left, rgba(125,185,232,0) 1%, rgba(163,183,197,0) 30%, rgba(255,177,114,1) 100%); /* FF3.6-15 */
      // background: -webkit-linear-gradient(left, rgba(125,185,232,0) 1%,rgba(163,183,197,0) 30%,rgba(255,177,114,1) 100%); /* Chrome10-25,Safari5.1-6 */
      // background: linear-gradient(to right, rgba(125,185,232,0) 1%,rgba(163,183,197,0) 30%,rgba(255,177,114,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      // filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#007db9e8', endColorstr='#ffb172',GradientType=1 ); /* IE6-9 */

      &>span {
        display: block;
        position: absolute;
        right: -6em;
        top: 50%;
        height: 1em;
        width: 15em;
        text-align: center;
        transform: rotate(90deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
      }
    }
  }
</style>
