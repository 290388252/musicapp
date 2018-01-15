/**
 *
 * Created by Administrator on 2018/1/3.
 */
import {getLyric} from '../../api/song';
import {ERR_OK} from '../../api/config';
import {getLycri} from '../../api/localLycri';

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url, lycri}) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
    this.lycri = getLycri();
  }

  _getLyric() {
    getLyric(this.mid).then((res) => {
      if (res.retcode === ERR_OK) {
        console.log(res);
      }
    });
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: fillterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=BDE8675D657D541D1A1CDCCEE36BF367D94344BA58CE3BE02E28E00A70C14D56552F959C24BD184DB6B68C044FA899FDA7512472699CD8BD&guid=2489647892&uin=0&fromtag=66`
  });
}

function fillterSinger(singer) {
  let ret = [];
  if (!singer) {
    return;
  }
  singer.forEach((s) => {
    ret.push(s.name);
  });
  return ret.join('/');
}
