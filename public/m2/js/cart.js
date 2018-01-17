/**
 * Created by Administrator on 2017/12/22.
 */
mui.init({
    pullRefresh : {
        container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            auto: true,//可选,默认false.首次加载自动下拉刷新一次
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback :function(){
                /*重新加载数据*/
                setTimeout(function(){
                    render();
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                },1000);
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
    }
});

// 数据渲染
function render(){
    $.ajax({
        url:"/cart/queryCart",
        type:"GET",
        dataType:"json",
        success:function(result){
           var html = template("cartTEMP",{"items":result});
           $("#OA_task_2").html(html);
        }
    })
}
render();
// 点击编辑的时候进行编辑
$("#OA_task_2").on("tap",".mui-btn-blue",function(){
    var _this = this;
    var data = this.dataset;
    var panelHtml = template("editTEMP",data);
    var li = this.parentNode.parentNode;
        /*为了让span能够在同一行展示，需要将这段模板字符串中的换行符进行替换*/
        mui.confirm(panelHtml.replace(/\n/g,""),"编辑商品",["确定","取消"],function(e){
            var size = $(".proSize.now").text();
            var num = $(".mui-input-numbox").val();
            if(e.index ==0){ //确定
                $.ajax({
                    url:"/cart/updateCart",
                    type:"POST",
                    data:{
                        id:data.id,
                        size:size,
                        num:num
                    },
                    dataType:"json",
                    success:function(result){                      
                    /*闭合滑动操作*/
                    // 收集修改之后的数据
                    var size = $(".proSize.now").text();
                    var num = $(".mui-input-numbox").val();
                    // 把修改之后的数据重新修改显示
                    $(li).find(".cart-num").text("x" + num + "双");
                    $(li).find(".cart-size").text("鞋码："+size);
                    // 修改按钮属性上带有的数据，下次进来可直接读取，防止读的是以前的数据
                    $(_this).data("size",size).data("num",num);
                    // 点击确定之后再重新计算一次价格前提是修改复选框的双的数量
                    $(li).find(".chk").data("num",num);
                    caculate();
                    mui.swipeoutClose(li);
                    }
                })
            }else{//取消
                mui.swipeoutClose(li);
            }
        });
        /*数字输入框的重新初始化*/
        /*动态生成的轮播图和数字输入框需要重新初始化*/
        mui(".mui-numbox").numbox();
});
// 点击删除操作
$("#OA_task_2").on("tap",".mui-btn-danger",function(){
    var id = $(this).data("id");
    var arr = [];
    arr.push(id);
//    $.ajax({
//        url:"/cart/deleteCart",
//        type:"GET",
//        data:{"id":[id]},
//        dataType:"json",
//        success:function(reslut){

//        }
//    })
})
// 点击切换小点背景
$(document).on("tap",".proSize ",function(){
    $(this).siblings().removeClass("now");
    $(this).addClass("now");
})
// 点击计算价格
$(document).on("change",".chk",function(){
    caculate();
})
// 计算价格
function caculate(){
    // 得到选择的复选框
   var chks = $(".chk:checked");
   var total = 0;
   for(var i = 0; i< chks.length; i++){
       total += chks[i].dataset["price"] * chks[i].dataset["num"];
   }
   $(".createOrder span").text("订单总金额：￥"+total);
}
