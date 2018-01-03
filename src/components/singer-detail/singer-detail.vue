<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<style lang="stylus" rel="stylesheet/stylus">

  .slide-enter-active,.slide-leave-active
    transition all 0.3s
  .slide-enter,.slide-leave-to
    transform translate3d(100%, 0, 0)
</style>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  import {getSingerDetail} from '../../api/singer';
  import {ERR_OK} from '../../api/config';
  import {createSong} from '../../common/js/songs';
  import musicList from '../music-list/music-list.vue';

    export default{
        data() {
            return {
                songs: []
            };
        },
        computed: {
          ...mapGetters([
              'singer'
          ]),
          bgImage() {
            return this.singer.avatar;
          },
          title() {
            return this.singer.name;
          }
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
                      this.songs = this._normalizeSongs(res.data.list);
                      console.log(this.songs);
                      console.log(res.data.list);
                  }
              });
            },
            _normalizeSongs(list) {
                let ret = [];
                list.forEach((item) => {
                    let {musicData} = item;
                    if (musicData.songid && musicData.albumid) {
                        ret.push(createSong(musicData));
                    }
                });
                return ret;
            }
        },
        components: {
          musicList
        }
    };
</script>
