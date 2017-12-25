<template>
  <div id="app">
    <m-header></m-header>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from './components/mheader/m-header.vue';

export default {
  components: {
    MHeader
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/variable.styl";

  #app
    color: $color-theme
</style>
