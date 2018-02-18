const net = require('net');
let clients = [];

let server = net.createServer((socket)=>{
	clients.push(socket);
	
	let client = socket.address();
	console.log('Welcome'+socket.remoteAddress +'conncet into out room');
	//socket.write(`hello ${socket.remoteAddress}:${socket.remotePort}你来了,地址:${client.address}`);
	
	socket.on('data',(chunk)=>{
		try{
		  let signal = JSON.parse(chunk.toString());
		  let procotol = signal.procotol;
		  
		  switch(procotol) {
			  case 'boardcast':
			   boardcast(signal);
			   break;
			  default:
			   socket.write('你说什么？我做不来了')
			   break;
		  }
		}catch(err){
			console.log('error:'+err);
		}
		 
		
	});
	function boardcast(signal){
		console.log(signal);
		let username = signal.from;
		let message = signal.message;
		let send = {
			procotol: signal.procotol,
			from:username,
			message:message
		}
		clients.forEach(client=>{
			client.write(JSON.stringify(send));
		});
	}
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