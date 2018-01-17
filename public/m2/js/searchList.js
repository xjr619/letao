/**
 * Created by Administrator on 2017/12/20.
 */
mui.init({
    /*下拉刷新*/
    pullRefresh : {
        container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            auto: false,//可选,默认false.首次加载自动下拉刷新一次
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback :function(){
                loadData({
                    "proName":obj["proname"],
                    "page":1,
                    "pageSize":10
                });
                /*确定如何进行下拉刷新操作*/
                /*1.重新加载数据*/
                /*2.让下拉刷新组件隐藏：关闭“正在刷新”的样式提示，内容区域回滚顶部位置*/
                setTimeout(function(){
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                },1000);
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        },
        up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:false,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :function(){
                var _this = this;
                setTimeout(function(){
                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                    _this.endPullupToRefresh(true);
                },1000);
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
    }
});

/*使用ajax请求数据*/

/*1.查询指定商品名称相关的数据*/
function loadData(data){
    $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:data,
        dataType:"json",
        success:function(result){
            /*渲染：不应该在搜索页面中展示，而应该在搜索结果页面中展示*/
            var html = template("lt_productBox",result);
            $(".lt_product ul").html(html);
        }
    });
}
/*开始加载一次数据*/
var obj = lt.getUrlParameters(location.search);
loadData({
    "proName":obj["proname"],
    "page":1,
    "pageSize":10
});

/*数据排序*/
$("[data-order]").on("tap",function(){
    var parameter = {
        "proName":obj["proname"],
        "page":1,
        "pageSize":10
    };

    /*js效果：
    * 1.如果当前被单击的a没有active样式，则先清除其它的a元素的Active样式，为当前元素添加active，同时将之前的a元素的箭头方向重置为向下
    * 2.如果当前被单击的a有active样式,则进行样式的切换*/
    if($(this).hasClass("now")){
        /*样式的切换*/
        $(this).find("span").toggleClass("fa-angle-up fa-angle-down");
    }
    else{
        $("[data-order].now").find("span")[0].className = "fa fa-angle-down";
        $(this).siblings().removeClass("now");
        $(this).addClass("now");
    }

    /*将当前排序的属性添加到参数*/
    var type = $(this).data("order");
    /*获取排序方式：升序|降序*/
    parameter[type] = $(this).find("span").hasClass("fa-angle-down")?2:1;
    console.log(parameter);
    loadData(parameter);
});