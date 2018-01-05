<template>
    <div class="song-list">
      <ul>
        <li v-for="(item, index) in songs" @click="select(item, index)" class="item">
          <div class="content">
            <h2 class="name">{{item.name}}</h2>
            <p class="desc">{{getDesc(item)}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .song-list
    .item
      display flex
      align-items center
      box-sizing border-box
      height 64px
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
        .desc
          no-wrap()
          font-size $font-size-medium
          color $color-text-d
</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            songs: {
                type: Array,
                default: []
            }
        },
        methods: {
            getDesc(item) {
                return `${item.singer} - ${item.album}`;
            },
            select(item, index) {
                this.$emit('select', item, index);
            }
        }
    };
</script>
