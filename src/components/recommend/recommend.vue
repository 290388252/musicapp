<template>
    <div class="recommend">
      <scroll ref="scroll" class="recommend-content" :data="discList">
        <div>
        <div v-if='recommends.length' class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item" @click="selectItem(item)">
              <div class="icon">
                <img width="65" height="65" style="border-radius: 50%" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        </div>
        <div class="loading-contain" v-show="!discList.length">
          <loading></loading>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .recommend
    position fixed
    width 100%
    top: 88px
    bottom 0
    .recommend-content
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        width 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display flex
          box-sizing border-box
          align-items center
          padding 10px 20px 10px 20px
          border-top 1px solid $color-text-d
          .icon
            flex 0
            padding-right 10px
          .text
            display flex
            flex-direction column
            justify-content center
            flex 1
            line-height 20px
            font-size $font-size-medium
            .name
              color: $color-text
              margin-bottom 15px
            .desc
              color: $color-text-d
              margin-bottom 10px
      .loading-contain
        position absolute
        top 50%
        width 100%
        transform translateY(-50%)
</style>

<script type="text/ecmascript-6">
  import Loading from '../../base/loading/loading.vue';
  import Scroll from '../../base/scroll/scroll.vue';
  import Slider from '../../base/slider/slider.vue';
  import {getRecommend, getDiscList} from '../../api/recommend';
  import {ERR_OK} from '../../api/config';
  import {mapMutations} from 'vuex';

    export default{
      data() {
          return {
              recommends: [],
              discList: []
          };
      },
      created() {
        this._getRecommend();
        this._getDiscList();
      },
      methods: {
          selectItem(item) {
            this.$router.push({
              path: `/recommend/${item.dissid}`
            });
            this.setDisc(item);
          },
          ...mapMutations({
            setDisc: 'SET_DISC'
          }),
          _getRecommend() {
              getRecommend().then((res) => {
                  if (res.code === ERR_OK) {
                      this.recommends = res.data.slider;
                  }
              });
          },
          _getDiscList() {
            getDiscList().then((res) => {
              if (res.code === ERR_OK) {
                  this.discList = res.data.list;
                  console.log(this.discList);
              }
            });
          }
      },
      components: {
          Slider,
          Scroll,
          Loading
      }
    };
</script>
