// 加载收货人信息
function render() {
  $.ajax({
    url:"/address/queryAddress",
    type:"GET",
    dataType:"json",
    success:function(result){
      console.log(result);
      var html = template("addressTemp",result);
      $(".adress_detail").html(html);
    }
  })
}
render();
// 点点击修改相应的收货人信息
$(document).on("tap",".toupdateAdress",function(){
  var id = $(this).data("id");
  // 把id带过去要跳转的网页
  location.href = "updateAdress.html?addressId=" + id;
})