const readline = require('readline');
const rl = readline.createInterface(process.stdin,process.stdout);
const net = require('net');

rl.question('what is your name?',(name)=>{
	name = name.trim();
	if(!name){
		throw new Error('please input your name');
	}
	let server = net.connect(2080,()=>{
		console.log(`welcome ${name} to 2080 chatroom`);
		
		server.on('data',(chunk)=>{
		try{
		  let signal = JSON.parse(chunk.toString());
		  let procotol = signal.procotol;
		  
		  switch(procotol) {
			  case '\nboardcast':
			   console.log(signal.from + '说');
			   console.log(signal.message);
			   rl.prompt();
			   break;
			  default:
			   server.write('你说什么？我做不来了')
			   break;
		  }
		}catch(err){
			console.log('error:'+err);
		}
		 
		
	});
		rl.setPrompt(name + '-> ');
		rl.prompt();
		rl.on('line',(line)=>{
			let send = {
				procotol: 'boardcast',
				from:name,
				message:line.toString().trim()
			}
			server.write(JSON.stringify(send));
			rl.prompt();
		}).on('close',()=>{
			
		})
	})
})