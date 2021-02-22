$(function() {
    const form = layui.form
    const layer = layui.layer

    // 密码校验规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value == $('#oldPwd').val()) {
                return '新密码不能与旧密码一样'
            }
        },
        rePwd: function(value) {
            if (value != $('#newPwd').val()) {
                return '两次密码不一致'
            }
        }
    })

    //监听表单提交事件
    $('.layui-form').submit(function(e) {
        e.preventDefault()

        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')

                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})