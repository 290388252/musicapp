/**
 *
 * Created by Administrator on 2018/2/12.
 */
const fs = require('fs');
const path = require('path');
const loadPath = path.join(__dirname,'./test.js');
console.log(loadPath);
let reader = fs.createReadStream(loadPath);
let writer = fs.createWriteStream(loadPath);
/*read small size doc
fs.readFile(loadPath,(err,data)=>{
  fs.writeFile(loadPath.replace('test','test1'),data,err=>{
    //OK
  })
});*/
fs.stat(loadPath,(err,stats)=>{
  if (err){
    console.log(err);
  }

  if (stats){
    let readTotal = 0;
    reader.on('data',(chunk)=>{
      writer.write(chunk,(err)=>{
        console.log(((readTotal += chunk.length) / stats.size * 100) + '%');
      });
    });
  }
});

/*
reader.pipe(writer) //一句搞定但是没有进度条
 */
