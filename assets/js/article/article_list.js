$(function() {

    const layer = layui.layer
    const form = layui.form
    var laypage = layui.laypage;

    //定义查询参数，发送请求时提交参数
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '', //文章的状态
    }

    //定义一个美化事件的过滤器
    template.defaults.imports.dateFormat = function(data) {
        var dt = new Date(data)

        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        var d = dt.getDate()
        var hh = dt.getHours()
        var mm = dt.getMinutes()
        var ss = dt.getSeconds()

        return `${addZero(y)}-${addZero(m)}-${addZero(d)} ${addZero(hh)}:${addZero(mm)}:${addZero(ss)}`
    }

    //定义补零函数
    function addZero(n) {
        return n < 9 ? '0' + n : n
    }


    getArticleDate()

    //获取文章类表数据
    function getArticleDate() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: q,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败！')
                }
                layer.msg('获取文章列表成功！')

                var htmlStr = template('tpl', res)
                $('tbody').html(htmlStr)

                //调用渲染分页
                renderPage(res.total)
            }
        })
    }

    getArticleCatagory()

    //获取文章分类
    function getArticleCatagory() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl1', res)

                $('#cate_id').html(htmlStr)

                //通知layui重新渲染表单区域
                form.render()
            }
        })
    }

    //监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        q.cate_id = $('#cate_id').val()
        q.name = $('#name').val()

        //重新渲染页面
        getArticleDate()
    })

    //定义渲染分页的方法
    function renderPage(total) {

        //渲染分页
        laypage.render({
            elem: 'page',
            count: total, //数据总数
            limit: q.pagesize, //每页显示多少条数据
            curr: q.pagenum, //起始页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10], //每页显示多少条数据
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit

                //首次不执行,通过点击切换页码 
                if (!first) {
                    //重新渲染页面
                    getArticleDate()
                }
            }
        });
    }

    //发送请求删除文章数据
    $('tbody').on('click', '#delbtn', function() {
        var id = $(this).attr('data-id')
        var length = $('#delbtn').length

        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                url: '/my/article/delete/' + id,
                method: 'GET',
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功！')

                    if (length == 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1
                    }

                    // 重新渲染页面
                    getArticleDate()
                }
            })
            layer.close(index);
        });

    })

})