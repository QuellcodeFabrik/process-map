import axios from 'axios';
import { Process, ProcessType } from '@/contracts';

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

let baseUrl;
if (window.hasOwnProperty('_spPageContextInfo')) {
  baseUrl = window.PROCESS_DEFINITION_LIST || 'https://evocomcloud.sharepoint.com/sites/DemoApps/qm/';
} else {
  baseUrl = 'http://localhost:8000/';
}

const SharePointApi = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'Accept': 'application/json;odata=verbose',
    'Content-Type': 'application/json'
  }
});

const ApiMixin = {
  created() {
    this.$log.debug('API Mixin loaded.');
  },

  methods: {
    /**
     * Retrieves the process definition data and transforms it into a suitable
     * format that is being used in all components.
     *
     * @returns {Promise<Process[]>}
     */
    getProcessDefinition(): Promise<Process[]> {
      const url = '_api/web/lists/GetByTitle(\'ProcessDefinition\')/items?' +
        '$select=Id,ProcessId,ProcessTitle,ProcessType,StepId,Title,StepLabel,' +
        'StepOrder,ReferenceUrl,ShowOnProcessMap,SubProcessId';

      return SharePointApi.get(url, {
        params: {}
      }).then((response: any) => {
        const processMapping: {[index: string]: Process} = {};

        response.data.d.results.forEach((processStepItem: any) => {
          const processId = processStepItem.ProcessId;

          if (!processMapping.hasOwnProperty(processStepItem.ProcessId)) {
            processMapping[processStepItem.ProcessId] = {
              id: processStepItem.Id,
              title: processStepItem.ProcessTitle,
              type: getProcessType(processStepItem.ProcessType),
              steps: []
            };
          }

          processMapping[processId].steps.push({
            id: processStepItem.StepId,
            title: processStepItem.Title,
            label: processStepItem.ProcessLabel,
            url: processStepItem.ReferenceUrl ?
              processStepItem.ReferenceUrl.Url : null,
            showOnMap: processStepItem.ShowOnProcessMap,
            subProcess: processStepItem.SubProcessId
          });
        });

        return Object.keys(processMapping)
          .map((key: string) => processMapping[key]);
      });
    }
  }
} as any;

/**
 * Transform processType string in to enum type.
 *
 * @param {string} processType
 * @returns {ProcessType}
 */
function getProcessType(processType: string): ProcessType {
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

export default ApiMixin;
