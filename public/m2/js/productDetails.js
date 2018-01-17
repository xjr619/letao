/**
 * Created by Administrator on 2017/12/20.
 */
mui.init({
    pullRefresh : {
        container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            auto: false,//可选,默认false.首次加载自动下拉刷新一次
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback :function(){
                /*重新加载数据*/
                setTimeout(function(){
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                },500);
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
    }
});


var gallery = mui('.mui-slider');
gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

/*加载当前产品的详细信息*/
var id = lt.getUrlParameters(location.search)["id"];
$.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{"id":id},
    dataType:"json",
    success:function(result){
        console.log(result);
        var html = template("proDetails",result);
        $(".mui-scroll").html(html);
        /*动态生成的轮播图和数字输入框需要重新初始化*/
        mui(".mui-numbox").numbox();
        mui('.mui-slider').slider({
            interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
        });
    }
});

/*加入到购物车*/
$(".mui-badge-danger").on("tap",function(){
    /*console.log(location.href);
    console.log(location.pathname);*/
    var data = {
        "productId":id,
        "num":$(".mui-input-numbox").val(),
        "size":$(".proSize.now").text()
    };
    $.ajax({
        type:"POST",
        url:"/cart/addCart",
        data:data,
        dataType:"json",
        success:function(result){
            console.log(result);
            if(result.error && result.error == 400){
                /*mui框架中提供一个一个会渐入渐出的消息提示框*/
                mui.toast(result.message);
                setTimeout(function(){
                    /*跳转到登陆的时候，需要将当前页面的地址传递给登陆页面，让其登陆成功之后能够重新跳转到当前页面*/
                    /*http://127.0.0.1:3000/mobile/user/login.html?backurl=http://127.0.0.1:3000/mobile/product.html?productId=2*/
                    location.href = "login.html?backurl="+location.href;
                },1000);
            }else{
                /*弹出提示框,提示添加成功，底部是否想查看购物车*/
                mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e) {
                    if (e.index == 0) { //索引就是当前按钮的索引
                        location.href="cart.html";
                    }
                })

            }
        }
    });
});

/*如果是动态生成的元素不能直接添加事件，而要使用事件委托*/
/*单击尺码切换样式*/
$(".mui-scroll").on("tap",".proSize",function(){
    $(this).siblings().removeClass("now");
    $(this).addClass("now");
});