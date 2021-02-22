$(function() {
    //获取layer
    const layer = layui.layer

    //获取裁剪区域
    var $image = $('#image');

    //配置选项
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    };

    //创建裁剪区域
    $image.cropper(options);

    //点击上传按钮事件
    $('#choose').on('click', function() {

        $('#file').click()
    })

    // 为上传图片绑定change事件
    $('#file').change(function(e) {

        //获取选择的文件
        var files = e.target.files
        if (files.length === 0) {
            return layer.msg('请选择文件！')
        }

        //拿到用户选择的文件
        var file = e.target.files[0]

        //将图片转换为路径
        var urlImg = URL.createObjectURL(file)

        //重新渲染裁剪区域
        $image.cropper('destroy') //销毁原有裁剪区域
            .attr('src', urlImg) //为图片重新赋值地址
            .cropper(options) //重新创建裁剪区域
    })

    //上传图片
    $('#upload').on('click', function() {
        //获取裁剪的图片转化为base64格式
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        //发送请求
        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('跟新头像成功！')

                // 渲染头部头像
                window.parent.getUserInfo()
            }
        })
    })
})