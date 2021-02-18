$(function() {
    $('#reg-link').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#login-link').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 获取layui中form对象
    var form = layui.form

    // 获取layui的layer
    var layer = layui.layer

    // 自定义验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        // 自定义注册页面两次密码一致规则
        repwd: function(value) {
            // 获取第一次输入的密码
            var val = $('.reg-box [name=password]').val()

            if (val !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()

        // 发送Ajax请求
        $.post('/api/reguser', $(this).serialize(), function(res) {

            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')

            $('#login-link').click()
        })
    })

    //监听登录表单提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg('登录成功！')

                // 将获取到的token存入本地存储
                localStorage.setItem('token', res.token)

                // 登录成功跳转到主页
                location.href = '/index.html'
            }
        })
    })
})