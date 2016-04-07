var Commander = (function(){
	//局部内容
	//4艘飞船 索引1-4代表轨道号，0不使用
	var ships = [null, null, null, null, null];
	//创建飞船信息
	function createMessage(orbit_id, ship_id, energy_type, power_type){
		//创建一个命令列表
		if(ships[orbit_id] != null){
			Tool.Log("danger", Tool.getTime()+": "+" 在第"+orbit_id+"轨道创建"+ship_id+"号飞船失败 该轨道上已经存在飞船!");
			return;
		}
		ships[orbit_id] = ship_id;
		var title = "第"+orbit_id+"轨道-"+ship_id+"号飞船-"+POWER_NAME[power_type]+"-"+ENERGY_NAME[energy_type];
		//指挥官面板item创建
		Tool.control.createControl(title, ship_id);
		//发送创建信息
		var msg = {
			"orbit_id": orbit_id,
			"ship_id": ship_id,
			"energy_type": energy_type,
			"power_type": power_type
		};
		msg = Universe.Adapter.encode(msg, "create");
		Tool.logAdapter("info", "create", msg);
		Universe.Media.receive.createMessage(msg);
	}
	//向飞船发送一般信息
	function oprateMessage(ship_id, commond){
		var msg = {
			"ship_id": ship_id,
			"commond": commond
		};
		msg = Universe.Adapter.encode(msg, "oprate");
		Tool.logAdapter("info", "oprate", msg);
		Universe.Media.receive.oprateMessage(msg);
	}
	//向飞船发送销毁信息
	function destroyMessage(ship_id){
		for (var i=1;i<=4;i++) 
			if(ships[i] == ship_id)
				ships[i] = null;
		Tool.control.destroyControl(ship_id);
		var msg = {
			"ship_id": ship_id,
			"commond": "destroy"
		};
		msg = Universe.Adapter.encode(msg, "oprate");
		Tool.logAdapter("info", "oprate", msg);
		Universe.Media.receive.oprateMessage(msg);
	}
	//对外接口
	return {
		/**
		 * 指挥官信息发送系统 根据信息类型不同 发送不同的信息
		 * @param  {object} message 发送信息内容
		 */
		sendMessage: function(message){
			switch (message.message_type) {
				case "create":
					createMessage(message.orbit_id, message.ship_id, message.energy_type, message.power_type);
					break;
				case "oprate": 
					oprateMessage(message.ship_id, message.commond);
					break;
				case "destroy": 
					destroyMessage(message.ship_id);
					break;
				default: 
					console.log("发送指令类型错误");
			}
		}
	};
})();