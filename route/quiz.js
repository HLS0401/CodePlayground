const express = require('express');

const quiz = express.Router();

const Quiz = require('../model/quiz');

quiz.get('/', async function(req, res) {

    let order_array = req.query.qo; //将get请求参数保存
    let info_array = [];
    // console.log(order_array);
    if (order_array != undefined) { //get请求参数不为空时
        for (let i = 0; i < order_array.length; i++) { //循环查询数据库题目
            let info = await Quiz.findOne({ order: order_array[i] });
            info_array.push(info);
        }
    } else {
        res.redirect(301, '/'); //get请求参数为空时重定向回首页
        console.log('没有参数');
        return;
    }
    // console.log(info_array);
    res.render('./quiz/quiz', {
        quiz: info_array
    });
});

module.exports = quiz;