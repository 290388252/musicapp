<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage">
    </music-list>
  </transition>
</template>

<style lang="stylus" rel="stylesheet/stylus">
</style>

<script type="text/ecmascript-6">
  import MusicList from '../music-list/music-list.vue';
  import {mapGetters} from 'vuex';
  import {getSongList} from '../../api/recommend';
  import {ERR_OK} from '../../api/config';

  export default {
    computed: {
      ...mapGetters([
        'disc'
      ]),
      title() {
        return this.disc.dissname;
      },
      bgImage() {
        return this.disc.imgurl;
      }
    },
    created() {
        this._getSongList();
    },
    methods: {
      _getSongList() {
        getSongList(this.disc.dissid).then((res) => {
            if (res.code === ERR_OK) {
                console.log(res.cdlist[0].songlist);
            }
        });
      }
    },
    components: {
      MusicList
    },
    mounted() {
      console.log(this.disc.imgurl);
    }
  };
</script>
