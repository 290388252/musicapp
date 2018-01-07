<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper" ref="playBtn" v-show="songs.length>0">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放歌曲</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :data="songs" class="list" ref="list" :probeType="probeType" :listenScroll="listenScroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectSong"></song-list>
      </div>
      <div class="loading-contain" v-show="!songs.length">
        <loading></loading>
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
      .play-wrapper
        position: absolute
        bottom 10px
        left 33%
        height 18px
        line-height 18px
        border 2px solid whitesmoke
        border-radius 30px
        padding 5px
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
      .loading-contain
        position absolute
        top 50%
        width 100%
        transform translateY(-50%)

</style>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll.vue';
  import SongList from '../../base/song-list/song-list.vue';
  import Loading from '../../base/loading/loading.vue';
  import {prefixStyle} from '../../common/js/dom';
  import {mapActions} from 'vuex';

  const RESERVED_HEIGHT = 40;
  const transform = prefixStyle('transform');

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
          let scale = 1;
          this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`;
          const percent = Math.abs(newY / this.imageHeight);
          if (newY > 0) {
            scale = 1 + percent;
            zIndex = 10;
          }
          if (newY < translateY) {
            zIndex = 10;
            this.$refs.bgImage.style.paddingTop = 0;
            this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
            this.$refs.playBtn.style.display = 'none';
          } else {
            this.$refs.bgImage.style.paddingTop = '70%';
            this.$refs.bgImage.style.height = 0;
            this.$refs.playBtn.style.display = '';
          }
          this.$refs.bgImage.style.zIndex = zIndex;
          this.$refs.bgImage.style[transform] = `scale(${scale})`;
        }
    },
    methods: {
      scroll(pos) {
          this.scrollY = pos.y;
      },
      back() {
          this.$router.back();
      },
      ...mapActions([
          'selectPlay'
      ]),
      selectSong(song, index) {
          console.log(index);
          this.selectPlay({
              list: this.songs, // play all song list
              index
          });
      }
    },
    components: {
      Scroll,
      SongList,
      Loading
    }
  };
</script>
