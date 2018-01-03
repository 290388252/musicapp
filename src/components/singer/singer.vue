<template>
    <div class="singer">
      <list-view :data="singerList" @select="selectSinger"></list-view>
      <router-view></router-view>
      <div class="loading-contain" v-show="!singerList.length">
        <loading></loading>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .singer
    position fixed
    width 100%
    top: 88px
    bottom 0
    .loading-contain
      position absolute
      top 50%
      width 100%
      transform translateY(-50%)
</style>

<script type="text/ecmascript-6">
  import {getSingerList} from '../../api/singer';
  import {ERR_OK} from '../../api/config';
  import Singer from '../../common/js/singer';
  import ListView from '../../base/listview/listview.vue';
  import Loading from '../../base/loading/loading.vue';
  import {mapMutations} from 'vuex';

  let HOT_NAME = '热门';
  let HOT_SINGER_LENGTH = 10;

    export default{
      data() {
        return {
          singerList: []
        };
      },
      created() {
        setTimeout(() => {
          this._getSingerList();
        }, 500);
      },
      methods: {
        selectSinger(item) {
          this.$router.push({
              path: `/singer/${item.id}`
          });
          this.setSinger(item);
        },
        _getSingerList() {
          getSingerList().then((res) => {
            if (res.code === ERR_OK) {
              this.singerList = this._normalizeSinger(res.data.list);
              console.log(this.singerList);
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
            let hot = [];
            let ret = [];
            // 遍历数组map key为第几位
            for (let key in map) {
                let val = map[key];
                if (val.title.match(/[a-zA-Z]/)) {
                  ret.push(val);
                } else if (val.title === HOT_NAME) {
                    hot.push(val);
                }
            }
            // a-b升序 b-a降序 用charcodeAt讲字母转化为数字，在进行排序
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            });
            // 链接两个数组
            return hot.concat(ret);
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        })
      },
      components: {
        ListView,
        Loading
      }
    };
</script>
