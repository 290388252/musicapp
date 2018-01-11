<template>
    <div class="progress-bar" ref="progressBar">
      <div class="bar-inner">
        <div class="progress" ref="progress"></div>
        <div class="progress-btn-wrapper" ref="progressBtn"
             @touchstart.prevent="progressTouchStart"
             @touchmove.prevent="progressTouchMove"
             @touchend.prevent="progressTouchEnd">
          <div class="progress-btn">
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 14px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        width: 30px
        height: 30px
        top -12px
        .progress-btn
          position: relative
          border: 2px solid $color-text
          border-radius: 50%
          width: 19px
          height: 19px
          top 4px
          box-sizing: border-box
          background: gray
</style>

<script type="text/ecmascript-6">
  import {prefixStyle} from '../../common/js/dom';
  const transform = prefixStyle('transform');

    export default{
        props: {
            percent: {
                type: Number,
                default: 0
            }
        },
        methods: {
          progressTouchStart() {

          },
          progressTouchMove() {

          },
          progressTouchEnd() {

          }
        },
        watch: {
          percent(newPercent) {
              if (newPercent >= 0) {
                const barWidth = this.$refs.progressBar.clientWidth - 19;
                const offsetWidth = newPercent * barWidth;
                this.$refs.progress.style.width = `${offsetWidth}px`;
                this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
              }
          }
        }
    };
</script>
