/**
 * The process type helps identify where to put the process on the process map.
 * Management processes are placed at the top, support processes at the bottom
 * and core processes in the center of the process map.
 */
export enum ProcessType {
  Core,
  Support,
  Management
}

/**
 * The data structure representing a process that has to be visualized.
 */
export interface Process {
  id: number;
  title: string;
  type: ProcessType;
  steps: ProcessStep[] | ProcessStep[][];
}

/**
 * Each process can have multiple steps. Steps are those elements that are
 * getting visualized on the process map.
 */
export interface ProcessStep {
  id: number;
  title: string;
  label: string;
  url: string;
  showOnMap: true;
  subProcess: Process;
}
