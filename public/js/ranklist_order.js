$(function() { //排名第4及以后的名次序号
    for (let i = 0; i < $('.order').length; i++) {
        $('.order').eq(i).text(i + 4);
    }
});