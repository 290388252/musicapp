var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
	'content': '测试测试',
	'mid': '8837'
}); 

var options = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/docomment',
	method: 'POST',
	headers: {
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate, br',
		'Accept-Language':'zh-CN,zh;q=0.9',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=2aa4fa46-1ff3-4653-8919-ba356ae06e22; imooc_isnew_ct=1504835190; UM_distinctid=15f0535103f28e-0713f94d79c176-464a0129-100200-15f05351040646; CNZZDATA1261110065=1131291491-1507616648-https%253A%252F%252Fwww.baidu.com%252F%7C1507616648; imooc_isnew=2; loginstate=1; apsid=U0Y2I2NTEyYjNhM2NjMzhjNTU2M2MyMDIzZTA0NDUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzEyMTAyNgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADZlZDk5MWNjNTRiMGM5OWUzMjY1Nzk1MzExMTBlYTkzKppqWiqaalo%3DYj; mc_channel=banner; mc_marking=7a72c833ff9ae725588c7c13fe7d2f96; PHPSESSID=7o4448uij73jn4rl67b8lrbvn4; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1517280146,1517364994,1517368688,1517370412; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1517370599; cvde=5a7126f8020ba-61',
		'Host':'www.imooc.com',
		'Origin':'https://www.imooc.com',
		'Referer':'https://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req = http.request(options,function(res){
	console.log('Status:' + res.statusCode);
	console.log('headers:' + JSON.stringify(res.headers));
	
	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	})
	res.on('end',function(){
		console.log('finish');
	})
	
});

req.on('error',function(e){
		console.log('error'+e.message);
	});
	req.write(postData);
	req.end();