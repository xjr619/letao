
var paramObj = lt.getUrlParameters(location.search);
var id = paramObj.id;
$.ajax({
  url:"/product/queryProductDetail",
  type:"GET",
  dataType:"json",
  data:{"id":id},
  success:function(result){
    console.log(result);
   var html = template("detailTemp",result);
   $(".lt_parent .mui-table-view").html(html);
  //  动态生成的需要手动设置图片轮播
  // 图片轮播
mui('.mui-slider').slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});
// 初始化数字输入框
mui(".mui-numbox").numbox();
  }
});
$(document).on("tap",".prosize",function(){
  $(this).siblings().removeClass("now");
  $(this).addClass("now");
})
// 添加到购物车
$(".mui-badge-danger").on("tap",function(){
  var data = {
    "productId":id,
    "num":$(".mui-input-numbox").val(),
    "size":$(".prosize.now").text()
  }
 $.ajax({
   url:"/cart/addCart",
   data:data,
   type:"POST",
   dataType:"json",
   success:function(result){
     console.log(result);
    if(result.error == 400){
      mui.toast(result.message);
      setTimeout(function(){
        // 把得到的当前页的路径作为数据传送
        location.href = "login.html?backurl="+ location.href;
      },1000)
    }else{
      mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e) {
          if (e.index == 0) { 
            // 登录成功跳到购物车
              location.href="cart.html";
          }
      })
    }
   }
 })
})
