<template>
    <div class="m-header">
      <div class="icon"></div>
      <div class="text">My Music App</div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl";
  @import "../common/stylus/mixin.styl"

  .m-header
    position relative
    height 44px
    text-align center
    color: $color-theme
    font-size 0
    .icon
      display inline-block
      vertical-align top
      margin-top 6px
      width 30px
      height 30px
      margin-right 9px
      background-size 30px 30px
    .text
      display inline-block
      vertical-align top
      line-height 44px
      font-size $font-size-large
</style>

<script type="text/ecmascript-6">
    export default{};
</script>
