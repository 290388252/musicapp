1.变量类型和计算
js typeof几种类型
 答: undefinded string number array object function
何时用 === 和 ==
 答：obj.a == null  相当于 obj.a === null obj.a === undefinded
     0 NaN false 都是false
window.onload 和 DOMContentLoaded 区别
用js创建10个<a>标签，点击的时候弹出来对应的序号
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
如何实现一个模块加载器实现类似require.js的基本功能
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

3.作用域和闭包 执行上下文
变量提升理解 答：函数声明和函数表达式
作用域理解 答：自由变量 作用域链 闭包两个场景
说明this几种不同场景的应用 ： (
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

