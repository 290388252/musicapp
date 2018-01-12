/**
 *
 * Created by Administrator on 2018/1/3.
 */
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
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
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=0A6EFCDDA586DBDDBAEC00116A4424B1833D73356F913CF8637C6A0761E407FBFDD27A12000E8D2525783E7730F49609490A6A4A6EB5CA0B&guid=7342625256&uin=0&fromtag=66`
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
