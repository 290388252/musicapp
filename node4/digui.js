const fs = require('fs');
const path = require('path');

let target = path.join(__dirname,process.argv[2] || './');
let depth = 0;

function load(target,depth){
  /*
   new Array(2).join('| ')
   "| "
   new Array(3).join('| ')
   "| | "
   new Array(1).join('| ')
   ""
   */
	let prefix = new Array(depth + 1).join('| ');

	let dirinfos = fs.readdirSync(target);
	let dirs = [];
	let files = [];
	dirinfos.forEach(info=>{
	let stats = fs.statSync(path.join(target,info));
	if(stats.isFile()){
		files.push(info)
	}else{
		dirs.push(info)
	}
  })
   dirs.forEach(dir=>{
	console.log(`${prefix}├${dir}`);
	if(fs.statSync(path.join(target),dir).isDirectory()){
	   load(target+dir,depth+1);
	}
   })
   let count = files.length - 1;
   files.forEach(file=>{
	console.log(`${prefix}${count-- ? '├' : '└'}-${file}`);
   })
}
load(target,0);
