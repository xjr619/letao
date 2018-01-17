/**
 * Created by Administrator on 2017/12/19.
 */
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false
});

mui('.mui-slider').slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});


var lt = {
    /*获取url参数*/
    getUrlParameters:function(str){
        var obj = {};
        /*str:"?proname=1&name=jack&age=20"*/
        str = str.substring(1); //proname=1&name=jack&age=20
        /*按&进行分割*/
        var arr = str.split("&"); //["proname=1","name=jack","age=20"]
        /*再次分割*/
        for(var i=0;i<arr.length;i++){
            var temp = arr[i].split("="); // ["proname","1"]
            obj[temp[0]] = temp[1]; //obj[proname] = 1 \\ obj.proname = 1
        }
        return obj;
    }
}