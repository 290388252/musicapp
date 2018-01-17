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

  export default {
    computed: {
      title() {
        return this.disc.dissname;
      },
      bgImage() {
        return this.disc.imgurl;
      },
      ...mapGetters([
        'disc'
      ])
    },
    methods: {
      // TODO
    },
    components: {
      MusicList
    },
    mounted() {
      console.log(this.disc.imgurl);
    }
  };
</script>
