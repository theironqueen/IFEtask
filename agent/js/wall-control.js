var WallControl = function(){
	var wallNumber;//墙的数量
	var wallArray;//墙对象
	var gameWidth,gameHeight;
	var context;
	var gameMatrix;
	var wallImage;
	function init(){
		context = Game.getContext();
		gameHeight = Config.Game.getGameHeight();
		gameWidth = Config.Game.getGameWidth();
		wallImage = $("#"+Config.Wall.getWallImageId())[0];
	}

	function createWall(number,agentX,agentY,targetX,targetY){
		wallNumber = number;
		wallArray = new Array();
		gameMatrix = Game.getGameMatrix();
		for(var num=0;num<wallNumber;num++){
			var wallMsg = createSingleWall(agentX,agentY,targetX,targetY);
			for (var i=0;i<wallMsg.h;i++) 
				for (var j=0;j<wallMsg.w;j++)
					gameMatrix[i+wallMsg.y][j+wallMsg.x] = 1;
			var wall = new Wall(wallMsg.x,wallMsg.y,wallMsg.w,wallMsg.h);
			console.log(num);
			wallArray.push(wall);
			console.log("wall:"+wall.toString());
		}
		Game.setGameMatrix(gameMatrix);
	}
	function createSingleWall(agentX,agentY,targetX,targetY){
		var wallX,wallY,wallHeight,wallWidth;
		var flag = false;
		while(!flag){
			//计算墙坐标
			wallX = Tool.Random(0,gameWidth);
			wallY = Tool.Random(0,gameHeight)
			wallWidth = Tool.Random(1,gameWidth-wallX)
			wallHeight = Tool.Random(1,gameHeight-wallY);
			if((wallX==agentX&&wallY==agentY)||(wallX==targetX&&wallY==targetY)){
				continue;
			}
			if (agentX>=wallX&&agentY>=wallY) {
				if((agentX-wallX<wallWidth)&&(agentY-wallY<wallHeight)){
					continue;
				}
			}
			if (targetX>=wallX&&targetY>=wallY) {
				if((targetX-wallX<wallWidth)&&(targetY-wallY<wallHeight)){
					continue;
				}
			}
			if(!judgeWallPass(wallX,wallY,wallWidth,wallHeight,agentX,agentY,targetX,targetY)){
				continue;
			}
			flag = true;
		}
		var msg = {};
		msg.x = wallX;
		msg.y = wallY;
		msg.h = wallHeight;
		msg.w = wallWidth;
		// console.log(JSON.stringify(msg));
		return msg;
	}

	function judgeWallPass(x,y,w,h,ax,ay,tx,ty){
		var tempMatrix = Tool.TwoArrayCopy(gameMatrix);
		console.log("temp:"+JSON.stringify(tempMatrix));
		console.log("game:"+JSON.stringify(gameMatrix));
		console.log(x+" "+y+" "+w+" "+h+" "+ax+" "+ay+" "+tx+" "+ty);
		for (var i=0;i<h;i++) 
			for (var j=0;j<w;j++)
				tempMatrix[i+y][j+x] = 1;

		var grid = new PF.Grid(tempMatrix);
		var finder = new PF.AStarFinder();
		var path = finder.findPath(ax,ay,tx,ty,grid);
		console.log("length:"+path.length);
		console.log(path.length==0?false:true);
		return path.length==0?false:true;

	}

	function draw(){
		for (var i=0;i<wallArray.length;i++) {
			wallArray[i].draw(wallImage,context);
		}
	}
	// return this;
	return {
		init:function(){
			init();
		},
		createWall:function (number,agentX,agentY,targetX,targetY) {
			createWall(number,agentX,agentY,targetX,targetY);
		},
		draw:function(){
			draw();
		}

	} ;
}