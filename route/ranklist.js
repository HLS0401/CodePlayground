const express = require('express');

const ranklist = express.Router();;

const User = require('../model/user');

ranklist.get('/', async function(req, res) {
    let users = await User.find().sort({ score: -1 }); //返回格式[{}]的数据 sort()返回排序后的结果 ‘-1’倒序从大到小
    let users_ace = []; //存放排名前三的用户数据
    for (let i = 0; i < 3; i++) { //将用户数据中的前三存放在users_ace数组中
        users_ace.push(users.shift());
    };
    res.render('./ranklist/ranklist', { users: users, ace: users_ace });
});

ranklist.post('/', async function(req, res) {

    let userinfo = {
        username: req.body.user_name,
        score: req.body.user_score,
        date: req.body.user_date,
        time: req.body.user_time
    };
    await User.create(userinfo);
    res.writeHead(301, {
        Location: '/ranklist'
    });
    res.send();
});


module.exports = ranklist;