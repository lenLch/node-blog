/**
 * Created by len on 17-3-28.
 */

$(function () {
    /*var local = window.location.href;
    var user = local.replace('http://localhost:8000/index?name=','');
    if (user.length == 27) {
        $('.username').html('');
    }else {
        $('.username').html(user);
    }*/


    // 退出
    $('.exit').on('click',function(){
        $.ajax({
            url: '/api/user/logout',
            success: function(result){
                if(!result.code) {
                    window.location.href = '/login';
                }
            }
        });
    });
});

/*var ul = document.getElementById('nav');
var lis = ul.getElementsByTagName('li');
for(var i = 0; i < lis.length; i++){
    lis[i].onclick = function () {
        for(var j = 0; j < lis.length; j++){
            lis[j].setAttribute('class','');
        }
        this.setAttribute('class','yanse');
    }
}*/
