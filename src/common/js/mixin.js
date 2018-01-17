/**
 * yanchao
 * Created by Administrator on 2018/1/17.
 */
import {mapGetters} from 'vuex';

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playList);
  },
  activated() {
    this.handlePlaylist(this.playList);
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal);
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method');
    }
  }
};
