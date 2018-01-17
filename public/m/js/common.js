//获得slider插件对象
mui('.mui-slider').slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});
// 区域滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false,
  scrollY: true
});
// 底部菜单栏切换
$(".lt_footer > a").on("tap",function(e){
  $(this).siblings().removeClass("now");
  $(this).addClass("now");
})
//封装分割方法
var lt = {
   getUrlParameters:function(str){
    //  定义空对象最为返回数据
     var obj = {};
       /*str:"?proname=1&name=jack&age=20"*/
    //  把数据的?号给去掉
     var str = str.substring(1);
    //  按&分割一次
     var arr = str.split("&");
     for(var i = 0; i < arr.length; i ++){
      //  每个分开的字符又按=分割形成两个
         var temp = arr[i].split("=");
        //  用对象分别存键和值，等号左边是键右边是值
        obj[temp[0]] = temp[1];
     }
    //  遍历存完之后把对象返回
     return obj;
   }
}
