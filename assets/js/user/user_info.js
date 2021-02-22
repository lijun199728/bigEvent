$(function() {
    const { form, layer } = layui

    form.verify({
        nickname: [
            /^[\S]{1,6}$/, '长度不得超过6位'
        ]
    })

    UserInfo()

    // 封装一个获取用户信息的方法
    function UserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res)
                }

                // 为表单赋值调用form.val()方法
                form.val('formUserInfo', res.data)
            }
        })
    }



    // 重置按钮
    $('#reset').click(function(e) {
        e.preventDefault()
        getUserInfo()
    })

    // 监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()

        // 发送请求修改数据
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！')

                // 调用父页面的方法跟新头像区域
                window.parent.getUserInfo()
            }
        })
    })
})