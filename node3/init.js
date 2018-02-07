var p = 'please input your name';
var users = {
	'admin0': '123',
	'admin1': '123',
	'admin2': '123',
}
var isInputUserName = true;
var lastusername;
process.stdout.write(p + '\n');
process.stdin.on('data',(input)=>{
	input = input.toString().trim();
	if(isInputUserName){
		if(Object.keys(users).indexOf(input) === -1){
			process.stdout.write('name no ')
			process.stdout.write(p + ' again' + '\n');
			isInputUserName = true;
			
		}else{
			console.log('please input your pwd')
			isInputUserName = false;
			lastusername = input;
		}		
	}else{
		 if(input === users[lastusername]){
			 console.log('duile')
		 }else{
			 console.log('cuole')
		 }
	} 
	
})