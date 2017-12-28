<template>
    <div>
      歌手
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
</style>

<script type="text/ecmascript-6">
  import {getSingerList} from '../../api/singer';
  import {ERR_OK} from '../../api/config';

    export default{
      data() {
        return {
          singerList: []
        };
      },
      created() {
        this._getSingerList();
      },
      methods: {
        _getSingerList() {
          getSingerList().then((res) => {
            if (res.code === ERR_OK) {
              this.singerList = res.data.list;
              console.log(this.singerList);
            }
          });
        }
      }
    };
</script>
