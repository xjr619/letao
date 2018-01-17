$(function () {

	mui.init({
		pullRefresh: {
			container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
			down: {
				height: 50,//可选,默认50.触发下拉刷新拖动距离,
				auto: false,//可选,默认false.首次加载自动下拉刷新一次
				contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
				contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
				contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
				callback: function () {
					console.log(1);
					setTimeout(function () {
						mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					}, 500);
				}
			},
			up: {
				height: 50,//可选.默认50.触发上拉加载拖动距离
				auto: false,//可选,默认false.自动上拉加载一次
				contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
					var _this = this;
					setTimeout(function () {
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
						_this.endPullupToRefresh(true);
					}, 1000)
				}
			}
		},
		swipeBack: true //启用右滑关闭功能
	});
	// $('#OA_task_2').on('slideright', '.mui-table-view-cell', function (event) { });
	//加载数据
	function render() {
		$.ajax({
			url: "/cart/queryCart",
			type: "GET",
			dataType: "json",
			success: function (result) {
				console.log(result);
				if (result.error) {
					window.location.href = "login.html";
					return;
				}
				var html = template("cartThingTemp", { "items": result });
				$("#OA_task_2").html(html);
			}
		});
	}
	// 渲染
	render();
			$("#OA_task_2").on('tap',".mui-btn-blue",function() {
				var _this = this;
				var data = this.dataset;
				var id = data.id;
				var li = this.parentNode.parentNode;
				var paneHtml = template("editTemp",data);
				mui.confirm(paneHtml.replace(/\n/g,""), '编辑商品', ["确认","取消"], function(e) {
					var num = $(".mui-input-numbox").val();
					var size = $(".prosize.now").text();
					if (e.index == 0) {
						$.ajax({
							url:"/cart/updateCart",
							type:"POST",
							data:{
								"id":id,
								"size":size,
								"num":num
							},
							dataType:"json",
							success:function(result){
						// 修改显示顺便修改编辑按钮上的而属性信息
						console.log(result);
						if(result.success){
							// 想后台请求修改成功才修改否则只是弹回不修改
							$(".cart_num").text("x"+num+"双");
							$(".cart_size").text("鞋码："+size+"");
							$(_this).data("size",size);
							$(_this).data("num",num);
							// 修改复选框带有的价格数据
							$(li).find(".chk").data("num",num);
							// 确定后重新计算价格
							caculate();
						}
							mui.swipeoutClose(li);
							}
						});

					} else {
						mui.swipeoutClose(li);
					}
				})
			// 初始化数字输入框需要动态初始化
			mui(".mui-numbox").numbox();
			});	
			// 编辑框中小点变化
			$(document).on("tap",".prosize",function(){
				// 注意不行就直接绑定文档元素
				$(this).siblings().removeClass("now");
				$(this).addClass("now");
			});
		// 点击复选框计算价格
		$(document).on("change",".chk",function(){
			caculate();
		})
			// 计算价格
			function caculate(){
				var chks = $(".chk:checked");
				var total = 0;
				for(var i=0;i<chks.length;i++){
					total += chks[i].dataset.num * chks[i].dataset.price;
				}
				$("#cartAmount").text(Math.ceil(total*100)/100);
			}
 $("#OA_task_2").on("tap","#delete",function(){
	 var id = $(this).data("id");
		$.ajax({
			url:"/cart/deleteCart",
			type:"GET",
			 data:{id:[id]},
			 dataType:"json",
			 success:function(result){
				 if(result.success){
					 mui.toast("删除成功")
					 render();
					//  mui.swipeoutClose(li);
				 }
			 }
		})
 })
})