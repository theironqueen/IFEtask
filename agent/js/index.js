$(window).load(function(){
	var gameHeight,gameWidth;
	var canvasHeight,canvasWidth;
	var offsetLeft,offsetTop;
	var singleSize;
	var context;
	var wall = new WallControl();
	var moveQueen;//移动队列
	var gameMatrix;
	var grid;
	var finder; 
	var path;
	var singleGameFlag;

	init();
	GameStart();
	function init(){
		Config.init();
		gameHeight = Config.Game.getGameHeight();
		gameWidth = Config.Game.getGameWidth();
		singleSize = Config.Game.getSingleSize();
		canvasWidth = gameWidth*singleSize;
		canvasHeight = gameHeight*singleSize;
		moveQueen = new Array();
		//设置样式
		$("#agent-main").css({
			"height": gameHeight+'rem',
			"width": gameWidth+'rem'
		});
		console.log();
		$("#game-main").attr({
			"height": canvasHeight+"",
			"width": canvasWidth+""
		});
		$("#agent-header div.message").css("width",Config.Game.getGameWidth()+'rem');
		//获取canvas 的context
		var $canvas = $("#game-main");
		offsetLeft = $canvas.offset().left;
		offsetTop = $canvas.offset().top;
		context = $canvas[0].getContext("2d");
		Game.init(context);
	}
	function GameStart(){
		singleGameFlag = true;//游戏进行
		//初始化特工和目标位置
		var agentX,agentY,targetX,targetY;
		agentX = Tool.Random(0,gameWidth);
		agentY = Tool.Random(0,gameHeight);
		targetX = Tool.Random(0,gameWidth);
		targetY = Tool.Random(0,gameHeight);

		while(Math.abs(agentX-targetX)<=6
			&&Math.abs(agentY-targetY)<=6){
			targetX = Tool.Random(0,gameWidth);
			targetY = Tool.Random(0,gameHeight);
		}

		console.log("agent:"+agentX+","+agentY);
		console.log("target:"+targetX+","+targetY);
		Agent.init(agentX,agentY);
		Target.init(targetX,targetY);
		//初始化墙
		wall.init();
		wall.createWall(Game.getLevel(),agentX,agentY,targetX,targetY);
		$("#game-main").bind("touchend",canvasTouch);
		gameMatrix = Game.getGameMatrix();
		finder = new PF.AStarFinder();
		path = new Array();

		requestAnimationFrame(moveTest);
	}
	function canvasTouch(e){
		var _touch = e.originalEvent.changedTouches[0];
		var x = _touch.pageX;
		var y = _touch.pageY;
		var touchPos = Tool.getTouchPos(offsetLeft,offsetTop,x,y,singleSize);
		console.log(touchPos);
		x = touchPos.posX;
		y = touchPos.posY;
		//判定当前特工坐标
		var agentPos = {};
		if(moveQueen.length==0){
			agentPos = Agent.getAgentPos();
		}else {
			var tempArray = moveQueen[moveQueen.length-1];
			agentPos.X = tempArray[0];
			agentPos.Y = tempArray[1];
		}
		//点到自身无效
		if(x==agentPos.X&&y==agentPos.Y){
			console.log("点到自身");
			return;
		}
		//点到墙无效
		if(gameMatrix[x][y]==1){
			console.log("点到墙");
			return;
		}
		//点到无法移动的地方无效
		grid = new PF.Grid(gameMatrix);
		path = finder.findPath(agentPos.X,agentPos.Y,x,y,grid);
		console.log(path);
		if(path.length==0){
			console.log("无法移动");
			return;
		}
		//加入移动队列
		moveQueen = moveQueen.concat(path);
		console.log(JSON.stringify(moveQueen));
		
	}
	
	function moveTest(){
		context.clearRect(0,0,canvasWidth,canvasHeight);
		Agent.draw();
		Target.draw();
		wall.draw();
		if(moveQueen.length!=0&&!Agent.isWalk()){
			var movePos = moveQueen.shift();
			Agent.moveTo(movePos[0],movePos[1]);
		}
		//判断游戏是否结束
		if(Tool.judgePosEqual(Agent.getAgentPos(),Target.getTargetPos())){
			//游戏结束
			$("#game-main").unbind("touchend",canvasTouch);
			moveQueen = new Array();
			if(!Agent.isWalk()){
				singleGameFlag = false;
			}
		}
		if(singleGameFlag)
			requestAnimationFrame(moveTest);
		else {
			GameNext();
			GameStart();
		}
	}
	
	function GameNext(){
		Game.nextLevel(Game.getLevel()*10);
		//显示关卡，成绩
		$("#level").html(Game.getLevel());
		$("#score").html(Game.getScore());
	}
	// var k = 1;
	// function hehe(){
	// 	if(!Agent.isWalk()){
	// 		k++;
	// 		if(k<8){
	// 			Agent.moveTo(1,k);
	// 			setTimeout(hehe,100);
	// 		}
	// 	}else {
	// 		setTimeout(hehe,100);
	// 	}
		
	// }

	// hehe();
	
});