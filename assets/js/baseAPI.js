$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    //统一设置有权限的请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        options.complete = function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 清空本地存储的token
                localStorage.removeItem('token')

                // 返回到登录页面
                location.href = '/login.html'
            }
        }
    }
})