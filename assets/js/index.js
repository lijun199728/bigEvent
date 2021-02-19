$(function() {
    getUserInfo()

    // 点击退出按钮返回登录页面
    $('#exit').on('click', function() {
        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {

            // 清空本地存储的token
            localStorage.removeItem('token')

            // 返回到登录页面
            location.href = '/login.html'

            layer.close(index);
        });
    })
})

// 获取用户信息方法
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(res) {
            if (res.status !== 0) {
                console.log(res);
                return layui.layer.msg('获取用户信息失败！')
            }

            //渲染头像
            rendAvatar(res.data)
        }

    })
}

// 渲染头像方法
function rendAvatar(user) {
    // 获取文字信息
    var name = user.nickname || user.username
    $('#welcome').html('欢迎' + name)

    // 显示头像
    if (user.user_pic != '') {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()

        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}