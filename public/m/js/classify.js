$(".lt_classify_list").on("tap","li",function(e){
  $(this).siblings().removeClass("now");
  $(this).addClass("now");
  var id = $(this).data("id");
  //加载二级分类
  $.ajax({
    url:"/category/querySecondCategory",
    type:"get",
    dataType:"json",
    data:{"id":id},
    success:function(result){
      console.log(result);
      var html = template("secondTemp",result);
      $(".lt_content_list").html(html);
    }
  })
})
// 加载一级分类
$.ajax({
  url:"/category/queryTopCategory",
  type:"get",
  dataType:"json",
  success:function(result){
    var html = template("stairTemp",result);
    $(".lt_classify_list").html(html);
  }
})
// 加载第一个的二级分类

$.ajax({
  url:"/category/querySecondCategory",
  type:"get",
  dataType:"json",
  data:{"id":1},
  success:function(result){
    console.log(result);
    var html = template("secondTemp",result);
    $(".lt_content_list").html(html);
  }
})
// 区域滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false //是否显示滚动条
});