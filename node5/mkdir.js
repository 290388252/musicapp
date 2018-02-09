const fs = require('fs');
const path = require('path');

function mkdir(pathname,callback){
	pathname = path.isAbsolute(pathname) ? pathname : path.join(__dirname,pathname);
	//pathname.replace(__dirname, '');
	var relativepath = path.posix.relative(__dirname,pathname)
	var folders = relativepath.split(path.sep); //path.sep当前系统下的分割符号，考虑到windows和linux
	
}

module.exports = mkdir;