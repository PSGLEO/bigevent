$(function() {
        //调用getUserInfo获取用户基本信息
        getUserInfo()


        var layer = layui.layer
            //点击按钮，实现退出功能
        $('#btnLogout').on('click', function() {
            // console.log('ok');
            //提示用户是否确认退出
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 1.清空本地存储中的token
                localStorage.removeItem('token')
                    // 2.重新跳转到登录页面
                location.href = '/login.html'
                    //关闭confirm询问框
                layer.close(index);
            });
        })
    })
    //获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.code !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用  renderAvatar() 渲染用户的头像
            renderAvatar(res.data)
        },
        //不论成功还是失败，最终都会调用complete回调函数
        // complete: function(res) {
        //         // console.log('执行了complete回调');
        //         // console.log(res);
        //         //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //         if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
        //             //强制清空token
        //             localStorage.removeItem('token')
        //                 //强制跳转登录页
        //             location.href = '/login.html'
        //         }
        //     }

    })
}








//渲染用户的头像
function renderAvatar(user) {
    //1.获取用户的头像
    // console.log(user);
    var name = user.nickname || user.username
        //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.按需渲染用户的头像
        //判断用户头像信息是否为空
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        //如果不为空则优先显示图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文本头像
        //如果没有图片图像则渲染文本头像
        $('.layui-nav-img').hide() //图片头像隐藏
        var first = name[0].toUpperCase() //设置变量接受用户名或昵称的首字母并通过toUpperCase()方法显示大写
        $('.text-avatar').html(first).show() //文本图像显示
    }
}