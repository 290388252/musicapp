<template>
    <div class="progress-circle">
      <svg :width="radius" :height="radius" viewBox="0 0 100 100" fill="transparent" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="progress-background" r="50" cx="50" cy="50"></circle>
        <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" stroke-dasharray="314" stroke-dashoffset="157"></circle>
      </svg>
      <slot></slot>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .progress-circle
    position relative
    circle
      stroke-width: 10px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: gray
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>

<script type="text/ecmascript-6">
    export default{
        props: {
          radius: {
            type: Number,
            default: 100
          }
        }
    };
</script>
