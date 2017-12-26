/**
 * yanchao
 * Created by Administrator on 2017/12/26.
 */
import originJSONP from 'jsonp';
url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
export default function jsonp(url, data, option) {
  return new Promise((resolve, reject) => {
      originJSONP(url, option, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      })
  });
};

function param(data) {
  let url = '';
  for (var i in data) {
    let value = data[i] !== undefined ? data[i] : '';
    url += `&${i}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : '';
};
