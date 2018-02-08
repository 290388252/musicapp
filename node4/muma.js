const fs = require('fs');
const icon = require('iconv-lite');
const path = require('path');

fs.readFile(path.join(__dirname,'./血染的风采.lrc'),(error,data)=>{
	let lines = icon.decode(data,'gbk').split('\n');
	let regex = /\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/;
//[00:32.67] 也许我告别 将不再回来
	lines.forEach((line)=>{
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
			console.log(line)
		}
	})
})