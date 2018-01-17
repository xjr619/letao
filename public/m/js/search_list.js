var obj = lt.getUrlParameters(location.search)
// 下拉刷新
mui.init({
  pullRefresh : {
    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down : {
      height:50,//可选,默认50.触发下拉刷新拖动距离,
      auto: false,//可选,默认false.首次加载自动下拉刷新一次
      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
      callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        loadDta( {
          "proname":obj["proname"],
          "page":1,
          "pageSize":10
        });
        setTimeout(function(){
          mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        },1000)
      } 
    },
    up :{
      height:50,//可选.默认50.触发上拉加载拖动距离
      auto:false,//可选,默认false.自动上拉加载一次
      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
      callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        loadDta( {
          "proname":obj["proname"],
          "page":1,
          "pageSize":10
        });
       var _this = this;
       setTimeout(function(){
        mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
        _this.endPullupToRefresh(true);
       },1000)
      } 
    }
  }
});
// 封装下载数据的方法
function loadDta(data){
  $.ajax({
    url : "/product/queryProduct",
    type:"GET",
    dataType:"json",
    data:data,
    success:function(result){
      console.log(result);
      var html  = template("productTemp",result);
      $(".produts ul").html(html);
    }
  })
}
// 加载一次数据
loadDta( {
  "proname":obj["proname"],
  "page":1,
  "pageSize":10
});
$(".lt_bar a").on("tap",function(){
  var pramer = {
    "proname":obj["proname"],
    "page":1,
    "pageSize":10
  }
  // 根据价格或库存来排序
  if($(this).hasClass("now")){
    $(this).find("span").toggleClass("fa-angle-up  fa-angle-down");
  }else{
    $(this).siblings().removeClass("now").find("span").addClass("fa fa-angle-down");
    $(this).find("span").addClass("fa fa-angle-down");
    $(this).addClass("now");
  };
  var type = $(this).data("order");
  pramer[type] = $(this).find("span").hasClass("fa-angle-down")?2:1;
  loadDta(pramer);
})
$(".produts").on("tap",".product_detail",function(){
  var id = $(this).data("id");
  location.href = "productDetails.html?id=" + id;
})