function randomNum(minNum, maxNum) { // 生成随机数函数 原生js
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

function draw(minNum, maxNum) { //生成不重复随机数组 原生js
    let quiz_order = [];
    for (let i = 0; i < 20; i++) {

        let a = randomNum(minNum, maxNum);
        let issame = 0;
        for (let i = 0; i < quiz_order.length; i++) {
            if (quiz_order[i] == a) {
                issame++;
                // console.log('重复了');
            }
        }
        if (issame == 0) {
            quiz_order.push(a);
        } else {
            i--;
        }

    };
    return quiz_order;

    //还可以返回排序过后的数组
    // return quiz_order.sort(function(a, b) {
    //     return a - b
    // });
}

$('#quiz_btn').click(function() {
    let order = draw(0, 79);
    let get_order = '?';
    for (let i = 0; i < order.length; i++) {
        get_order += `qo=${order[i]}&`;
    }
    $(this).attr('href', `http://127.0.0.1/quiz${get_order}`);
    console.log(get_order);
})