1.变量类型和计算
js typeof几种类型？
 答: undefinded string number array object function
何时用 === 和 ==？
 答：obj.a == null  相当于 obj.a === null obj.a === undefinded
     0 NaN false 都是false
window.onload 和 DOMContentLoaded 区别
用js创建10个<a>标签，点击的时候弹出来对应的序号？
 答:
 这样写是错误的, 点击时会每次都是显示10，
 var i, a;
 for(i = 0; i < 10; i++) {
    a = document.createElement('a')
    a.innerHTML = i + '<br>'
    a.addEventListener('click',function(e) {
      e.preventDefault()
      alert(i)
    })
    document.body.appendChild(a)
 }
 应该改为
 var i;
  for(i = 0; i < 10; i++) {
      (function (i){
           var a = document.createElement('a')
           a.innerHTML = i + '<br>'
           a.addEventListener('click',function(e) {
             e.preventDefault()
             alert(i)
           })
           document.body.appendChild(a)
      })(i);
  }
实现数组的随机排序

2.原型链 构造函数 原型规则 原型链 instanceof

构造函数
function Foo(name, age) {
  this.name = name;
  this.age = age;
  // return this 默认有这行，返回一个this对象
}
var a = Foo('yc',22);

var a = {} a的构造函数就是Object 等于 var a = new Object()

__proto__隐式原型   prototype显式原型

function Foo(name) {
    this.name = name;
}
Foo.prototype.alertName = function() {
    alert(this.name);
}
var f = new Foo('yc')
f.printName = function() {
  console.log(this.name);
}

f.printName();
f.alertName();  f的构造函数是Foo  f.__proto__ === Foo.prototype
f.hasOwnProtoType 判断是否是自身有的属性而不是从构造函数里继承来的
f的__proto__指向Foo的显式原型。Foo的构造函数是个Object, Object的__proto__是null，最顶的终点就是null

如何判断一个变量是数组类型
  答：用instanceof
写一个原型链继承例子
1:
function Foo1() {
  this.foo1 = function() {
    console.log('foo1')
  }
}
function Foo2() {
  this.foo2 = function() {
    console.log('foo2')
  }
}
Foo2.prototype = new Foo1()
var f = new Foo2()
2:
function Element(id) {
  this.element = document.getElementById(id)
}
Element.prototype.html = function(val) {
  var element = this.element;
  if (val) {
    element.innerHTML = val
    return this;
  } else {
    return element.innerHTML
  }
}
Element.prototype.on = function(val) {
       var element = this.element;
       element.addEventListener(type, fn)
}
var div1 = new Element('div1')
f的__proto__指向Foo2,Foo2原本的__proto__指向Object,但是被Foo2.prototype = new Foo1()改变了继承所以指向Foo1
描述new一个对象的过程
function Foo(name, age) {
  this.name = name;
  this.age = age;
  // return this 默认有这行，返回一个this对象
}
zepto中如何使用原型链  《查看移动端开发框架Zepto.js入门》
  参考jQueryAPI改造的简化的


3.作用域和闭包 执行上下文
变量提升理解？ 答：函数声明和函数表达式
作用域理解？ 答：自由变量 作用域链 闭包两个场景
说明this几种不同场景的应用？ ： (
  作为构造函数，对象，普通函数执行 call bind apply
  call可以改变this的值
  var a = {
  name : 'a',
  f1: function () {
    console.log(this.name)
    }
  }
  a.f1() // a
  a.f1.call({name: 'yanchao'}) //yanchao

  function f2(name) {
    console.log(this)
  }
  f2() // this === window
  f2.call({x: 1},'yanchao') //this === 对象{x: 1}
)

作用域
无块作用
if (true) { var name = 'a'; } console.log(name)  //a
var name; if (true) { name = 'a'; } console.log(name)  //a
但是有函数和全局的区分
var a = 1;
function fn() {var a = 2; console.log(a)}
console.log(a) // 1
fn() // 2

作用域链
var a = 1
function f1() {
  var b = 2;
  function f2() {
    var c = 3;
    console.log(a) //自由变量 向父级找
    console.log(b) //自由变量
    console.log(c)
    }
    f2()
  }
闭包作用 主要用于封装变量收敛权限

function f1() {
  var a = 100;
  return function() {
    console.log(a)
  }
}
var f = f1()
var a = 200
f() //100

function f1() {
  var a = 100;
  return function() {
    console.log(a)
  }
}
var f = f1()
function f2(fn) {
  var a = 200
  fn()
}
f2(f) //100

4 异步单线程
同步和异步的区别是什么？
异步和单线程的关系？
一个关于setTimeout的笔试题？
前端使用异步的场景有哪些？
  答：定时任务 网络请求 动态加载图片 事件绑定

console.log(a)
setTimeout(function() {console.log(b)},1000);
console.log(c)
//a c b
不阻塞程序就用异步

日期
Date.now()
var dt = new Date()
getTime  getFullYear getMonth getDate getHours getMinutes getSeconds

数组API
forEach 遍历所有元素
  var arr = [1,2,3]
  arr.forEach(function(item,index) { console.log(index,item)})
every 判断所有元素是否符合条件
  var result = arr.every(function(item, index) {if(item < 4){return true}})
  console.log(result)
some判断是否有至少一个元素符合条件(同上 item < 2)
sort排序
  var arr = [1,4,5,2,3]
  var arr2 = arr.sort(function(a,b) {return a-b})
  console.log(arr2)
map对元素重新封装，生成新数组
  var arr = [1,4,5,2,3]
  var arr2 = arr.map(function(item,index) {return '<b>'+item+'</b>'})
  console.log(arr2)
filter过滤符合条件的元素
    var arr = [1,2,3]
    var result = arr.every(function(item, index) {if(item >=2 ){return true}})
    console.log(result)

对象API
var obj = {
  x:1,
  y:2,
  z:3
}
var key
for (key in obj){
  if(obj.hasOwnProperty(key)) {
    console.log(key,obj[key])
  }
}
获取随机数字符串长度要求一样
var random = Math.random();
var random = random + '0000000000';
var random = random.slice(0, 10);

封装一个能遍历数组和对象的forEach
function forEach(obj, fn) {
  var key;
  if (obj instanceof Array) {
    obj.forEach(function(item, index){
      fn(item, index)
    })
  } else {
    for(key in obj) {
      　fn(key,obj[key])　
    }
  }
}

5 JS-Web API
DOM和BOM操作 事件绑定 ajax请求 http协议 存储，页面弹框 定义window全局变量定义一个alert
JS基础要遵循ECSMA 262 ， JS-Web API要遵循W3C

DOM操作 document object model 文档对象模型的操作
DOM是哪种基本的数据结构? 树
DOM操作的常用API有哪些? 获取DOM节点 父节点子节点 节点的property attribute
DOM节点的attr和property有何区别?
property就是个JS对象的一个属性 obj{x:1,y:2} x和y就是obj的property
attribute是对html标签属性的修改
var pList = doucument.querySelectorAll('p')
var p = pList[0]
p.style.width = '100px'
p.className = 'p1'
p.nodeName
p.nodeType

attribute
getAttribute

DOM本质(浏览器把拿到的html代码结构化一个浏览器能识别并且js可以操作的一个模型而已)
DOM节点操作
getElementById获取元素 getElementsByTagName获取集合  getElementsByClassName获取集合  querySelectorAll获取集合

DOM结构操作？
新增节点 var p1 = createElement('p') p1.innerHTML = '' div1.appendChild(p1)移动节点
获取父元素，parentElement
子元素，childNodes
删除节点  removeChild

BOM browser object model
如何检查浏览器的类型？
拆分url的各个部分？

navigator screen location history
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome') //true or false

screen.width....

location.protocol // http:...
location.pathname ///learn/111....
location.search

history.back() forward()前进后退

6事件
编写一个通用的事件绑定监听函数？
var btn = document.getElementById('div1')
btn.addEventListener('click',function(){
  log....
})
可以写成
function bindEvent(elem,type,fn) {
    elem.addEventListener(type,fn)
}
bindEvent(btn,'click',function(e){
  e.preventDefault()阻止默认行为
  log....
})

描述事件冒泡流程？  DOM树形结构  事件冒泡 阻止冒泡
<body>
  <div id='div1>
    <p id='1'>ok</p>
    <p id='2'>no</p>
    <p id='3'>no</p>
    <p id='4'>no</p>
  </div>
  <div id='div2>
      <p id='5'>no</p>
      <p id='6'>no</p>
   </div>
</body>
var p1 = document.getElementById('1')
var body = document.body
bindEvent(p1,'click',function(e){
  e.stopPropatation()
  alert('ok')
})
bindEvent(body,'click',function(e){
  alert('no')
})

对于一个无限下拉加载图片的页面如何给每个图片进行事件绑定？
代理的好处代码简洁，浏览器压力小，
  <div id='div1>
    <p id='1'>ok</p>
    <p id='2'>no</p>
    <p id='3'>no</p>
    <p id='4'>no</p>
    //随时会新增更多的p标签
  </div>
  var div1 = document.getElementById('div1')
  bindEvent(div1,'click',function(e){
    var target = e.target
    if(target.nodeName === 'P') {
      alert(target.innerHTML)
    }
  })
完善绑定事件的函数添加一个代理
function bindEvent(elem,type,selector,fn) {
    if(fn == null){
      fn = selector
      selector = null
    }
    elem.addEventListener(type,function(e){
      var target
      if(selector){
        target = e.target
            if(target.matches(selector)) {
              fn.call(target,e)
            }
      }else{
        fn(e)
      }
    })
}
var div1 = document.getElementById('div1')
bindEvent(div1,'click','a',function(e){
  logs(this.innerHTML)
})
var a = document.getElementById('a')
bindEvent(div1,'click',function(e){
  log(a.innerHTML)
})

6-1 Ajax
手动编写一个ajax，不依赖第三方库?
跨域的几种实现方式?
XMLHttpRequest？
状态码说明？
跨域？JSONP 服务器端设置http header。浏览器有同源策略，不允许ajax访问其他域的接口。
跨域条件： 协议（http） 域名（www.????.com） 端口(在com后面又个端口号没写的话就默认80) 有一个不同就算跨域
link script可以CDN跨域 img也可以跨域
跨域必须经过信息提供的允许，如果未经允许即可获取那就是浏览器同源策略出现了漏洞
JSONP的实现原理定义callback函数
https://www.baidu.com/xxx.html
xxx.html可以是个动态生成的名字服务器不一定存在它

服务器端的就
第二个参数填写允许跨域的名称不建议直接写*
response.setHeader("Access-Control-Allow-Origin","http://a.com,http://b.com")
response.setHeader("Access-Control-Allow-Header","X-Requested-With")
response.setHeader("Access-Control-Allow-Methods","PUT,GET,DELETE,POST,OPTIONS")
接受跨域的cookie
response.setHeader("Access-Control-Allow-Credentials","true")

var xhr = new XMLHttpRequest()
xhr.open('GET','/api',false)
xhr.onreadystatechange = function(){
//这里的函数异步执行可以参考之前JS基础的异步模块
  if(xhr.readyState == 4){ //readyState 0未初始化 1载入 2载入完成 3交互 4完成响应
    if (xhr.status == 200) { //status 2xx表示请求成功 3xx需要重定向，浏览器直接跳 404，4xx客户端请求错误 5xx服务端错
      alert(xhr.responseText)
    }
  }
}
xhr.send(null)
IE低版本用ActiveXObject,忽略这类吧

6-2存储
描述cookie sessionStorage localStorage区别？cookie会每次随http请求一起发送，sessionStorage localStorage不会

cookie 只有4kb大小，本身用于客户端和服务端的通讯 但是他本身就有本地存储的功能于是被借用了
API太简单需要封装才好，本身直接使用document.cookie=...获取和修改

sessionStorage localStorage
容量有5M API简易 localStorage.setItem(key,value) localStorage.getItem(key)
IOS safari隐藏模式下localStorage会报错统一用try catch封装一下

7开发环境
IDE
git版本管理 git add, git checkout xxx, git commit -m "xxx", git push origin master, git pull origin master
js模块化
打包工具
上线回滚流程

模块化 var a = require('xxx.js') export{function...}
export{
  getFormatDate: function(date,type){
  if(type === 1){
          return '2017-06-15'
        }
        if(type === 2){
                return '2017年06月15日'
              }
  }
}
var getFormatDate = require('util.js')
export{
  agetFormatDate: function(date){
    return getFormatDate(date,2)
  }
}

var agetFormatDate = require('a-util.js')
var dt = new Date()
agetFormatDate(dt)
AMD
是一个异步模块加载的定义 require.js
全局define函数 全局require函数 依赖JS会自动 异步加载
//util.js
define(function(){
  return{
    getFormatDate: function(date,type){
      if(type === 1){
        return '2017-06-15'
      }
      if(type === 2){
              return '2017年06月15日'
            }
    }
  }
})
//a-util.js
define(['./util.js'],function(util){
  return{
    agetFormatDate: function(date){
      return util.getFormatDate(date,2)
    }
  }
})
//a.js
define(['./a-util.js'],function(autil){
  return{
    print: function(date){
      console.log(return autil.agetFormatDate(date,2))
    }
  }
})
//main.js
require([./a.js],function(a){
  var date = new Date()
  a.print(date)
})
引用的方式
<script src="/require.js" data-main="./main.js"></script>

commonJS
nodejs模块化规范现在被大量用前端，前端开发依赖的插件和库都可以从npm获取
构建工具的高度自动化使得用npm比较简单成本低
commonJS不会异步加载JS而是同步一次性加载
module.exports{
  getFormatDate: function(date,type){
  if(type === 1){
          return '2017-06-15'
        }
        if(type === 2){
                return '2017年06月15日'
              }
  }
}
var util = require('util.js')
module.exports{
  agetFormatDate: function(date){
    return util.getFormatDate(date,2)
  }
}

var agetFormatDate = require('a-util.js')
var dt = new Date()
agetFormatDate(dt)

要异步加载就用AMD
用了npm就建议用commonJS

npm和nodejs安装
npm install http-server
http-server -p 8080
npm install webpack
npm init

//packjson
{
  "name": "webpack-test",
  "version": "1.0.0",
  "description": "webpacktest",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack"
  },
  "author": "yanchao",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.10.0"
  }
}
//webpack.config.js
var path = require('path')
var webpack = require('webpack')

module.exports = {
	context:path.resolve(__dirname,'./src'),
	entry: {
		app: './app.js'
	},
	output: {
		path: path.resolve(__dirname,'./dist'),
		filename: 'bundle.js'
	},
	//代码压缩
	plugins: [
	  new webpack.optimize.UglifyJsPlugin()
	]
}
目录下创建src文件，里面创建app.js
npm start

8 页面加载
从输入url到得到html的详细过程
window.onload和DOMContentLoaded的区别
window.addEventListener('load',function(){页面全部资源加载完才会执行....})
document.addEventListener('DOMContentLoaded',function(){DOM渲染完即可执行此时图片视频可能还没加载完....})
加载资源的形式
  输入url或跳转页面加载html 加载html中的静态资源 script src=""....

加载一个资源的过程
 浏览器根据DNS服务器得到域名的IP地址
 向这个IP的机器发送http请求
 服务器收到处理并返回http请求
 浏览器得到返回内容

浏览器渲染页面的过程
  根据HTML结构生成DOM Tree
  根据CSS生成CSSOM
  将DOM和CSSOM整合成RenderTree
  根据RenderTree开始渲染和展示
  遇到script会执行并且阻塞渲染
为什么要把css放在head中，因为加载前就可以先加载了样式，加载顺序问题
为什么要把js放在body最下面，因为要先把DOM加载，script会阻塞DOM加载，而且script可以改变操作DOM，所以最后进行加载。

性能优化
多使用内存缓存或者其他方法
//未使用缓存
var i
for(i = 0; i < document.getElementByTagName('p').length; i++){}
//使用缓存
var i
var pList = document.getElementByTagName('p');
for(i = 0; i < pList.length; i++){}

createDocumentFragment()也可以配合使用缓存

减少CPU计算和网络
静态压缩合并
静态资源缓存不用请求多次
使用CDN让资源加载更快。
使用SSR后端渲染数据之间输出到HTML中
CSS放前面 JS放后面
懒加载
<img id="img1" src="preview.png" data-realsrc="a.png">
var img1 = document.getElementById("img1")
img1.src = img1.getAttribute("data-realsrc")
减少DOM查询对它做缓存尽量合并一起执行
事件节流
var textarea = document.getElementById('text')
var timeoutId
textarea.addEventListener('keyup',function(){
  if  (timeoutId){
    clearTimeout(timeoutId)
  }
  timeoutId = setTimeout(function(){
    //触发change事件
  },1000)
})

安全性
XSS跨站请求攻击
 在新浪博客写个文章，偷偷插入个script，攻击代码中把cookie放到自己的服务器中
 有人看文章就会运行到偷偷插入的script，就会把查看者的数据
解决
 前端替换关键字 <换成&lt,一般由后端替换这个问题

XSRF跨站请求伪造
  登录一个购物网站买东西，付费网站接口给你但是没有验证，然后收到一个隐藏img的邮件
解决
  增加验证流程如指纹密码短信验证





