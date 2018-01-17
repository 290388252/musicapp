/**
 *
 * Created by Administrator on 2018/1/3.
 */
import {getLyric, getVKey} from '../../api/song';
import {ERR_OK} from '../../api/config';
import {getUid} from './uid';

let urlMap = {};
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
    // 确保一首歌曲的 id 只对应一个 url
    // if (urlMap[this.id]) {
    //   this.url = urlMap[this.id];
    // } else {
    //   this._genUrl();
    // }
  }

  _getLyric() {
    getLyric(this.mid).then((res) => {
      if (res.retcode === ERR_OK) {
        console.log(res);
      }
    });
  }

  _genUrl() {
    if (this.url) {
      return;
    }
    getVKey(this.mid, this.filename).then((res) => {
      if (res.code === ERR_OK) {
        const vkey = res.data.items[0].vkey;
        this.url = `http://dl.stream.qqmusic.qq.com/${this.filename}?vkey=${vkey}&guid=${getUid()}&uin=0&fromtag=66`;
        urlMap[this.id] = this.url;
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
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=1FBA845D600EDED2F339C7FB29F0D3FE6645275845FC95B7756CAAEA731BFAC95A7FF8673376CBD90D5C922601317E3C637AC2C97682FF9C&guid=2489647892&uin=0&fromtag=66`
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
