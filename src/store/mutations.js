/**
 *
 * Created by Administrator on 2018/1/3.
 */
import * as types from './mutations-type';

const mutations = {
// [types.SET_SINGER] just a function name , easy to read!!
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  }
};

export default mutations;
