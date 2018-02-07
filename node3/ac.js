 const fs = require('fs');
 const label = 'timer';
 console.time(label);
 
 fs.stat('./list.txt',(err,stats) => {
	 if(err){
		 console.log('no list')
		 fs.writeFile('./list.txt',new Date(),(err)=>{
			 if(err){console.log(err);return false;}
			 console.log('success');
		 })
		 return false;
	 }
	 fs.unlink('./list.txt',(err)=>{
		 if(err){console.log(err);return false;}
		 fs.writeFile('./list.txt',new Date(),(err)=>{
			 if(err){console.log(err);return false;}
			 console.log('success second');
		 })
	 })
 }) 
  console.timeEnd(label);