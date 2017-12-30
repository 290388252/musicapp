<template>
    <scroll :data="data" class="listview">
      <ul>
        <li v-for="group in data" class="list-group">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li v-for="item in group.item">
              <img :src="item.avatar" width="40" height="40">
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
