import Vue from 'vue';
import axios from 'axios';
import Component from 'vue-class-component';
import {Process, ProcessStep, ProcessType} from '@/contracts';
import ConfigurationMixin from '@/utils/config.utils';

declare var window: {
  [key: string]: any; // add missing index definition
  prototype: Window;
  new(): Window;
};

declare module 'vue/types/vue' {
  interface Vue {
    getProcessDefinition(): Promise<Process[]>;
  }
}

@Component({
  mixins: [ConfigurationMixin]
})
export default class ApiMixin extends Vue {

  private SharePointApi = axios.create({
    baseURL: window.hasOwnProperty('_spPageContextInfo') ?
      this.getConfigurationValue('PROCESS_DEFINITION_LIST') as string : 'http://localhost:8000/',
    timeout: 30000,
    headers: {
      'Accept': 'application/json;odata=verbose',
      'Content-Type': 'application/json'
    }
  });

  public created() {
    this.$log.debug('API Mixin loaded.');
  }

  /**
   * Retrieves the process definition data and transforms it into a suitable
   * format that is being used in all components.
   *
   * @returns {Promise<Process[]>}
   */
  public getProcessDefinition(): Promise<Process[]> {
    const url = '_api/web/lists/GetByTitle(\'ProcessDefinition\')/items?' +
      '$select=Id,ProcessId,ProcessTitle,ProcessType,StepId,Title,StepLabel,' +
      'StepOrder,ReferenceUrl,ShowOnProcessMap,SubProcessId';

    return this.SharePointApi.get(url, {
      params: {}
    }).then((response: any) => {
      const processMapping: {[index: string]: Process} = {};
      const subProcessMappings: {[index: string]: Array<{ stepId: string, subProcessId: string }>} = {};
      const subProcessIds: string[] = [];

      response.data.d.results.forEach((processStepItem: any) => {
        const processId = processStepItem.ProcessId;

        if (!processMapping.hasOwnProperty(processStepItem.ProcessId)) {
          processMapping[processStepItem.ProcessId] = {
            id: processStepItem.Id,
            title: processStepItem.ProcessTitle,
            type: this.getProcessType(processStepItem.ProcessType),
            steps: []
          };
        }

        processMapping[processId].steps.push({
          id: processStepItem.StepId,
          position: processStepItem.StepOrder,
          title: processStepItem.Title,
          label: processStepItem.StepLabel,
          url: processStepItem.ReferenceUrl ?
            processStepItem.ReferenceUrl.Url : null,
          showOnMap: processStepItem.ShowOnProcessMap,
          subProcess: undefined
        });

        if (processStepItem.SubProcessId) {
          subProcessIds.push(processStepItem.SubProcessId);

          if (!subProcessMappings[processStepItem.ProcessId]) {
            subProcessMappings[processStepItem.ProcessId] = [];
          }

          subProcessMappings[processStepItem.ProcessId].push({
            stepId: processStepItem.StepId,
            subProcessId: processStepItem.SubProcessId
          });
        }
      });

      Object.keys(subProcessMappings).forEach((processId: string) => {
        subProcessMappings[processId].forEach((stepMapping: { stepId: string, subProcessId: string }) => {
          processMapping[processId].steps.filter((processStep: ProcessStep) => {
            return processStep.id === stepMapping.stepId;
          })[0].subProcess = processMapping[stepMapping.subProcessId];
        });
      });

      return Object.keys(processMapping)
        .filter((key: string) => subProcessIds.indexOf(key) === -1)
        .map((key: string) => processMapping[key]);
    });
  }

  /**
   * Transform processType string in to enum type.
   *
   * @param {string} processType
   * @returns {ProcessType}
   */
  private getProcessType(processType: string): ProcessType {
    switch (processType) {
      case 'Management':
        return ProcessType.Management;
      case 'Support':
        return ProcessType.Support;
      case 'Core':
        return ProcessType.Core;
      default:
        throw Error('Process type unknown: ' + processType);
    }
  }
}
