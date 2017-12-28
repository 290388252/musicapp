<template>
    <div class="load">
      <img width="24" height="24" src="./loading.gif" alt="">
      <p class="desc">{{title}}</p>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .load
    width 100%
    text-align center
    .desc
      font-size: $font-size-small
      color: $color-text-l
</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            title: {
                type: String,
                default: 'loading...'
            }
        }
    };
</script>
