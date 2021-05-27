Date.prototype.format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds() // 毫秒
        };

        // 根据y的长度来截取年
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    }
    // 用法： 
    // var time1 = new Date().format("yyyy-MM-dd");
    // var time2 = new Date(1469281964000).format("yyyy-MM-dd hh:mm:ss");
    // console.log(time1);
    // console.log(time2);



$('#start_quiz_timer').click(function() { //计时器启动
    if ($('#recipient-name').val() == '') { //当用户昵称信息输入为空是
        $('#user_name').val('匿名'); //传递昵称‘匿名’到表单中
    } else { //否则
        $('#user_name').val($('#recipient-name').val()); //将用户的昵称传递到表单中
    }
    $('#user_date').val(new Date().format("yyyy-MM-dd hh:mm")) //将用户的开始答题时间传递到表单中
});

$('#quiz_counter_submit').on('click', (function() { //提交按钮

    $('#myModalAlertLast').modal('show'); //点击计数器提交按钮时显示提交模态框
}));

$('#submit_your_answer').on('click', function() {
    let score = 0;
    let time = $('#t_m').text() + $('#t_s').text();
    // let quiz = $('.quiz_detail');
    // $('.')
    for (let i = 0; i < 20; i++) {
        score += Number($('.quiz_detail').eq(i).attr('data-score'));
    }
    $('#score').text(`${score}分,用时${time}`);
    $('#user_score').val(score);
    $('#user_time').val(time);
    clearInterval(timer); //停止计时器
    $('#myModalScore').modal('show');

    $(".options_base[true-answer='1']").css('background-color', '#dff0d8'); //点击提交后 显示答过的题目的正确答案


});
$('#submit_user').on('click', function() {
    console.log('提交表单');
    $('#user_form').submit();
});
$('#user_form').on('submit', function() {
    var f = $(this).serializeArray(); //序列化表单值  此方法返回的是 JSON 对象而非 JSON 字符串。
    console.log(f);

})