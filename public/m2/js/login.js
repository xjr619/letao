/**
 * Created by Administrator on 2017/12/22.
 */
$(".mui-btn-primary").on("tap",function(){
    $.ajax({
        type:"post",
        url:"/user/login",
        data:{
            "username":$(".mui-input-clear").val(),
            "password":$(".mui-input-password").val()
        },
        dataType:"json",
        success:function(result){
            console.log(result);
            /*登陆成功之后，应该进行页面的跳转*/
            /*1.如果是从之前某个页面进入到登陆，就需要重新跳转回之前页面*/
            /*2.如果是直接进入到登陆页，那么默认就跳转到首页*/
            if(result.success){
                /*location.search:?backurl=http://127.0.0.1:3000/m/productDetails.html?id=2*/
                if(location.search && location.search.indexOf("?backurl") == 0){ //说明是从某个页面跳转过来登陆页的
                    location.href = location.search.replace("?backurl=","");
                }else{
                    location.href="index.html";
                }
            }else{
                mui.toast(result.message);
        }
        }
    });
});