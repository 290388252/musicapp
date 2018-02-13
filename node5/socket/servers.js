const net = require('net');

const server = net.createServer((socket)=>{
	let client = socket.address();
	console.log('conncet.....');
	console.log(`${socket.remoteAddress}:${socket.remotePort}连接进来了`);
	console.log(client.address + ' coming');
	//socket.write(`hello ${socket.remoteAddress}:${socket.remotePort}你来了`);
	socket.on('data',(chunk)=>{
		console.log(chunk.toString());
		socket.write('你说什么？')
	});
});

server.listen(2080,(err)=>{
	if(err){
		throw err;
	}
	console.log('success')
	let a = {};
	a = server.address();
	console.log(a);
});