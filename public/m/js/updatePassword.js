mui.init();
// 获取验证码
$(".get_vertif").on("tap",function(){
  $.ajax({
    url:"/user/vCodeForUpdatePassword",
    type:"GET",
    data:{

    },
    dataType:"json",
    success:function(result){
      console.log(result);
      $("[name='code']").val(result.vCode);
    }
  })
})
$(".sure_update").on("tap",function(){
  var oldPassword = $(".oldPassword").val();
  var newPassword = $(".newPassword").val();
  var vCode = $("[name='code']").val();
  $.ajax({
    url:"/user/updatePassword",
    type:"POST",
    data:{
      oldPassword:oldPassword,
      newPassword:newPassword,
      vCode:vCode
    },
    dataType:"json",
    success:function(result){
      console.log(result);
      if(result.success){
       mui.toast("修改成功");
        // 判断是否从前面跳过来是的话就跳回否则跳回首页
        if(location.search && location.search.indexOf("?backurl=")>-1){
          location.href = location.search.replace("?backurl=","");
        }else{
          location.href = "index.html";
        }
      }
    }
  })
})