var currentPage = 1;
function render(pagesize=2){
    $.ajax({
        url:"/user/queryUser",
        type:"GET",
        dataType:"json",
        data:{
            page:currentPage,
            pageSize:pagesize
        },
        success:function(result){
            console.log(result);
           var html = template("userMangeTem",result);
           $("table tbody").html(html);
            // 渲染分页区域
            setpagination(Math.ceil(result.total/result.size));
        }
    })
};
// 进行渲染
render(2);
// 定义分页函数
function setpagination(total){
        $(".mypagintor").bootstrapPaginator({
            bootstrapMajorVersion:3,
            size:'small',
            alignment:"left",//居中显示
            totalPages: total,//总页数 注意不是总条数
            onPageClicked:function(event, originalEvent, type,page){
                // 重新改变当前的页码
                currentPage = page;
                //点击分页的时候重新渲染数据
                render(2);             
            }
         });
}
// 修改启用和禁用状态
$("table").on("click",".btn",function(){
    var id = $(this).data("id");
    var isDelete = $(this).parent().siblings(".status").text()=="已启用"?1:0;
    var _this = this;
    $.ajax({
        url:"/user/updateUser",
        type:"POST",
        data:{
            id:id,
            isDelete:isDelete
        },
        dataType:"json",
        success:function(result){
            // 如果修改成功则修改当前的状态
            if(result.success){
                isDelete==0?$(_this).text("禁用").toggleClass("btn-danger btn-success"):$(_this).text("启用").toggleClass("btn-danger btn-success");
                isDelete ==0?$(_this).parent().siblings(".status").text("已启用"):$(_this).parent().siblings(".status").text("已禁用");
            }
        }
    })
})
