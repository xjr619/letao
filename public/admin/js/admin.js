

// 点击管一二级单切换
$(".lt_nav li").on("click", function () {
    $(this).find("p").toggle(500);
    $(this).siblings().removeClass("now").end().addClass("now");
  });
  // 点击切换响应内容的整个显示
  $(".change_menu").on("click", function () {
    $(".aside").toggle();
    $(".main").toggleClass("now");
  });
  // 模态框结构让他动态加载到每个页面中的到重复利用定义一个自执行函数让模态框结构开始就加载到页面道中
  ;(function(){
        var str = `<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">退出提示</h4>
            </div>
            <div class="modal-body">
            请问你是否真的需要退出
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary">确定</button>
            </div>
          </div>
        </div>
      </div>`;
      $(".modal_box").html(str);
    })();
    // 点击出现是否退出的模态框
    $(".login_out").on("click",function(){
      //  点击退出按钮模态框显示
      $('#myModal').modal('show');
      // 点击确定后想后台发送退出请求，同时返回登录页模态框消失
      $(".btn-primary").off("click",".btn-primary").on("click",function(){
          $.ajax({
            url:"/employee/employeeLogout",
            type:"GET",
            data:{},
            dataType:"json",
            success:function(result){
                if (result.success) {
                  // 跳回登录页
                  //location.href = login.html;
                  // 模态框消失
                  $('#myModal').modal('hide');
                  console.log(1);
                }
            }
          })
      })
    })
    