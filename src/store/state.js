/**
 *yanchao
 * Created by Administrator on 2018/1/3.
 */
import {playMode} from '../common/js/config';

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [], // 播放列表
  sequenceList: [], // 随机列表
  mode: playMode.sequence,
  currentIndex: -1 // 当前播放位置
};

export default state;
