const fs = require('fs');
const path = require('path');

function mkdir(pathname,callback){
  let root = module.parent.filename;
	pathname = path.isAbsolute(pathname) ? pathname : path.join(root,pathname);
	//pathname.replace(__dirname, '');
  let relativepath = path.relative(root,pathname);
  let folders = relativepath.split(path.sep); //path.sep当前系统下的分割符号，考虑到windows和linux
	try{
    let pre = '';
    folders.forEach(folder=>{
      try {
        fs.statSync(path.join(root,pre,folder));
      }catch (err){
        fs.mkdirSync(path.join(root,pre,folder));
      }
      pre = path.join(pre,folder);
    });
    callback && callback();
  }catch(err) {
	  callback && callback(err);
  }
}

module.exports = mkdir;
