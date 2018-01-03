<template>
  <transition name="slide">
    <div class="singer-detail">
      <div class="singer-detail-img">
        <img :src="singer.avatar" width="100%" height="280px">
      </div>
    </div>
  </transition>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .singer-detail
    position fixed
    z-index 100
    top 0
    right 0
    left 0
    bottom 0
    background $color-background

  .slide-enter-active,.slide-leave-active
    transition all 0.3s
  .slide-enter,.slide-leave-to
    transform translate3d(100%, 0, 0)
</style>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  import {getSingerDetail} from '../../api/singer';
  import {ERR_OK} from '../../api/config';

    export default{
        computed: {
          ...mapGetters([
              'singer'
          ])
        },
        created() {
            console.log(this.singer);
            this._getSingerDetail();
        },
        methods: {
            _getSingerDetail() {
              if (!this.singer.id) {
                  this.$router.push('/singer');
                  return;
              }
              getSingerDetail(this.singer.id).then((res) => {
                  if (res.code === ERR_OK) {
                      console.log(res.data.list);
                  }
              });
            }
        }
    };
</script>
