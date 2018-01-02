<template>
    <scroll :data="data" class="listview" ref="listview" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
      <ul>
        <li v-for="group in data" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li v-for="item in group.item" class="list-group-item" @click="selectItem(item)">
              <img v-lazy="item.avatar" width="55" height="55" style="border-radius: 50%">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
        <ul>
          <li v-for="(item, index) in shortcutList" class="item" :data-index="index" :class="{'current': currentIndex === index}">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="list-fixed" v-show="fixedTitle" ref="fixed">
        <h1 class="fixed-title">{{fixedTitle}}</h1>
      </div>
    </scroll>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .listview
    position: relative
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
        &.current
          font-size $font-size-medium
          font-family: Helvetica
          color: $color-theme
    .list-fixed
      position absolute
      top 0
      left 0
      width: 100%
      .fixed-title
        background $color-text-d
        height 28px
        line-height 28px
        padding-left 8px
</style>

<script type="text/ecmascript-6">
  import Scroll from '../scroll/scroll.vue';
  import {getData} from '../../common/js/dom';

  const ANCHOR_HEIGHT = 17;
  const TITLE_HEIGHT = 28;

    export default{
        created() {
          this.touch = {};
          this.listenScroll = true;
          this.listHeight = [];
          this.probeType = 3;
        },
        data() {
          return {
            scrollY: -1,
            currentIndex: 0,
            diff: -1
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
          },
          fixedTitle() {
              if (this.scrollY >= 0) {
                  return '';
              }
              return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
          }
        },
        methods: {
          selectItem(item) {
              this.$emit('select', item);
          },
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
            this._scrollTo(anchorIndex);
            console.log(anchorIndex);
          },
          scroll(pos) {
            this.scrollY = pos.y;
          },
          _scrollTo(index) {
            if (!index && index !== 0) {
                return;
            }
            if (index < 0) {
                index = 0;
            } else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length - 2;
            }
            this.scrollY = -this.listHeight[index];
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
          },
          _calculateHeight() {
              this.listHeight = [];
              const list = this.$refs.listGroup;
              let height = 0;
              this.listHeight.push(height);
              for (let i = 0; i < list.length; i++) {
                  let item = list[i];
                  height += item.clientHeight;
                  this.listHeight.push(height);
              }
          }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this._calculateHeight();
                }, 20);
            },
            scrollY(newY) {
                const listHeight = this.listHeight;
              // 滚动到顶头部分
                if (newY >= 0) {
                  this.currentIndex = 0;
                  return;
                }
                // 滚动到中间部分
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i];
                    let height2 = listHeight[i + 1];
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i;
                        this.diff = height2 + newY;
                        return;
                    }
                }
              // 滚动到最底部分
                this.currentIndex = listHeight.length - 2;
            },
            diff(newVal) {
              let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
              if (this.fixedTop === fixedTop) {
                return;
              }
              this.fixedTop = fixedTop;
              this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
            }
        },
        components: {
            Scroll
        }
    };
</script>
