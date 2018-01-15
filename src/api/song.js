/**
 * yanchao
 * Created by Administrator on 2018/1/15.
 */
import {commonParams} from './config';
import axios from 'axios';

export function getLyric(mid) {
  const url = '/api/lyric';

  const data = Object.assign({}, commonParams, {
    callback: 'MusicJsonCallback_lrc',
    pcachetime: +new Date(),
    songmid: mid,
    jsonpCallback: 'MusicJsonCallback_lrc',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
