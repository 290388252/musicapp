<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/variable.styl";

  #app
    color: $color-theme
</style>
