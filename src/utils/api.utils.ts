import axios from 'axios';
import { ProcessStep } from '@/contracts';

declare var window: {
  [key: string]: any; // add missing index definition
  prototype: Window;
  new(): Window;
};

declare module 'vue/types/vue' {
  interface Vue {
    getProcessDefinition(): Promise<ProcessStep[]>;
  }
}

let baseUrl;
if (window.hasOwnProperty('_spPageContextInfo')) {
  baseUrl = window.PROCESS_DEFINITION_LIST || 'http://sps2013dev.evocom.de/sites/amgcollab/';
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
     * @returns {Promise<ProcessStep[]>}
     */
    getProcessDefinition(): Promise<ProcessStep[]> {
      const url = '_api/web/lists/GetByTitle(\'ProcessDefinition\')/items?' +
        '$select=Id,ProcessType';

      return SharePointApi.get(url, {
        params: {}
      }).then((response) => response.data);
    },
  }
} as any;

export default ApiMixin;
