<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
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
  const progressBtnWidth = 19;

    export default{
        props: {
            percent: {
                type: Number,
                default: 0
            }
        },
        created() {
            this.touch = {};
        },
        methods: {
          progressTouchStart(e) {
            this.touch.initiated = true;
            this.touch.startX = e.touches[0].pageX;
            this.touch.left = this.$refs.progress.clientWidth;
          },
          progressTouchMove(e) {
            if (!this.touch.initiated) {
                return;
            }
            const deltaX = e.touches[0].pageX - this.touch.startX;
            const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,
              Math.max(0, this.touch.left + deltaX));
            this._offset(offsetWidth);
          },
          progressTouchEnd() {
            this.touch.initiated = false;
            this._triggerPercent();
          },
          progressClick(e) {
              this._offset(e.offsetX);
              this._triggerPercent();
          },
          _offset(offsetWidth) {
            this.$refs.progress.style.width = `${offsetWidth}px`;
            this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
          },
          _triggerPercent() {
            const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
            const percent = this.$refs.progress.clientWidth / barWidth;
            this.$emit('precentChange', percent);
          }
        },
        watch: {
          percent(newPercent) {
              if (newPercent >= 0 && !this.touch.initiated) {
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                const offsetWidth = newPercent * barWidth;
                this._offset(offsetWidth);
              }
          }
        }
    };
</script>
