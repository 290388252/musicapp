<template>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot></slot>
      </div>
      <div class="dots">
        <span class="dot" v-for="(item, index) in dots" :class="{active: currentIndex === index}"></span>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl';
  .slider
    min-height 1px
    position relative
    .slider-group
      position relative
      overflow hidden
      white-space nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position absolute
      right 0
      left 0
      bottom 8px
      text-align center
      font-size 0
      .dot
        display inline-block
        background $color-text-l
        border-radius: 50%
        margin-right 3px
        width: 8px
        height: 8px
        &.active
          width: 15px
          border-radius: 5px
          background: $color-text-ll
</style>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {addClass} from '../../common/js/dom';
    export default{
        data() {
            return {
              dots: [],
              currentIndex: 0,
              childrenlength: 0
            };
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
              type: Boolean,
              default: true
            },
            interval: {
              type: Number,
              default: 2500
            }
        },
        mounted() {
            setTimeout(() => {
                this._setSliderWidth();
                this._initDots();
                this._initSlider();
                if (this.autoPlay) {
                  this._play();
                }
            }, 20);
        },
        methods: {
            _setSliderWidth() {
              this.children = this.$refs.sliderGroup.children;
              this.childrenlength = this.children.length;
              let width = 0;
              let sliderWidth = this.$refs.slider.clientWidth;
              for (let i = 0; i < this.children.length; i++) {
                  let child = this.children[i];
                  addClass(child, 'slider-item');
                  child.style.width = sliderWidth + 'px';
                  width += sliderWidth;
              }
              if (this.loop) {
                  width += 2 * sliderWidth;
              }
              this.$refs.sliderGroup.style.width = width + 'px';
            },
            _initSlider() {
              this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
//                新版本的Better-Scroll
                snap: {
                    loop: this.loop,
                    threshold: 0.3,
                    speed: 400
                },
//                旧版本的Better-Scroll0.1.15
//                snapLoop: this.loop,
//                snapThreshold: 0.3,
//                snapSpeed: 400,
                click: true
              });

              this.slider.on('scrollEnd', () => {
                  let pageIndex = this.slider.getCurrentPage().pageX;
                  if (this.loop) {
                    this.currentIndex = pageIndex;
                  }
              });
            },
            _initDots() {
                this.dots = new Array(this.children.length);
            },
            _play() {
//              if (this.loop) {
//                pageIndex += 1;
//              }
              this.timer = setInterval(() => {
                  if (this.currentIndex >= this.childrenlength) {
                    this.currentIndex = 0;
                  } else {
                    this.currentIndex += 1;
                  }
                 this.slider.goToPage(this.currentIndex, 0, 400);
              }, this.interval);
            }
        }
    };
</script>
