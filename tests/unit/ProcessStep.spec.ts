import { expect } from 'chai';
import { shallow } from '@vue/test-utils';
import { ProcessStep } from '@/contracts';
import ProcessStepComponent from '@/components/ProcessStep.vue';

describe('ProcessStep.vue', () => {
  it('renders the step properties when passed', () => {
    const step: ProcessStep = {
      id: 'id-01',
      position: '1',
      title: 'Test step',
      label: 'Non-empty label',
      url: 'http://www.google.com',
      showOnMap: true
    };
    const parallelSteps = false;
    const $log = { debug: () => {}, info: () => {}, error: () => {} };

    const wrapper = shallow(ProcessStepComponent, {
      mocks: {
        $log
      },
      propsData: { step, parallelSteps }
    });

    expect(wrapper.text()).to.include('id-01');
    expect(wrapper.text()).to.include('Non-empty label');
    expect(wrapper.text()).to.include('Test step');
  });
});
