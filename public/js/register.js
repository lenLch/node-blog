/**
 * Created by len on 17-3-19.
 */

$(function () {

    $('#zhuce').on('click',function () {
        // 通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $("input[name='username']").val(),
                password: $("input[name='password']").val(),
                repassword: $("input[name='repassword']").val()
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $('p.tishi').html(result.message);
                if (result.code == 0) {
                    $('p.tishi').html(result.message + '1s后跳转！');
                }
                if (!result.code) {
                    setTimeout(function () {
                        // window.location.href = './index?name=' + result.newUserInfo.username;
                        window.location.href = './';
                    }, 1000);
                }
            }
        });
    });

});