<template>
    <div class="player" v-show="playList.length>0">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="log">
            <i class="icon-back"></i>
          </div>
          <h1 class="title"></h1>
          <h2 class="subtitle"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd">
                <img src="" class="image">
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
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i class="icon-center"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="mini-player" v-show="!fullScreen">
        <div class="icon"></div>
        <div class="text">
          <h2 class="name"></h2>
          <p class="desc"></p>
        </div>
        <div class="control"></div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
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
      .top
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
</style>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';

    export default{
      computed: {
        ...mapGetters([
          'fullScreen',
          'playList',
          'currentSong'
        ])
      },
      created() {
        console.log(this.currentSong);
      },
      methods: {
        log() {
          this.$router.back();
        }
      }
    };
</script>
