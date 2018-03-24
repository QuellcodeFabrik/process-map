<template>
  <div class="evo-process-steps">
    <h2>{{ title }}</h2>

    <ul v-if="processStructure" class="evo-process-steps__list">
      <li v-for="step in processStructure.steps" class="evo-process-steps__item">
        {{ step.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Process, ProcessStep } from '../contracts';

  @Component({})
  export default class ProcessContainer extends Vue {
    @Prop() private title: string;
    @Prop() private processStructure: Process;

    private created() {
      this.$log.info('Process Container Component loaded.');
    }
  }
</script>

<style scoped>

</style>