<template>
    <div class="player" v-show="playList.length>0">
      <transition name="normal"
                  @enter="enter"
                  @after-enter="afterEnter"
                  @leave="leave"
                  @after-leave="afterLeave"
      >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="subtitle">{{currentSong.singer}}</h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdwrapper">
              <div class="cd">
                <img :src="currentSong.image" class="image" :class="cdCls">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i @click="pre" class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i :class="playingIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
      </transition>
      <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image" :class="cdCls">
        </div>
        <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.singer}}</p>
        </div>
        <div class="control">
          <i :class="playingMiniIcon" @click.stop="togglePlaying" style="font-size: 30px"></i>
        </div>
        <div class="control">
          <i class="icon-playlist" style="font-size: 30px"></i>
        </div>
      </div>
      </transition>
      <audio :src="currentSong.url" ref="audio"></audio>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .player
    .normal-player
      position: fixed
      left 0
      right 0
      top 0
      bottom 0
      z-index 150
      background: $color-background
      .background
        position: absolute
        left 0
        right 0
        top 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
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
          top 10px
          text-align center
          left 10%
          width 80%
          z-index 50
        .subtitle
          position absolute
          top 40px
          text-align center
          left 10%
          width 80%
          z-index 50
      .middle
        position fixed
        width 100%
        top 88px
        bottom 170px
        white-space: nowrap
        border-radius 50%
        font-size: 0
        .middle-l
          display inline-block
          vertical-align top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              .image
                position: absolute
                left: 11px
                top: 11px
                width: 93%
                height: 93%
                border-radius: 50%
                &.play
                  animation: rotate 20s linear infinite
                &.pause
                  animation-play-state: paused
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active,&.normal-leave-active
        transition all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter,&.normal-leave-to
        opacity 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display flex
      align-items center
      position fixed
      left 0
      bottom 0
      z-index: 180
      width 100%
      height: 60px
      background: $color-highlight-background
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 20s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)

</style>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex';
  import animations from 'create-keyframe-animation';
  import {prefixStyle} from '../../common/js/dom';

  const transform = prefixStyle('transform');

    export default{
      computed: {
        cdCls() {
          return this.playing ? 'play' : 'pause';
        },
        playingIcon() {
            return this.playing ? 'icon-pause' : 'icon-play';
        },
        playingMiniIcon() {
          return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
        },
        ...mapGetters([
          'fullScreen',
          'playList',
          'currentSong',
          'playing',
          'currentIndex'
        ])
      },
      created() {
        console.log(this.currentSong);
      },
      methods: {
        back() {
          this.setFullScreen(false);
        },
        open() {
          this.setFullScreen(true);
        },
        togglePlaying() {
          this.setPlayState(!this.playing);
        },
        pre() {
            let index = this.currentIndex - 1;
            if (index === -1) {
                index = this.playList.length - 1;
            }
            this.setCurrentIndex(index);
        },
        next() {
          let index = this.currentIndex + 1;
          if (index === this.playList.length) {
            index = 0;
          }
          this.setCurrentIndex(index);
        },
        enter(el, done) {
            const {x, y, scale} = this._getPos();

            let animation = {
                0: {
                    transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                },
                60: {
                    transform: `translate3d(0,0,0) scale(1,1)`
                },
                100: {
                    transform: `translate3d(0,0,0) scale(1)`
                }
            };

            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,
                    easing: 'linear'
                }
            });

            animations.runAnimation(this.$refs.cdwrapper, 'move', done);
        },
        afterEnter() {
          animations.unregisterAnimation('move');
          this.$refs.cdwrapper.style.animation = '';
        },
        leave(el, done) {
          this.$refs.cdwrapper.style.transition = 'all 0.4s';
          const {x, y, scale} = this._getPos();
          this.$refs.cdwrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
          this.$refs.cdwrapper.addEventListener('transitionend', done);
        },
        afterLeave() {
          this.$refs.cdwrapper.style.transition = '';
          this.$refs.cdwrapper.style[transform] = '';
        },
        _getPos() {
            const targetWidth = 30;
            const paddingleft = 40;
            const paddingBottom = 30;
            const paddingTop = 80;
            const width = window.innerWidth * 0.8;
            const scale = targetWidth / width;
            const x = -(window.innerWidth / 2 - paddingleft);
            const y = window.innerHeight - paddingTop - (width / 2) - paddingBottom;
            return {
                x,
                y,
                scale
            };
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlayState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX'
        })
      },
      watch: {
          currentSong() {
              this.$nextTick(() => {
                this.$refs.audio.play();
              });
          },
          playing(newPlaying) {
              let audio = this.$refs.audio;
              this.$nextTick(() => {
                newPlaying ? audio.play() : audio.pause();
              });
          }
      }
    };
</script>
