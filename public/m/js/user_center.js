$(".safe").on("tap",function(){
  // 得到当前的网路地址
  var url = location.href;
  // 把当前路径带过去
  window.location.href = "upatepassword.html?backurl=" + url;
})
// 退出
$(".login_out").on("tap",function(){
  $.ajax({
    url:"/user/logout",
    type:"GET",
    dataType:"json",
    success:function(result){
      if(result.success){
        window.location.href = "login.html";
      }
    }
  })
})