
var DC = (function(){

	var monitors = [];
	//监控信息创建
	function createMonitor(ship_id, power_type, energy_type){
		var obj = {};
		obj.ship_id = ship_id;
		obj.ship_status = 0;
		obj.ship_fuel = 100;
		obj.power_type = power_type;
		obj.energy_type = energy_type;
		Tool.monitor.createMonitor(ship_id, power_type, energy_type);
		monitors[ship_id] = obj;
	}
	//监控信息修改
	function changeMonitor(ship_id, ship_status, ship_fuel){
		var old_color = energy_judge(monitors[ship_id].ship_fuel);
		var color = energy_judge(ship_fuel);
		var old_status = monitors[ship_id].ship_status;
		monitors[ship_id].ship_status = ship_status;
		monitors[ship_id].ship_fuel = ship_fuel;
		Tool.monitor.changeMonitor(ship_id, ship_status, ship_fuel);
		if (old_color != color) 
			Tool.monitor.changeMonitorColor(ship_id, old_color, color);
		if(old_status!=ship_status && ship_status == 0)
			Tool.control.changeControl(ship_id);
	}
	//判定剩余量
	function energy_judge(energy){
		var color = "";
		if (energy >= 60) {
			color = "success";
		} else if (energy >= 20 && energy < 60) {
			color = "warning";
		} else {
			color = "danger";
		}
		return color;
	}
	//监控信息销毁
	function destroyMonitor(ship_id){
		monitors[ship_id] = null;
		Tool.monitor.destroyMonitor(ship_id);
	}

	return {
		receive:{
			/**
			 * 飞船发过来的广播消息
			 * @param  {string} message 编码后的广播内容
			 */
			broadcastMessage: function(message) {
				//信息解码
				message = Universe.Adapter.decode(message, "broadcast");

				switch (message.ship_status) {
					case "move":
						changeMonitor(message.ship_id, 1, message.ship_fuel);
						break;
					case "stop":
						changeMonitor(message.ship_id, 0, message.ship_fuel);
						break;
					case "destroy":
						destroyMonitor(message.ship_id);
						break;
				}
			},
			/**
			 * 指挥官发送的创建信息
			 * @param  {object} message 创建内容信息
			 */
			createMessage: function(message) {
				createMonitor(message.ship_id, message.power_type, message.energy_type);
			}
		}
	};
})();