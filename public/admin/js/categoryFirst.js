$(function () {
    // 渲染一级分类内容
    var currentPage = 1
    var render = function(pageSize = 3){
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"GET",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(result){
                console.log(result);
               var html = template("firstCategoryTem",result);
               $("table tbody").html(html);
            //    渲染页面的时候同时渲染分页区域，
            setPagination(Math.ceil(result.total / result.size));
            }
        })
    };
    // 分页区渲染函数
    function setPagination(total){
        $(".mypagintor").bootstrapPaginator({
            bootstrapMajorVersion:3,
            size:"small",
            currentPage:currentPage,
            totalPages:total,
            onPageClicked:function(event,originalEvent,type,page){
                // 点击的时候改变当前页
                currentPage = page;
                // 点击分页区域同时渲染页面
                render();
            }
        });
    }
    // 进入的时候渲染
    render();
    // 点击出现模态框添加一级分类
    $(".showfirstModal").on("click",function(){
        $('.fisrtModal').modal('show');
        $(".addFisrt").on("click",function(){
            var categoryName = $(".categoryName").val();
            $.ajax({
                url:"/category/addTopCategory",
                type:"POST",
                data:{
                    categoryName:categoryName
                },
                dataType:"json",
                success:function(result){
                   if(result.success){
                    $('.fisrtModal').modal('hide');
                    // 消失之后自动渲染
                    render();
                   }
                }
            });
        })
    })
})