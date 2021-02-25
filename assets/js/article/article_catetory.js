$(function() {
    const layer = layui.layer
    const form = layui.form
    getArticleList()

    // 获取文章分类列表
    function getArticleList() {
        //发送请求
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章分类列表失败！');
                }

                var htmlStr = template('tpl', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    $('#addbtn').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#add').html()
        });


    })

    //添加文章类别
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()

        //发送请求
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('新增文章分类失败！')
                }
                layer.msg('新增文章分类成功！')
                layer.close(indexAdd)
                getArticleList()
            }
        })
    })

    var indexEdit;
    //编辑文章分类
    $('tbody').on('click', '#editbtn', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $('#edit').html()
        });

        //获取当前编辑按钮的id
        var id = $(this).attr('data-id')

        //发送请求
        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'GET',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章分类数据失败！')
                }

                form.val("formTest", res.data);
            }

        })


    })

    //监听表单提交事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()

        //发送请求
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('更新分类信息失败！')
                }
                layer.msg('更新分类信息成功！')

                //关闭弹出框
                layer.close(indexEdit)

                //跟新页面
                getArticleList()
            }

        })
    })

    //删除文章类别
    $('body').on('click', '#delbtn', function() {
        //获取当前删除按钮的id
        var id = $(this).attr('data-id')

        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {


            //发送请求
            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'GET',
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg('删除文章分类失败！')
                    }

                    layer.close(index);
                    //跟新页面
                    getArticleList()
                }
            })


        });


    })
})