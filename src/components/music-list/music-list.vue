<template>
    <div class="music-list">
      {{title}}
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .music-list
    position fixed
    z-index 100
    top 0
    right 0
    left 0
    bottom 0
    background $color-background
</style>

<script type="text/ecmascript-6">
    export default{
        props: {
          bgImage: {
            type: String,
            default: ''
          },
          songs: {
            type: Array,
            default: []
          },
          title: {
            type: String,
            default: ''
          }
        }
    };
</script>
