<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from './components/mheader/m-header.vue';
  import Tab from './components/tab/tab.vue';
  import Player from './components/Player/player.vue';

export default {
  components: {
    MHeader,
    Tab,
    Player
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/variable.styl"

  #app
    color: $color-theme
</style>
