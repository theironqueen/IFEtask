
function Ship(ship_id, orbit_id, energy_type, power_type){
	//飞船编号
	var ship_id = ship_id;
	var orbit_id = orbit_id;

	//飞船能源型号
	var energy_type = energy_type;
	var ship_recovery = Tool.getShipPerformance("recovery", energy_type);
	//飞船动力型号
	var power_type = power_type;
	var ship_cost = Tool.getShipPerformance("cost", power_type);
	var ship_speed = (Tool.getShipPerformance("speed", power_type)*360/(Math.PI*Tool.getOrbitPerformance("diameter", orbit_id))).toFixed(1);
	//飞船状态 0停止 1飞行
	var ship_status = 0;
	//飞船当前能源
	var ship_energy = 100;
	//飞船当前位置
	var ship_pos = 0;
	//飞船的存在标识 0标识不存在 1存在
	var ship_destroy = 1;
	//飞船移动
	var move = function () {
		if(ship_status == 0 && ship_energy > 0){
			ship_status = 1;
			setTimeout(shipMove, 100);
		}
	}
	//飞船停止函数
	var stop = function () {
		ship_status = 0;
	}
	//飞船销毁函数
	var destroy = function () {
		ship_destroy = 0;
		setTimeout(function(){Tool.ship.destroyShip(ship_id);},100);
	}
	//飞船能源系统执行
	setTimeout(energyRecovery, 1000);
	/**
	 * 飞船接收消息 -- 暴露对外的接口
	 * @param  {object} message 消息内容
	 */
	this.receiveMessage = function(message) {
		if(message.ship_id != ship_id)
			return;
		switch(message.commond) {
			case "move":move();break;
			case "stop":stop();break;
			case "destroy":destroy();break;
		}
	}
	//接受指令适配器 将当前指令解码然后接收
	this.receiveMessageAdapter = function(message){
		message = Universe.Adapter.decode(message, "oprate");
		this.receiveMessage(message);
	}
	//判定飞船是否存在
	this.isLive = function() {
		return ship_destroy==1?true:false;
	}
	//飞船移动执行函数
	function shipMove(){
		var deg = (ship_pos + ship_speed/10).toFixed(1);
		deg = deg % 360;
		ship_pos = deg;
		var old_energy = ship_energy;
		ship_energy = ship_energy - ship_cost/10;
		
		if(ship_energy<0){
			ship_energy = 0;
			ship_status = 0;
		}

		Tool.ship.changePos(ship_id, deg);
		
		if (ship_status == 1 && ship_destroy == 1)
			setTimeout(shipMove, 100);
	}

	//飞船能源恢复执行函数
	function energyRecovery(obj){
		var old_energy = parseFloat(ship_energy);
		var new_energy = old_energy + ship_recovery;
		
		ship_energy = new_energy.toFixed(1);
		if(ship_energy>100){
			ship_energy = 100;
		}
		var old_color = energy_judge(old_energy);
		var color = energy_judge(ship_energy);

		Tool.ship.changeEnergy(ship_id, ship_energy);
		if (old_color != color) 
			Tool.ship.changeEnergyColor(ship_id, old_color, color);
		if (ship_destroy == 1)
			setTimeout(energyRecovery, 1000);
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
	return this;
}