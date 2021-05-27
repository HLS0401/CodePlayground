const mongoose = require('mongoose'); //引入mongoose第三方模块

const userSchema = new mongoose.Schema({ //创建 集合规则
    username: { //用户昵称
        type: String,
        default: '匿名', //若不填写昵称则默认为匿名
        required: true,
        minlength: 2,
        maxlength: 8
    },
    score: { //得分
        type: Number,
        require: true
    },
    date: { //答题开始时间
        type: String,
        required: true
    },
    time: { //
        type: String,
        required: true
    }

});

//创建集合
const User = mongoose.model('User', userSchema);

//创建第一个数据
// User.create({
//         username: '王五',
//         score: 100,
//         date: '2021-05-18 12:18',
//         time: '05分20秒'
//     })
//     .then(function() {
//         console.log('测试数据创建成功');
//     })
//     .catch(function() {
//         console.log('测试数据创建失败');
//     });


//将用户集合作为模块 成员 导出
module.exports = User;
// module.exports = {
//     User: User
// };
//ES6语法
//等价于User,但是后期可以添加其他集合