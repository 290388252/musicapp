<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :data="songs" class="list" ref="list" :probeType="probeType" :listenScroll="listenScroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
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
      z-index 50
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
      position: relative
      width 100%
      height 0
      padding-top 70%
      transform-origin: top
      background-size: cover
    .bg-layer
      position relative
      height 100%
      background: $color-background
    .list
      position: fixed
      top 0
      bottom 0
      width 100%
      background: $color-background
      .song-list-wrapper
        padding-left 20px

</style>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll.vue';
  import SongList from '../../base/song-list/song-list.vue';

  const RESERVED_HEIGHT = 40;

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
    data() {
        return {
            scrollY: 0
        };
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`;
      }
    },
    created() {
        this.probeType = 3;
        this.listenScroll = true;
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight;
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
      this.$refs.list.$el.style.top = `${this.imageHeight}px`;
    },
    watch: {
        scrollY(newY) {
          let translateY = Math.max(this.minTranslateY, newY);
          let zIndex = 0;
          this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`;
          this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`;
          if (newY < translateY) {
            zIndex = 10;
            this.$refs.bgImage.style.paddingTop = 0;
            this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
          } else {
            this.$refs.bgImage.style.paddingTop = '70%';
            this.$refs.bgImage.style.height = 0;
          }
          this.$refs.bgImage.style.zIndex = zIndex;
        }
    },
    methods: {
      scroll(pos) {
          this.scrollY = pos.y;
      }
    },
    components: {
      Scroll,
      SongList
    }
  };
</script>
