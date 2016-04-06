$(document).ready(function(){
	//生成轨道选择器
	$(".queen-container").queen_select();
	//创建飞船号
	var ship_id = 1;
	
	// 发射新飞船事件绑定
	$("div.control-board").on("click",".ship-add",function(event){
		var orbit_id = $("div.orbit-select-container select").attr("value");
		orbit_id = parseInt(orbit_id);
		Commander.sendMessage({
			"message_type":"create",
			"orbit_id": orbit_id,
			"ship_id": ship_id,
			"energy_type": 0,
			"power_type": 0
		});
		ship_id ++ ;
	});
	//开始于停止事件绑定
	$("div.control-board").on("click",".ship-status",function(event){
		var status = $(this).find("input").is(":checked");
		var commond = status?"move":"stop";
		var id = $(this).attr("title");
		Commander.sendMessage({
			"message_type":"oprate",
			"ship_id": id,
			"commond": commond
		});
		
	});
	//销毁事件绑定
	$("div.control-board").on("click",".ship-destroy",function(event){
		var id = $(this).attr("title");
		Commander.sendMessage({
			"message_type":"destroy",
			"ship_id": id,
			"commond": "destroy"
		});
	});
});