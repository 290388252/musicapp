/**
 * Created by Administrator on 2018/2/9.
 *
 */
const path = require('path');
const mkdir = require('./mkdir.js');

mkdir(path.join(__dirname,'demo2/demo3'),(err)=>{
  console.log(err);
});
