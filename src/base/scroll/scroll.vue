<template>
    <div ref="wrapper">
      <slot></slot>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
</style>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
    export default{
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            },
            listenScroll: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
          setTimeout(() => {
                this._initScroll();
                this.refresh();
            }, 20);
        },
        methods: {
          _initScroll() {
              if (!this.$refs.wrapper) {
                  console.log('bad');
                  return;
              }
              this.scroll = new BScroll(this.$refs.wrapper, {
                  probeType: this.probeType,
                  click: this.click
              });
              if (this.listenScroll) {
                let me = this;
                this.scroll.on('scroll', (pos) => {
                  me.$emit('scroll', pos);
                });
              }
              console.log(this.scroll);
          },
          enable() {
              this.scroll && this.scroll.enable();
          },
          disable() {
              this.scroll && this.scroll.disable();
          },
          refresh() {
              this.scroll && this.scroll.refresh();
          },
          scrollTo() {
            // agruments  动画 0 1 2....
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
          },
          scrollToElement() {
            // agruments  动画 0 1 2....
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
          }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh();
                }, 20);
            }
        }
    };
</script>
