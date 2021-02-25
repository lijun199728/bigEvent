$(function() {

    const layer = layui.layer
    const form = layui.form

    getClassList()

    //初始化富文本编辑器
    initEditor()

    //获取文章分类列表
    function getClassList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取列表失败！')
                }

                //模板引擎渲染页面
                var htmlStr = template('tpl', res)
                $('#cate_id').html(htmlStr)

                //调用layui封装的方法重新渲染页面
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //选择文件点击按钮
    $('.select').on('click', function(e) {
        e.preventDefault()
        $('#file').click()
    })

    //将选择图片放入裁剪区
    $('#file').on('change', function(e) {

        //获取选择的图片
        var files = e.target.files

        //判断是否选择了图片
        if (files.length == 0) {
            return
        }

        // 根据选择的文件， 创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(files[0])

        console.log(files[0]);

        // 先销毁旧的裁剪区域， 再重新设置图片路径， 之后再创建新的裁剪区域：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域




    })

    //定义一个发表文章状态的变量
    var state = '已发布'

    //当点击草稿按钮时将状态改为草稿
    $('#save').click(function() {
        state = '草稿'
    })


    //监听表单提交事件
    $('.layui-form').submit(function(e) {
        e.preventDefault()

        //基于表单创建一个formdata数据对象
        var fd = new FormData($(this)[0])

        fd.append('state', state)

        //将图片转换为文件格式
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                fd.append('cover_img', blob)

                //发送请求
                $.ajax({
                    url: '/my/article/add',
                    method: 'POST',
                    data: fd,
                    //发送formdata数据一定要配置下面两个属性
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if (res.status != 0) {
                            return layer.msg('发布文章失败！')
                        }
                        layer.msg('发布文章成功！')

                        location.href = '../../../article/article_list.html'
                    }
                })
            })
    })
})