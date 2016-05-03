var Agent = (function(){
	var x,y;//agent所在坐标
	var tempX,tempY;
	var agentImage;
	var direction;//朝向 0下 1左 2右 3上
	var imageDirection;//方向对应图片中的位置
	var walkCounter;//行走计数器 
	var walkCounterNumber,walkInitCounter;//行走图个数，初始图位置
	var singleSize;
	var iconHeight,iconWidth;
	var context;
	var walkFlag;//行走标记，表示正在行走
	var walkSpeed;//行走速度

	var msg = Config.Agent.getAgentInitMessage();
	iconHeight = msg.iconHeight;
	iconWidth = msg.iconWidth;
	walkSpeed = msg.walkSpeed;
	walkInitCounter = msg.walkInitCounter;
	walkCounterNumber = msg.walkCounterNumber;
	//方向与图片对应信息
	imageDirection = new Array();
	directionHelp = msg.imageDirection;
	directionHelp = directionHelp.split(",");
	for(var i=0;i<4;i++){
		imageDirection[i] = Number(directionHelp[i]);
	}

	function init(agentX,agentY){//初始化信息 需要其他信息初始化完成后才能进行初始化的信息
		x = agentX;
		y = agentY;
		tempX = agentX;
		tempY = agentY;
		direction = 0;
		walkCounter = walkInitCounter;
		walkFlag = false;
		context = Game.getContext();
		singleSize = Config.Game.getSingleSize();
		agentImage = $("#"+msg.imageId)[0];
	}
	//特工绘制，根据当前方向，行走计数，临时位置，来绘制特工
	function draw(){
		context.save();
		context.drawImage(agentImage,
			walkCounter*iconWidth,imageDirection[direction]*iconHeight,
			iconWidth,iconHeight,
			tempX*singleSize,tempY*singleSize,
			singleSize,singleSize);
		context.restore();
	}
	function move(){
		switch(direction){
			case 0:
				tempY += 0.33;
				break;
			case 1:
				tempX -= 0.33;
				break;
			case 2:
				tempX += 0.33;
				break;
			case 3:
				tempY -= 0.33;
				break;
		}
		tempX = Number(tempX.toFixed(2));
		tempY = Number(tempY.toFixed(2));
		walkCounter ++;
		walkCounter = walkCounter%walkCounterNumber;
		if (walkCounter == walkInitCounter){
			stop();
		}else {
			setTimeout(move,walkSpeed);
		}
	}
	function stop(){
		switch(direction){
			case 0:
				tempY += 0.01;
				break;
			case 1:
				tempX -= 0.01;
				break;
			case 2:
				tempX += 0.01;
				break;
			case 3:
				tempY -= 0.01;
				break;
		}
		tempX = Number(tempX.toFixed(2));
		tempY = Number(tempY.toFixed(2));
		walkFlag = false;
	}
	return {
		init:function(agentX,agentY){
			init(agentX, agentY);
		},
		//每次横竖移动1格
		moveTo:function(moveX,moveY){
			var subX = moveX - x;
			var subY = moveY - y;
			if (subX==1){
				//向右移动
				direction = 2;
				x++;
			} else if (subX==-1) {
				//向左移动
				direction = 1;
				x--;
			} else if (subY == 1) {
				//向下移动
				direction = 0;
				y++;
			} else if (subY == -1) {
				//向上移动
				direction = 3;
				y--;
			}else {
				console.log("移动长度不为1格");
				return;
			}
			walkCounter = 1;
			walkFlag = true;
			setTimeout(move,walkSpeed);
		},
		draw:function(){
			draw();
		},
		isWalk:function(){
			return walkFlag;
		},
		getAgentPos:function(){
			return {
				"X":x,
				"Y":y
			};
		}
	};
})();