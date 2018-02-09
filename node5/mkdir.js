const fs = require('fs');
const path = require('path');

function mkdir(pathname,callback){
	pathname = path.isAbsolute(pathname) ? pathname : path.join(__dirname,pathname);
	//pathname.replace(__dirname, '');
  let relativepath = path.relative(__dirname,pathname);
  let folders = relativepath.split(path.sep); //path.sep当前系统下的分割符号，考虑到windows和linux
	try{
    let pre = '';
    folders.forEach(folder=>{
      try {
        fs.statSync(path.join(__dirname,pre,folder));
      }catch (err){
        fs.mkdirSync(path.join(__dirname,pre,folder));
      }
      pre = path.join(pre,folder);
    });
    callback && callback();
  }catch(err) {
	  callback && callback(err);
  }
}

module.exports = mkdir;
