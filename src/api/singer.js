import jsonp from '../common/js/jsonp';
import {commonParams, options} from './config';

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  });
  return jsonp(url, data, options);
}

export function getSingerDetail(singerID) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';

  const data = Object.assign({}, commonParams, {
    singerid: singerID,
    uin: 0,
    format: 'json',
    platform: 'h5page',
    needNewCode: 1,
    order: 'listen',
    from: 'h5',
    num: 100,
    begin: 0,
    _: 1514950938162
  });
  return jsonp(url, data, options);
}
