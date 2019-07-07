<template>
  <div 
    class="evo-process-step"
    :class="{
      'evo-process-step--is-arrow': isArrowStyle,
      'evo-process-step--is-clickable': !!step.url,
      'evo-process-step--has-header': showHeader
    }"
    @click="triggerStepAction()"
    ref="step">
    <div
      class="evo-process-step__header evo-process-step-header"
      v-if="showHeader">
      <span class="evo-process-step-header__id">{{ step.id }}</span>
      <span class="evo-process-step-header__label">{{ step.label }}</span>
    </div>

    <div
      class="evo-process-step__body"
      ref="arrowBody">
      <span>{{ step.title }}</span>
    </div>

    <div
      class="evo-process-step__arrow-head evo-process-step-arrow-head"
      v-if="isArrowStyle"
      ref="arrowHead">
      <img
        src="../assets/arrow-head-bg.svg"
        class="evo-process-step-arrow-head__bg"
        ref="arrowHeadBg" />
      <img
        src="../assets/arrow-head.svg"
        class="evo-process-step-arrow-head__fg"
        ref="arrowHeadFg" />
    </div>

    <div
      class="evo-process-step__sub-process-trigger"
      v-if="step.subProcess"
      @mouseover="showSubProcess = true">
    </div>

    <transition appear>
      <div
        class="evo-process-step__sub-process"
        v-if="showSubProcess && step.subProcess"
        :class="{
        'evo-process-step__sub-process--asymmetric': isArrowStyle
        }"
        @mouseleave="showSubProcess = false">
        <sub-process-view :process="step.subProcess"></sub-process-view>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ProcessStep as Step } from '../contracts';
  import SubProcessView from '@/components/SubProcessView.vue';
  import ConfigurationMixin from '../utils/config.utils';

  @Component({
    name: 'ProcessStep',
    components: {
      SubProcessView
    },
    mixins: [ConfigurationMixin]
  })
  export default class ProcessStep extends Vue {
    @Prop() private step: Step;
    @Prop() private type: number;

    private showSubProcess: boolean = false;
    private showHeader: boolean = true;

    protected created() {
      this.$log.debug('ProcessStep::created()');
      this.showHeader = this.getConfigurationValue('SHOW_STEP_HEADER') as boolean;
    }

    protected mounted() {
      const stepElement = this.$refs.step as any;
      const arrowHead = this.$refs.arrowHead as any;
      const arrowHeadBg = this.$refs.arrowHeadBg as any;
      const arrowHeadFg = this.$refs.arrowHeadFg as any;

      setTimeout(() => {
        const stepHeight = stepElement.clientHeight;

        arrowHeadBg.style.height = `${stepHeight + 2}px`;
        arrowHeadFg.style.height = `${stepHeight}px`;
        arrowHeadBg.style.width = `${(stepHeight + 2) / 2}px`;
        arrowHeadFg.style.width = `${stepHeight / 2}px`;

        if (this.isArrowStyle) {
          stepElement.style.marginRight = `${stepHeight / 2 + 10}px`;
        }
      }, 100);
    }

    /**
     * If the process step has a link defined, that link will be opened in a
     * new tab.
     */
    private triggerStepAction(): void {
      this.$log.debug('ProcessStep::triggerStepAction()');

      if (this.step.url) {
        window.open(this.step.url, '_blank');
      } else {
        this.$log.error('ProcessStep::triggerStepAction() -> The process step has no URL to be opened.');
      }
    }

    get isArrowStyle(): boolean {
      return this.type === 1 && this.getConfigurationValue('USE_ARROW_STYLE') as boolean;
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .evo-process-step-header {
    display: flex;
    align-items: center;
    height: 32px;
    width: 95%;
    padding: 0;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid grey;
    color: $c-process-step-text;

    &__id {
      margin-right: .5rem;
    }

    &__label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .evo-process-step-arrow-head {
    position: relative;

    &__bg {
      position: absolute;
      top: -1px;
      bottom: -1px;
      left: 0;
    }

    &__fg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -1px;
    }
  }

  .evo-process-step {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    height: 100%;
    width: 100%;
    min-width: 10rem;
    text-align: left;
    background: #FFE200;
    border: 1px solid #2F2F2F;
    margin-right: .5em;
    margin-bottom: 1em;
    cursor: default;

    &__arrow-head {
      position: absolute;
      left: 100%;
      top: 0;
      bottom: 0;
      height: 100%;
    }

    &__body {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      padding: 0 .6rem;
      font-size: 20px;
      pointer-events: none;
    }

    &__sub-process-trigger {
      position: absolute;
      width: 0;
      height: 0;
      bottom: 0;
      left: 0;
      border-right: 16px solid transparent;
      border-left: 16px solid $c-sub-process-trigger;
      border-top: 16px solid transparent;
    }

    &__sub-process {
      position: absolute;
      bottom: 0;
      left: -3rem;
      right: -3rem;
      z-index: 1;

      &--asymmetric {
        left: -2em;
        right: -4rem;
      }
    }

    &--is-arrow {
      border-right: none;
    }

    &--is-clickable {
      cursor: pointer;
    }
  }
</style>
