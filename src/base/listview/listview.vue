<template>
    <scroll :data="data" class="listview">
      <ul>
        <li v-for="group in data" class="list-group">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li v-for="item in group.item" class="list-group-item">
              <img :src="item.avatar" width="60" height="60" style="border-radius: 50%">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
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
      .list-group-title
        background $color-text-d
        height 28px
        line-height 28px
        padding-left 8px
      .list-group-item
        padding 10px 0 10px 10px
        display flex
        align-items center
        border-bottom 1px solid $color-text-d
        .name
          margin-left 5px
          font-size: $font-size-medium
</style>

<script type="text/ecmascript-6">
  import Scroll from '../scroll/scroll.vue';
    export default{
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        components: {
            Scroll
        }
    };
</script>
