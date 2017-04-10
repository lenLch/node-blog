/**
 * Created by len on 17-4-10.
 */

var prepage = 10;
var page = 1;
var pages = 0;
var comments = [];

// 提交评论
$('#messageBtn').on('click',function(){
    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        data: {
            contentid: $('#contentId').val(),
            content: $('#messageContet').val()
        },
        success: function(responseDate) {
            // console.log(responseDate);
            $('#messageContet').val('');
            comments = responseDate.data.comments.reverse();
            renderComment();
        }
    });
});

// 每次页面重载的时候获取一下该文章的所有评论
$.ajax({
    url: '/api/comment',
    data: {
        contentid: $('#contentId').val()
    },
    success: function(responseDate) {
        comments = responseDate.data.reverse()
        renderComment();
    }
});

$('.pager').delegate('a','click',function(){
    if($(this).parent().hasClass('previous')) {
        page--;
    }else {
        page++;
    }
    renderComment();
});

function renderComment() {
    $('#count').html(comments.length);

    pages = Math.max(Math.ceil(comments.length / prepage),1);
    var start = Math.max(0,(page-1) * prepage);
    var end = Math.min(start + prepage,comments.length);


    var $lis = $('.pager li');
    $lis.eq(1).html( page + '/' + pages);

    if (page <= 1) {
        page = 1;
        $lis.eq(0).html('<span>没有上一页</span>');
    } else {
        $lis.eq(0).html('<a href="javascript: ;">上一页</a>');
    }

    if (page >= pages) {
        page = pages;
        $lis.eq(2).html('<span>没有下一页</span>')
    } else {
        $lis.eq(2).html('<a href="javascript: ;">下一页</a>');
    }

    if(comments.length == 0){
        $('#liuyan').html('<p>还没有评论</p>')
    }else{
        var html = '';
        for(var i = start; i < end; i++){
            html += '<div class="yonghu">' +
                '<div class="hei">' +
                '<span>'+comments[i].username+'</span>' +
                '<span>'+formatDate(comments[i].postTime)+'</span>' +
                '</div>' +
                '<p>'+comments[i].content+'</p>' +
                '</div>';
        }
        $('#liuyan').html(html);
    }
}

function formatDate(d) {
    var date1 = new Date(d);
    return date1.getFullYear() + '年' + (date1.getMonth() + 1) + '月' + date1.getDate() + '日' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
}