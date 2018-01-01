<template>
    <scroll :data="data" class="listview" ref="listview" :listenScroll="listenScroll">
      <ul>
        <li v-for="group in data" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li v-for="item in group.item" class="list-group-item">
              <img v-lazy="item.avatar" width="55" height="55" style="border-radius: 50%">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
        <ul>
          <li v-for="(item, index) in shortcutList" class="item" :data-index="index" :class="{'curret': currentIndex === index}">
            {{item}}
          </li>
        </ul>
      </div>
    </scroll>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .listview
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        background $color-text-d
        height 28px
        line-height 28px
        padding-left 8px
      .list-group-item
        padding 10px 0 10px 25px
        display flex
        align-items center
        border-bottom 1px solid $color-text-d
        &:first-child
          margin-top 20px
          border-top 1px solid $color-text-d
        .name
          margin-left 5px
          font-size: $font-size-medium
    .list-shortcut
      position absolute
      right 0
      top 12%
      z-index: 30
      text-align center
      font-size $font-size-small-s
      font-family: Helvetica
      color: $color-text-d
      margin-right 5px
      .item
        margin-top 5px
</style>

<script type="text/ecmascript-6">
  import Scroll from '../scroll/scroll.vue';
  import {getData} from '../../common/js/dom';

  const ANCHOR_HEIGHT = 17;

    export default{
        created() {
          this.touch = {};
          this.listenScroll = true;
        },
        data() {
          return {
            currentIndex: 0
          };
        },
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        computed: {
          shortcutList() {
            return this.data.map((group) => {
              return group.title.substr(0, 1);
            });
          }
        },
        methods: {
          onShortcutTouchStart(e) {
            let anchorIndex = getData(e.target, 'index');
            let fisrtTouch = e.touches[0];
            this.touch.y1 = fisrtTouch.pageY;
            this.touch.anchorIndex = anchorIndex;
            this._scrollTo(anchorIndex);
          },
          onShortcutTouchMove(e) {
            let firstTouch = e.touches[0];
            this.touch.y2 = firstTouch.pageY;
            let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
            let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
            console.log(anchorIndex);
            this._scrollTo(anchorIndex);
          },
          _scrollTo(index) {
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
          }
        },
        components: {
            Scroll
        }
    };
</script>
