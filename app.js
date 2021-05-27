const express = require('express'); //引入express框架
const app = express(); //创建服务器
const path = require('path'); //引入path模块
const bodyParser = require('body-parser');

require('./model/connect'); //引入数据库链接模块
// require('./model/user');
// require('./model/quiz');

app.use(bodyParser.urlencoded({ extended: false }))


app.set('views', path.join(__dirname, 'views')); //配置模板路径
app.set('view engine', 'art'); //配置模板默认引擎
app.engine('art', require('express-art-template')); //渲染 art 模板，使用后者的方法

//设置开放静态资源文件路径
app.use(express.static(path.join(__dirname, 'public')));

//引入路由
const index = require('./route/index');
const quiz = require('./route/quiz');
const ranklist = require('./route/ranklist');

//路由分配
app.use('/', index);
app.use('/quiz', quiz);
app.use('/ranklist', ranklist);

//监听端口
app.listen(80);
console.log('启动成功');