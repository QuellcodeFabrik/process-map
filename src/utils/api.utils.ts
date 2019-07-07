import Vue from 'vue';
import axios from 'axios';
import Component from 'vue-class-component';
import { Process, ProcessStep, ProcessType } from '@/contracts';
import ConfigurationMixin from '@/utils/config.utils';

declare var window: {
  [key: string]: any; // add missing index definition
  prototype: Window;
  new(): Window;
};

@Component({
  mixins: [ConfigurationMixin]
})
export default class ApiMixin extends Vue {

  private sharePointApi: any;

  public created() {
    this.$log.debug('API Mixin loaded.');

    this.sharePointApi = axios.create({
      baseURL: window.hasOwnProperty('_spPageContextInfo') ?
        this.getConfigurationValue('PROCESS_DEFINITION_LIST') as string : 'http://192.168.0.80:8080/',
      timeout: 30000,
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Retrieves the process definition data and transforms it into a suitable
   * format that is being used in all components.
   *
   * @returns {Promise<Process[]>}
   */
  public getProcessDefinition(): Promise<Process[]> {
    const url = '_api/web/lists/GetByTitle(\'ProcessDefinition\')/items?' +
      '$select=Id,Title,ProcessId,ProcessTitle,ProcessType,StepId,StepLabel,' +
      'StepOrder,ReferenceUrl,ShowOnProcessMap,SubProcessId';

    return this.sharePointApi.get(url, {
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
            title: ApiMixin.extractString(processStepItem.ProcessTitle),
            type: ApiMixin.getProcessType(processStepItem.ProcessType),
            steps: []
          };
        }

        processMapping[processId].steps.push({
          id: processStepItem.StepId,
          position: processStepItem.StepOrder,
          title: ApiMixin.extractString(processStepItem.Title),
          label: ApiMixin.extractString(processStepItem.StepLabel),
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
   * Transforms processType string into enum type.
   *
   * @param {string} processType
   * @returns {ProcessType}
   */
  private static getProcessType(processType: string): ProcessType {
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

  /**
   * Handles multiple SharePoint field types. If a translated string is given
   * by SharePoint it just returns that string. If a Term Set object is returned,
   * it extracts the translated string and returns it.
   *
   * @param {string | any} sharePointField
   * @returns {string}
   */
  private static extractString(sharePointField: string | any): string {
    if (!sharePointField) {
      return '';
    }

    if (typeof sharePointField === 'string') {
      return sharePointField as string;
    } else {
      if (
        !sharePointField.hasOwnProperty('results') ||
        sharePointField.results.length < 1 ||
        !sharePointField.results[0].hasOwnProperty('Label')
      ) {
        throw Error('SharePoint Term Set has wrong structure: ' + JSON.stringify(sharePointField));
      }
      return sharePointField.results[0].Label as string;
    }
  }
}
