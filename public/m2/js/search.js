/**
 * Created by Administrator on 2017/12/20.
 */


/*当页面打开的时候，需要去获取用户之前的搜索记录，进行搜索记录的数据展示*/
function loadHistory(){
    var arr = getHistoryData();
    var html = template("ltHistory",{"items":arr});
    $(".lt_searchList ul").html(html);
}
loadHistory();
/*获取当前历史记录数据*/
function getHistoryData(){
    /*我们将数据存储在localStorage中.在存储的时候名字一定要约定好，将来不能随意修改
    * 存储数据的时候只能存储字符串*/
    //localStorage.setItem("lt_history_data",'["电脑","手机","平板"]');
    var str = localStorage.getItem("lt_history_data");
    var arr = JSON.parse(str || "[]");
    return arr;
}

/*单击搜索，收集用户数据，实现页面的跳转*/
$(".lt-search_btn").on("tap",function(){
    var value = $(".lt-searchText").val();
    /*实现跳转*/
    location.href="searchList.html?proname="+value;
    /*实现跳转的同时，我们还需要将当前用户输入的搜索关键字存储到某个数据结构*/
    var arr = getHistoryData();


    /*添加之前进行一些判断*/
    /*1.判断搜索记录是否已经存在 ，如果存在，先删除再添加*/
    for(var i=0;i<arr.length;i++){
        if(arr[i] == value){
            /*删除*/
            arr.splice(i,1);
            break;
        }
    }

    /*2.判断数量是否==10，如果为10，则先删除最先存储的记录，再添加*/
    if(arr.length == 10){
        arr.splice(0,1);
        //arr.shift();
    }

    /*将当前搜索数据存储到数组中*/
    arr.push(value);
    /*重新将添加了当前搜索记录的数组数据重新写入localStorage中*/
    localStorage.setItem("lt_history_data",JSON.stringify(arr));
});

/*删除单条记录*/
$(".lt_searchList").on("tap",".fa-close",function(){
    var arr = getHistoryData();
    var index = $(this).data("index");
    arr.splice(index,1);
    localStorage.setItem("lt_history_data",JSON.stringify(arr));
    /*重新刷新显示*/
    var html = template("ltHistory",{"items":arr});
    $(".lt_searchList ul").html(html);
});
/*清除所有记录*/
$(".lt_searchTitle a").on("tap",function(){
    localStorage.setItem("lt_history_data","");
    var html = template("ltHistory",{"items":[]});
    $(".lt_searchList ul").html(html);
});

