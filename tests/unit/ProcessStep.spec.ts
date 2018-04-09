import { expect } from 'chai';
import { mount, shallow } from '@vue/test-utils';
import { ProcessStep } from '@/contracts';
import ProcessStepComponent from '@/components/ProcessStep.vue';

describe('ProcessStep component', () => {
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

  it('should set the initial component properties', () => {
    const wrapper: any = mount(ProcessStepComponent, {
      mocks: {
        $log
      },
      propsData: { step, parallelSteps } });

    expect(wrapper.vm.showSubProcess).to.equal(false);
    expect(wrapper.vm.showHeader).to.equal(true);
  });

  it('should render the properties being passed from the parent', () => {
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
