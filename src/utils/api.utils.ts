import axios from 'axios';
import { ProcessDefinition } from '@/contracts';

declare var window: {
  [key:string]: any; // add missing index definition
  prototype: Window;
  new(): Window;
};

declare module 'vue/types/vue' {
  interface Vue {
    getProcessDefinition(): string;
  }
}

let baseUrl;
if (window.hasOwnProperty('_spPageContextInfo')) {
  baseUrl = 'http://localhost:8000/';
} else {
  baseUrl = window.PROCESS_DEFINITION_LIST || 'http://sps2013dev.evocom.de/sites/amgcollab/';
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
    console.log('API Mixin loaded.');
  },

  methods: {
    /**
     * Retrieves the process definition data and transforms it into a suitable
     * format that is being used in all components.
     *
     * @returns {Promise<any>}
     */
    getProcessDefinition(): Promise<ProcessDefinition[]> {
      const url = '_api/web/lists/GetByTitle(\'ProcessDefinition\')/items?' +
        '$select=Id,ProcessType';

      return SharePointApi.get(url, {
        params: {}
      }).then((response) => response.data);
    },
  }
} as any;

export default ApiMixin;
