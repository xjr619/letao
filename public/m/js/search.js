// 根据读取的信息渲染模板
function loadHisroty(){
  // 得到数据
  var arr = getHistoryData();
  // 要渲染的html
  var html = template("historyTemp",{"items":arr});
  $(".search_content ul").html(html);
}
// 从本地存储读取数据约定名字是history
function getHistoryData(){
  // 得到的是数组信息的字符串
  var str = localStorage.getItem("history");
  // 转化成数组信息.没有的话给个空数组防止模板错误
  var arr = JSON.parse(str || "[]");
  return arr;
}
loadHisroty();
// 当点击搜索是跳转并往本地存储里面存上表单里面的值
$(".lt_search_box .search_btn").on("tap",function(){
    // 得到文本框中的值
    var value = $(".lt_search_box form > input").val();
  // 得到从前localStorage对象里面包含的数据
  var arr = getHistoryData();
  // 跳转
  location.href = "search_list.html?proName=" + value;
  // 判断要存的数据原来有么有的话删除原来的在存
  for(var i = 0;i < arr.length; i++){
    if(value == arr[i]){
      arr.splice(i,1);
      break;
    }
  }
  // 判断是否超过十条超过就删除最先加的
  if(arr.length ==10){
    arr.splice(0,1);
  }
  // 把值重新推进数组
  arr.push(value);
  // 重新把数组变成数组形式的字符串信息存进本地数据库
  var str = JSON.stringify(arr);
  localStorage.setItem("history",str);
  // 更新渲染历史记录
  // loadHisroty();
  var html = template("historyTemp",{"items":arr});
  $(".search_content ul").html(html);
})
// 点击删除记录删除对应的记录
$(".search_content ul").on("tap",".icon_delete",function(){
  // 拿到要删除的的记录索引
 var index = $(this).data("index");
  // 从本地存储中获取信息遍历要删除的记录相同的就删除
  var arr = getHistoryData();
  arr.splice(index,1);
  // 删除完毕重新把数组写进本地存储重新渲染
  var str = JSON.stringify(arr);
  localStorage.setItem("history",str);
  loadHisroty();
})
// 清空历史记录
$(".info_title .icon_clear").on("tap",function(){
  localStorage.setItem("history","[]");
  loadHisroty();
})
