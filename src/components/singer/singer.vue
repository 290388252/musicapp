<template>
    <div class="singer">
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .singer
    display fixed
    width 100%
    height 100%
</style>

<script type="text/ecmascript-6">
  import {getSingerList} from '../../api/singer';
  import {ERR_OK} from '../../api/config';
  import Singer from '../../common/js/singer';

  let HOT_NAME = '热门';
  let HOT_SINGER_LENGTH = 10;

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
              console.log(this._normalizeSinger(this.singerList));
            }
          });
        },
        _normalizeSinger(list) {
            let map = {
              hot: {
                  title: HOT_NAME,
                  item: []
              }
            };
            list.forEach((item, index) => {
                if (index < HOT_SINGER_LENGTH) {
                    map.hot.item.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }));
                }
                const key = item.Findex;
                if (!map[key]) {
                    map[key] = {
                      title: key,
                      item: []
                    };
                }
                map[key].item.push(new Singer({
                  id: item.Fsinger_mid,
                  name: item.Fsinger_name
                }));
            });
            return map;
        }
      }
    };
</script>
