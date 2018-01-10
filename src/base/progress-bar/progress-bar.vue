<template>
    <div class="progress-bar">
      <div class="bar-inner">
        <div class="progress"></div>
        <div class="progress-btn-wrapper">
          <div class="progress-btn">
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
</style>

<script type="text/ecmascript-6">
    export default{};
</script>
