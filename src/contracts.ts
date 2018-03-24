/**
 * The process type helps identify where to put the process on the process map.
 * Management processes are placed at the top, support processes at the bottom
 * and core processes in the center of the process map.
 */
export enum ProcessType {
  Core = 1,
  Support = 2,
  Management = 3
}

/**
 * The data structure representing a process that has to be visualized.
 */
export interface Process {
  id: string;
  title: string;
  type: ProcessType;
  steps: ProcessStep[];
}

/**
 * Each process can have multiple steps. Steps are those elements that are
 * getting visualized on the process map.
 */
export interface ProcessStep {
  id: string;
  title: string;
  label: string;
  url: string;
  showOnMap: true;
  subProcess?: Process;
}
