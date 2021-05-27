const mongoose = require('mongoose'); //引入mongoose第三方模块

const quizSchema = new mongoose.Schema({ //创建 集合规则
    order: { //题目序号
        type: Number,
        require: true
    },
    info: { //题目信息
        type: String,
        required: true
    },
    option: { //选项
        type: Array,
        require: true
    },
    domain: { //学科领域划分
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }


});

//创建集合
const Quiz = mongoose.model('Quiz', quizSchema);

//创建第一个数据
// Quiz.create({
//         order: 1,
//         info: '这是第一个问题，从以下4个选项中选择其中的一个',
//         option: ['巴拉巴拉a', '巴拉巴拉b', '巴拉巴拉c', '巴拉巴拉d'],
//         domain: '学科领域1',
//         answer: 'A'
//     })
//     .then(function() {
//         console.log('测试数据创建成功');
//     })
//     .catch(function() {
//         console.log('测试数据创建失败');
//     });

//循环创建例题
// for (let i = 0; i < 80; i++) {
//     let ia = i % 4; //问题答案 0-3
//     let idomain = i % 3; //问题所属学科领域 0-2
//     Quiz.create({
//             order: i,
//             info: `这是第${i}个问题，从以下4个选项中选择其中的一个`,
//             option: ['选择项A', '选择项B', '选择项C', '选择项D'],
//             domain: idomain, //0-2 对应 学科领域1-3
//             answer: ia //0-3 对应正确答案为A-D
//         })
//         .then(function() {
//             console.log('测试数据创建成功');
//         })
//         .catch(function() {
//             console.log('测试数据创建失败');
//         });
// }


//将用户集合作为模块 成员 导出
module.exports = Quiz;
// module.exports = {
//     Quiz: Quiz
// };
//ES6语法
//等价于User,但是后期可以添加其他集合