import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import { ProcessStep, StepType } from '@/contracts';
import ProcessStepGroupComponent from '@/components/ProcessStepGroup.vue';

describe('ProcessStepGroup component', () => {
  const steps: ProcessStep[] = [{
    id: 'id-01',
    position: '1',
    title: 'Test step',
    label: 'Non-empty label',
    url: 'http://www.google.com',
    showOnMap: true
  }];
  const stepType = StepType.Box;
  const hasParallelSteps = false;
  const $log = {
    debug: () => { /* mock */ },
    info: () => { /* mock */ },
    error: () => { /* mock */ }
  };

  it('should not render any content of its own', () => {
    const wrapper: any = shallowMount(ProcessStepGroupComponent, {
      mocks: {
        $log
      },
      propsData: { steps, stepType, hasParallelSteps }
    });

    expect(wrapper.text()).to.equal('');
    expect(wrapper.classes().indexOf('evo-process-step-group')).to.be.above(-1);
  });
});
