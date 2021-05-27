const mongoose = require('mongoose'); //引入mongoose第三方模块

mongoose.connect('mongodb://localhost/quiz_users', { useNewUrlParser: true, useUnifiedTopology: true }) //链接数据库
    .then(function() {
        console.log('数据库链接成功');
    })
    .catch(function() {
        console.log('数据库链接失败');
    });