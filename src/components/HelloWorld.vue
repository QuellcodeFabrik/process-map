<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://github.com/vuejs/vue-cli/tree/dev/docs" target="_blank">vue-cli documentation</a>.
      {{ testMe() }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiMixin from '../utils/api.utils';

@Component({
  created() {
    console.log('HelloWorld Component loaded.');
  },
  mixins: [ApiMixin]
})
export default class HelloWorld extends Vue {
  @Prop() private msg: string;

  /**
   * A neat little function to try out stuff.
   *
   * @returns {string}
   */
  private testMe(): string {
    return 'Test string';
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
