const net = require('net');

const socket = net.connect({port:2080},()=>{
	 console.log('connected to yc server')
	 process.stdout.write('\nclient->');
	 process.stdin.on('data',(chunk)=>{
		socket.write(chunk.toString().trim());
		process.stdout.write('\nserver->')
	})
	socket.on('data',(data)=>{
		console.log(data.toString());
		//socket.end();
		process.stdout.write('\nclient->');
	});
});


// socket.on('end',()=>{
	// console.log('end');
	 
// })