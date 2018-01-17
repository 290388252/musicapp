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
        <div class="middle"
                    @touchstart.prevent="middleTouchStart"
                    @touchmove.prevent="middleTouchMove"
                    @touchend="middleTouchEnd">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdwrapper">
              <div class="cd" :class="cdCls">
                <img :src="currentSong.image" class="image">
              </div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyric" :data="lyricList">
            <div class="lyric-wrapper">
              <div>
                <p class="text" v-for="line in lyricList">{{line.text}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar class="progress-bar" :percent="percent" @precentChange="precentChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i :class="playingIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
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
          <progress-circle :radius="radius" :percent="percent">
            <i class="icon-mini" :class="playingMiniIcon" @click.stop="togglePlaying" style="font-size: 32px"></i>
          </progress-circle>
        </div>
        <div class="control">
          <i class="icon-playlist" style="font-size: 30px"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
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
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%
        .middle-r
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            position: absolute
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display inline-block
            width: 8px
            height: 8px
            border-radius: 50%
            margin: 0 4px
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display flex
          align-items center
          width 80%
          margin 0  auto
          padding 10px 0
          .time
            font-size $font-size-medium
            flex 1 0 30px
            line-height 30px
            &.time-l
              text-align left
            &.time-r
              text-align right
          .progress-bar-wrapper
            flex 20 0 30px
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
            animation: rotate 20s linear forwards
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
        .icon-mini
          position absolute
          color: gray
          top 3px
          left 3px
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
  import {playMode} from '../../common/js/config';
  import {shuffle} from '../../common/js/utils';
  import ProgressBar from '../../base/progress-bar/progress-bar.vue';
  import ProgressCircle from '../../base/progress-circle/progress-circle.vue';
  import Scroll from '../../base/scroll/scroll.vue';
  import { ERR_OK } from '../../api/config';

  const transform = prefixStyle('transform');
  const transitionDuration = prefixStyle('transitionDuration');
  export default{
    data() {
        return {
            songReady: false,
            currentTime: 0,
            radius: 38,
            lyricList: [],
            currentShow: 'cd'
        };
    },
    computed: {
      cdCls() {
        return this.playing ? 'play' : 'play pause';
      },
      playingIcon() {
        return this.playing ? 'icon-pause' : 'icon-play';
      },
      playingMiniIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
      },
      disableCls() {
        return this.songReady ? '' : 'disable';
      },
      percent() {
          return this.currentTime / this.currentSong.duration;
      },
      iconMode() {
          return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
      },
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex',
        'mode',
        'sequenceList'
      ])
    },
    created() {
      this.touch = {};
      console.log(this.currentSong);
      this._getLyrics();
    },
    methods: {
      back() {
        this.setFullScreen(false);
      },
      open() {
        this.setFullScreen(true);
      },
      togglePlaying() {
        if (!this.songReady) {
          return;
        }
        this.setPlayState(!this.playing);
      },
      end() {
        if (this.mode === playMode.loop) {
          this.loop();
        } else {
          this.next();
        }
      },
      loop() {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      },
      prev() {
        if (!this.songReady) {
            return;
        }
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playList.length - 1;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
        this.songReady = false;
      },
      next() {
        if (!this.songReady) {
          return;
        }
        let index = this.currentIndex + 1;
        if (index === this.playList.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
            this.togglePlaying();
        }
        this.songReady = false;
      },
      updateTime(e) {
          this.currentTime = e.target.currentTime;
      },
      format(interval) {
          interval = interval | 0;
          const minute = interval / 60 | 0;
          let second = interval % 60;
          let seconds = second.toString().length;
          while (seconds < 2) {
              second = '0' + second;
              seconds++;
          }
          return `${minute} : ${second}`;
      },
      time_to_sec(time) {
        let str = time;
        let arr = str.split(':');
        let seconds = arr[0] * 60 + arr[1] * 1;
        return seconds;
      },
      ready() {
          this.songReady = true;
      },
      error() {
        this.songReady = true;
        console.log('');
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
      precentChange(percent) {
         this.$refs.audio.currentTime = this.currentSong.duration * percent;
         if (!this.playing) {
             this.togglePlaying();
         }
      },
      changeMode() {
        const mode = (this.mode + 1) % 3;
        this.setPlayMode(mode);
        console.log(this.sequenceList);
        let list = [];
        if (this.mode === playMode.random) {
          list = shuffle(this.sequenceList);
          console.log(list);
        }
      },
      middleTouchStart(e) {
          this.touch.initiated = true;
          const touch = e.touches[0];
          this.touch.startX = touch.pageX;
          this.touch.startY = touch.pageY;
      },
      middleTouchMove(e) {
          if (!this.touch.initiated) {
              return;
          }
          const touch = e.touches[0];
          const detalX = touch.pageX - this.touch.startX;
          const detalY = touch.pageY - this.touch.startY;
          if (Math.abs(detalY) > Math.abs(detalX)) {
              return;
          }
          const left = this.currentShow === 'cd' ? 0 : -window.innerWidth + 32;
          const width = Math.min(0, Math.max(-window.innerWidth, left + detalX));
          this.touch.percent = Math.abs(width / window.innerWidth);
          this.$refs.lyric.$el.style[transform] = `translate3d(${width}px,0,0)`;
          this.$refs.lyric.$el.style[transitionDuration] = 0;
          this.$refs.middleL.style.opacity = 1 - this.touch.percent;
          this.$refs.middleL.style[transitionDuration] = 0;
      },
      middleTouchEnd() {
        let offsetWidth;
        let opacity;
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth + 32;
            opacity = 0;
            this.currentShow = 'lyric';
            this.touch.percent = undefined;
          } else {
            offsetWidth = 0;
            opacity = 1;
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetWidth = 0;
            this.currentShow = 'cd';
            opacity = 1;
            this.touch.percent = undefined;
          } else {
            offsetWidth = -window.innerWidth + 32;
            opacity = 0;
          }
        }
        const time = 300;
        this.$refs.lyric.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
        this.$refs.lyric.$el.style[transitionDuration] = `${time}ms`;
        this.$refs.middleL.style.opacity = opacity;
        this.$refs.middleL.style[transitionDuration] = `${time}ms`;
        this.touch.initiated = false;
      },
      _getLyrics() {
        this.$http.get('api/lyric').then((response) => {
          if (response.body.errno === ERR_OK) {
            let lyricLists = this._normlizeLyric(response.data.data);
            this.lyricList = lyricLists.lyric;
            console.log(this.lyricList);
          }
        });
      },
      _normlizeLyric(list) {
          let lyrics = {
              lyric: []
          };
            list.forEach((item) => {
              lyrics.lyric.push({
                  time: this.time_to_sec(item.time),
                  text: item.text
              });
          });
          return lyrics;
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE'
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
    },
    components: {
      ProgressBar,
      ProgressCircle,
      Scroll
    }
  };
</script>
