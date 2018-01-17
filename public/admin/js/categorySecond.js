$(function () {
    // 二级分类渲染
    var currentPage = 1;
    var render = function (pageSize = 3) {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            type: "GET",
            dataType: "json",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (result) {
                var html = template("secondTemp", result);
                $("table tbody").html(html);
                // 渲染分页区域
                setPagination(Math.ceil(result.total / result.size));
            }
        })
    }
    // 页面进入渲染
    render();
    // 点击显示二级分类模态框
    $("#addSecondcategory").on("click",function(){
        // 显示模态框
        $(".secondModal").modal("show");
        // 渲染一级分类列表
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"GET",
            dataType:"json",
            data:{
                page:1,
                pageSize:100
            },
            success:function(result){
                var html = "";
                $.each(result.rows,function(index,element){
                    html +="<li><a href='#' data-id='"+element.id+"'>"+element.categoryName+"</a></li>"
                });
                $("#firstList").html(html);
            }
        })

    });
    // 点击列表中的选项可以改变选择
    $(document).on("click","#firstList a",function(){
       $(".choseSomething").text($(this).text());
       $("[name='categoryId']").val($(this).data("id"));
    })
    // 图片上传
    $('.addPic').fileupload({
        dataType: 'json',
        done: function (e, data) {
           $(".loadImg").attr("src",data.result.picAddr);
           $("[name = 'brandLogo']").val(data.result.picAddr);
        }
    });
    // 点击添加二级分类
    $("#saveSecond").on("click",function(){
      $.ajax({
          url:"/category/addSecondCategory",
          type:"POST",
          dataType:"json",
          data:$("form").serialize() + "&hot=1",
          success:function(result){
              if(result.success){
                //   添加成功重新渲染页面模态框消失
                render();
                $(".secondModal").modal("hide");
              }
            //   重置表单
            $("form")[0].reset();
          }
      })
    })
    // 分页区渲染函数
    function setPagination(total) {
        $(".mypagintor").bootstrapPaginator({
            bootstrapMajorVersion: 3,
            size: "small",
            currentPage: currentPage,
            totalPages: total,
            onPageClicked: function (event, originalEvent, type, page) {
                // 点击的时候改变当前页
                currentPage = page;
                // 点击分页区域同时渲染页面
                render();
            }
        });
    }
})