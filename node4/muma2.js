const fs = require('fs');
const icon = require('iconv-lite');
const path = require('path');
const readline = require('readline');

const filename = path.join(__dirname,'./血染的风采.lrc');

let streamReader = fs.createReadStream(filename).pipe(icon.decodeStream('gbk'));
let regex = /\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/;

let rl = readline.createInterface({
  input: streamReader
});
rl.on('line',(line)=>{
  task(line);
});

function task(line) {
      let matches = regex.exec(line);
      if(matches){
        let m = parseFloat(matches[1]);
        let s = parseFloat(matches[2]);
        let f = parseFloat(matches[3]);
        let lyric = matches[4];
        setTimeout(()=>{
          console.log(lyric);
        },m * 60 * 1000 + s * 1000 + f);
      }else{
        console.log(line);
      }
}
