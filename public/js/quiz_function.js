var timer = null; //声明计时器全局变量
$('#myModal').modal({ backdrop: 'static', keyboard: false }); //禁用模态框esc和点击其他区域关闭功能

$(function() { //自动触发模态框
    $('#myModal').modal('show');
});

$(function() { //点击侧边栏页面左右切换和动画
    for (let i = 0; i < $('.quiz_page').length; i++) {
        $('.quiz_page').eq(i).attr("data-order", i); //给每个页面添加 序号 date-order
        $('.QA_order').eq(i).text(`${i+1}/20`) //给显示每一页的序号
    }
    // console.log($('.page_act').attr('data-order')); //获取到当前页面的 序号
    // console.log($("[data-order='" + now_page_order + "']"));//用 序号 查询对应的 主体区

    $('.quiz_page').eq(0).addClass('page_first').addClass('page_act'); //在art-template生成页面时 给第一页加上类名！！！

    $('.right-side-bar').click(function() { //下一页功能
        let this_page = $(this).parent().parent().parent(); //获取当前页面的 主体区
        let now_page_order = this_page.attr('data-order'); //获取到当前页面 页码
        if (now_page_order == $('.quiz_page').length - 1) { //最后一页时判断
            $('#myModalAlertLast').modal('show');
            return;
        }

        let next_page_order = Number(now_page_order) + 1; //页码 +1
        let next_page = $("[data-order='" + next_page_order + "']"); //获取下一页主体区

        this_page.css('opacity', '0').css('transform', 'translateX(-20px)');
        setTimeout(function() {
            this_page.removeClass('page_first').removeClass('page_act')
                .css('display', 'none');
            setTimeout(function() {
                next_page.css('display', 'block');
                next_page.addClass('page_act');
                setTimeout(function() {
                    next_page.css('opacity', '1');
                    this_page.removeAttr('style');
                }, 17)
            }, 0)
        }, 400)


    });
    // this_page.css('transform', 'translateX(20px)');
    // this_page.removeClass('page_first');
    // this_page.removeAttr('style');


    $('.left-side-bar').click(function() { //上一页功能
        let this_page = $(this).parent().parent().parent(); //获取当前页面的 主体区
        let now_page_order = this_page.attr('data-order'); //获取到当前页面 页码
        if (now_page_order == 0) { //第一页时判断
            $('#myModalAlertFirst').modal('show');
            return;
        }

        let pre_page_order = Number(now_page_order) - 1; //页码 -1
        let pre_page = $("[data-order='" + pre_page_order + "']"); //获取上一页主体区

        this_page.css('opacity', '0').css('transform', 'translateX(20px)');
        setTimeout(function() {
            this_page.css('display', 'none')
                .removeClass('page_act');
            setTimeout(function() {
                pre_page.css('display', 'block')
                    .addClass('page_act');
                setTimeout(function() {
                        pre_page.css('opacity', '1');
                        this_page.removeAttr('style')
                    }, 17) //设置16.7ms等待pre_page.css('display', 'block')完成 以防止动画不执行
            }, 0)
        }, 400)


    });
});

$(function() { //计时器
    // let NowTime = new Date(); //记录js加载时的时间
    function getRTime(nt) {
        let EndTime = new Date(); //记录最新时间
        let t = EndTime.getTime() - nt.getTime(); //两个时间毫秒数相减
        /*var d=Math.floor(t/1000/60/60/24);
        t-=d*(1000*60*60*24);
        var h=Math.floor(t/1000/60/60);
        t-=h*60*60*1000;
        var m=Math.floor(t/1000/60);
        t-=m*60*1000;
        var s=Math.floor(t/1000);*/

        // var d = Math.floor(t / 1000 / 60 / 60 / 24);
        // var h = Math.floor(t / 1000 / 60 / 60 % 24);
        let m = Math.floor(t / 1000 / 60 % 60); //转换分钟数
        let s = Math.floor(t / 1000 % 60); //转换秒数

        if (m < 10) { //输出 mm 格式分钟数
            $("#t_m").html("0" + m + "分");
        } else {
            $('#t_m').html(m + "分");
        }

        if (s < 10) { //输出 ss 格式分钟数
            $("#t_s").html("0" + s + "秒");
        } else {
            $("#t_s").html(s + "秒");
        }
    };
    $('#start_quiz_timer').click(function() { //点击开始答题后触发计时器
        let NowTime = new Date(); //记录点击 开始答题 的时间
        timer = setInterval(getRTime, 1000, NowTime); //每隔一秒调用一次
    });
});

$(function() { //计数器功能区

    for (let i = 0; i < 20; i++) { //循环生成按钮
        $('.quiz_counter_row').append('<button type="button" class="btn btn-default btn-sm active quiz_counter_btn"></button>');
    }

    for (let i = 0; i < $('.quiz_counter_btn').length; i++) { //循环添加序号以及生成题目号
        $('.quiz_counter_btn').eq(i).attr('data-btn-order', i)
            .text(i + 1);
    }

    $('.quiz_counter_btn').on('click', function() { //添加题号点击跳转事件
        //实现步骤
        //1. 消除 其他 带有活动类名 的页面的 显示状态 和 活动类名 和 内联样式 ，添加消失动画
        //2.给点击按钮对应题号的页面添加活动类名
        //3.给活动类名添加显示动画
        //获取到点击题目对应的序号  0-19
        let btn_order = $(this).attr('data-btn-order');

        //清除其他第一页的类名
        $('.quiz_page').removeClass('page_first');

        $('.page_act').css('display', 'block').css('opacity', '0'); //page_act消失动画
        setTimeout(function() { //移除点击前页面的显示
            $('.page_act').css('display', 'none')
                .removeClass('page_act') //移除活动类名
                .removeAttr('style'); //移除内联样式

            setTimeout(function() { //完成上一步后 给题号对应页面添加事件 
                //获取到对应的页面  =>  添加 活动 类名
                $('.quiz_page').eq(btn_order).addClass('page_act');
                $('.page_act').css('display', 'block');
                setTimeout(function() {
                    $('.page_act').css('opacity', '1')
                }, 17); //设置16.7ms等待$('.page_act').css('display', 'block')完成
            }, 0);

        }, 400);

    });
})

function dragFunc(id) { //原生js div拖动
    var Drag = document.getElementById(id);
    Drag.onmousedown = function(event) {
        var ev = event || window.event;
        event.stopPropagation();
        var disX = ev.clientX - Drag.offsetLeft;
        var disY = ev.clientY - Drag.offsetTop;
        document.onmousemove = function(event) {
            var ev = event || window.event;
            Drag.style.left = ev.clientX - disX + "px";
            Drag.style.top = ev.clientY - disY + "px";
            Drag.style.cursor = "move";
        };
    };
    Drag.onmouseup = function() {
        document.onmousemove = null;
        this.style.cursor = "default";
    };
};
// dragFunc("quiz_timer");
dragFunc("quiz_counter");

$(function() { //选项被选中时的样式 和 生成分数

    $('.options_base').on('click', function() {
        let data_user_answer = $(this).attr('data-user-answer'); //当前题目用户的选择
        let quiz = $(this).parents('.quiz_options').siblings('.quiz_body').find('.quiz_detail'); //当前选项对应的题目详情区
        let data_answer = $(this).parents('.quiz_options').siblings('.quiz_body').find('.quiz_detail').attr('data-answer'); //当前题目的正确答案
        let page_order = quiz.parents('.quiz_page').attr('data-order'); //当前题目页码
        let counter_btn = $(`[data-btn-order=${page_order}]`); //页码对应的计数器按钮

        quiz.parents('.quiz_page').find('.options_base').css('background-color', ''); //清除当前页面题目的其他选项背景色
        $(this).css('background-color', 'rgb(220, 220, 220)'); //给选中选项添加背景色

        //给正确选项赋予属性true-answer 在答题完毕时显示正确答案为绿色
        $(this).parents('.quiz_options').find('.options_base').eq(data_answer).attr('true-answer', '1');

        if (data_user_answer == data_answer) { //如果答对
            // console.log('答对了！');
            $(this).css('background-color', '#dff0d8'); //添加答对的背景色
            quiz.attr('data-score', '5'); //将题目得分置为5分
            counter_btn.css('background-color', 'rgb(227, 255, 216)');
        } else {
            counter_btn.css('background-color', 'rgb(255, 209, 209)');
        }
    });
});