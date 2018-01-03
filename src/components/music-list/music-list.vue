<template>
    <div class="music-list">
      <div class="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="title"></h1>
      <div class="bg-image" :style="bgStyle">
        <div class="filter"></div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .music-list
    position fixed
    z-index 100
    top 0
    right 0
    left 0
    bottom 0
    background $color-background
    .back
      position absolute
      top 0
      left 5px
      z-index 150
      .icon-back
        display block
        padding 10px
        font-size $font-size-large-x
        color $color-theme
    .title
      position absolute
      z-index: 40
      top 0
      left 10%
      width 80%
      no-wrap()
      text-align center
      line-height 30px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: absolute
      width 100%
      height 0
      padding-top 70%
      transform-origin: top
      background-size: cover
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
        },
        computed: {
          bgStyle() {
            return `background-image:url(${this.bgImage})`;
          }
        }
    };
</script>
