//虚拟宇宙单例类

var Universe = (function(){
	//局部内容
	//4艘飞船 索引1-4代表轨道号，0不使用
	var ships = [null, null, null, null, null]; 
	/**
	 * 根据message内容创建飞船
	 * @param  {object} message message包含 ship_id obrit_id energy_type, power_type
	 */
	function createShip(message){
		//界面上创建飞船
		Tool.ship.createShip(message.ship_id, message.orbit_id);
		//创建飞船对象
		var ship = new Ship(message.ship_id, message.energy_type, message.power_type);
		ships[message.orbit_id] = ship;
	}
	function sendMessage(message){
		for(var i=1; i<=4; i++){
			if(ships[i]!=null && ships[i].isLive()){
				ships[i].receiveMessage(message);
			}
		}
	}
	//使用mediator介质传播信息
	var Mediator = {
			receive: {
				/**
				 * 获取创建一艘新飞船信息
				 * @param  {json} message [description]
				 * @return {[type]}         [description]
				 */
				createMessage: function(message){
					//1s后接收到消息
					setTimeout(function(){
						//丢包模拟
						if(Math.random() <= 0.3){
							Tool.logAdapter("danger","create",message,0);
							return;
						}
						//没有丢包
						Tool.logAdapter("success","create",message,1);
						createShip(message);
					},1000);
				},
				/**
				 * 通过介质接收指令 移动 停止 删除等
				 * @param  {json} message 发送的指令
				 */
				oprateMessage: function(message){
					//1s后接收到消息
					setTimeout(function(){
						//丢包模拟
						if(Math.random() <= 0.3){
							Tool.logAdapter("danger","oprate",message,0);
							return;
						}
						Tool.logAdapter("success","oprate",message,1);
						sendMessage(message);
					},1000);
				}

			}
	}

	//对外接口
	return {
		/**
		 * 介质使用此进行传输
		 * 提供一个总对外的方法，内部实现方法的更改不会造成外部代码的更改
		 */
		Media:{
			receive:{
				createMessage: function(message){
					Mediator.receive.createMessage(message);
				},
				oprateMessage: function(message){
					Mediator.receive.oprateMessage(message);
				}
			}
		}
	};
})();