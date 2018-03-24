<template>
  <div class="evo-sub-process-view">
    <!-- TODO populate this field and adapt styling -->
    SUB PROCESS VIEW
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Process } from '../contracts';

  @Component({
    name: 'sub-process-view'
  })
  export default class SubProcessView extends Vue {
    @Prop() private process: Process;

    private created() {
      this.$log.debug('Sub Process View Component loaded.');
    }
  }
</script>

<style lang="scss" scoped>
  .evo-sub-process-view {
    position: relative;
    display: block;
    padding: 1em;
    line-height: 1.2em;
    background-color: white;
    -webkit-box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
  }
</style>