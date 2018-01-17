/**
 * yanchao
 * Created by Administrator on 2018/1/15.
 */
import {commonParams, options} from './config';
import axios from 'axios';
import {getUid} from '../common/js/uid';
import jsonp from '../common/js/jsonp';

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

export function getVKey(songmid, filename) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';

  const data = Object.assign({}, commonParams, {
    cid: 205361747,
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    songmid,
    filename,
    guid: getUid()
  });

  return jsonp(url, data, Object.assign({}, options, {
    param: 'callback'
  }));
}
