/**
 * Created by len on 17-3-19.
 */

$(function () {

    $('#denglu').on('click',function(){
        $.ajax({
            type: 'post',
            url: 'api/user/login',
            data: {
                username: $("input[name='username']").val(),
                password: $("input[name='password']").val(),
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $('p.tishi').html(result.message);
                if (result.code == 0) {
                    $('p.tishi').html(result.message + '1s后跳转');
                }
                if (!result.code) {
                    setTimeout(function () {
                        // window.location.href = './index?name=' + result.userInfo.username;
                        window.location.href = './';
                    },1000)

                }
            }
        });
    });

});