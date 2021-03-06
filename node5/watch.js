/**
 * Created by Administrator on 2018/2/11.
 */
const fs = require('fs');
const path = require('path');
const marked = require('marked');
// 引用 browserSync 模块
const browserSync = require('browser-sync');
// 启动服务器

const target = path.join(__dirname,process.argv[2] || '../README.md');
let filename = target.replace(path.extname(target),'.html');
let indexpath = path.basename(filename);
browserSync({server: path.dirname(target),index:indexpath});

fs.watchFile(target,(curr, prev) => {
 if (curr.mtime === prev.mtime) {
   return false;
 }
 fs.readFile(target,'utf-8',(err,data)=>{
   if (err){
     throw err;
   }
   let html = marked(data);
   html = temple.replace('{{content}}',html);
   let name = target.replace(path.extname(target),'.html');
   fs.writeFile(name,html,(err)=>{
     if (err){
       throw err;
     }
     // 调用reload方法
     browserSync.reload(indexpath);
     console.log('success');
   });
 });
});
let temple = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0, user-scalable=no">
    <title>xxx</title>
  </head>
  <body>
    <div id="app"></div>
    {{content}}
  </body>
</html>
`;
