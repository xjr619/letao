$(".mui-button-row").on("tap",function(){
  $.ajax({
  url:"/user/login",
  type:"POST",
  dataType:"json",
  data:{
    "username":$(".mui-input-clear").val(),
    "password":$(".mui-input-password").val()
  },
  success:function(result){
    console.log(result);
    if(result.success){
      // 判断是否从首页跳转过来的
      if(location.search && location.search.indexOf("?backurl")==0){
        // 把前面字符替换成空字符串，让它跳回响应页面
        location.href = location.search.replace("?backurl=","");
      }else{
        // 不是的话则是从首页过来跳回首页
        location.href = "index.html";
      }
    }else{
      mui.toast(result.message);
    }
  }
  })
});