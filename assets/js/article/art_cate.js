$(function() {
    // 获取文章分类的列表
    initArtCateList()
    var layer = layui.layer
    var form = layui.form

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/cate/list',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    //为添加类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });

    })

    //通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/cate/add',
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                layer.close(indexAdd)
            }
        })
    });


    // 通过代理的形式， 为btn - edit按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
            //弹出一个修改文章的分类信息的层
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '修改文章分类',
                content: $('#dialog-edit').html()
            })

            var id = $(this).attr('data-id')
                //发起请求获取对应的数据
            $.ajax({
                method: 'GET',
                url: '/my/cate/info?id=' + id,
                success: function(res) {
                    form.val('form-edit', res.data)
                }
            })
        })
        // 修改功能实现
        //通过代理形式，为修改分类的表单绑定submit事件
        // 实现思路
        // 1、点击要有一个弹窗 
        // 2、弹窗里面有form表单 
        // 3、表单中有当前修改分类的数据回显 
        // 4.修改
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'PUT',
            url: '/my/cate/info',
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('更新分类失败！')
                }
                layer.msg('更新分类成功！')
                layer.close(indexEdit) //后关闭弹窗
                initArtCateList()
            }
        })
    })

    // 删除功能实现
    // 通过代理形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
            // console.log('ok');
            var id = $(this).attr('data-id')
                //提示用户是否要删除
            layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
                //do something
                $.ajax({
                    method: 'DELETE',
                    url: '/my/cate/del?id=' + id,
                    success: function(res) {
                        if (res.code !== 0) {
                            return layer.msg('删除分类失败！')
                        }
                        layer.msg('删除分类成功！')
                        layer.close(index);
                        initArtCateList()
                    }
                })

            });
        })
        // 通过代理的形式，为删除按钮绑定点击事件
        // $('tbody').on('click', '.btn-delete', function() {
        //     var id = $(this).attr('data-id')
        //         // 提示用户是否要删除
        //     layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
        //         $.ajax({
        //             method: 'DELETE',
        //             url: '/my/cate/del?id=' + id,
        //             success: function(res) {
        //                 if (res.code !== 0) {
        //                     return layer.msg('删除分类失败！')
        //                 }
        //                 layer.msg('删除分类成功！')
        //                 layer.close(index)
        //                 initArtCateList()
        //             }
        //         })
        //     })
        // })

})