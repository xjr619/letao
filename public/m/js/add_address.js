mui.init();
$(".sure_add").on("tap",function(e){
  $.ajax({
    url:"/address/addAddress",
    type:"POST",
    dataType:"json",
    data:$("form").serialize(),
    success:function(result){
      if(result.success){
        mui.toast("添加收或地址成功");
        location.href = "address.html";
      }
    }
  })
})