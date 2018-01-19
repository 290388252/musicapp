1.变量类型和计算
js typeof几种类型
 答: undefinded string number array object function
何时用 === 和 ==
 答：obj.a == null  相当于 obj.a === null obj.a === undefinded
     0 NaN false 都是false
window.onload 和 DOMContentLoaded 区别
用js创建10个<a>标签，点击的时候弹出来对应的序号
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

如何判断一个变量是数组类型
写一个原型链继承例子
描述new一个对象的过程
zepto中如何使用原型链
