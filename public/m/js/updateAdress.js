// 得到要修改人信息的id
var id = location.search.split("=")[1];
// 填充对应id的数据
$.ajax({
  url:"/address/queryAddress",
  type:"GET",
  dataType:"json",
  success:function(result){
    console.log(result);
    // 遍历匹配知道和id对应的人信息
   var obj = {};
    for(var i=0;i<result.length;i++){
      if(id ==result[i].id){
        obj = result[i];
        break;
      }
    }
   $("[name='recipients']").val(obj.recipients);
   $("[name='postcode']").val(obj.postCode);
   $("[name='address']").val(obj.address);
   $("[name='addressDetail']").val(obj.addressDetail); 
  }
})
// 点击修改信息
$(".sure_add").on("tap",function(){
  $.ajax({
    url:"/address/updateAddress",
    type:"POST",
    dataType:"json",
    data:$("form").serialize() + "&id="+id+"",
    success:function(result){
          if(result.success){
            location.href = "address.html";
          }
    }
  })
})