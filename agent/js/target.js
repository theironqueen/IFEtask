var Target = (function(){
	var x,y;//文件坐标
	var targetImage;
	var iconHeight,iconWidth;
	var singleSize;
	var context;
	var showSpeed;
	var showCounter,showCounterNumber,showInitCounter;

	var msg = Config.Target.getTargetInitMessage();
	var flag = 0;//初次初始化
	iconHeight = msg.iconHeight;
	iconWidth = msg.iconWidth;
	showSpeed = msg.showSpeed;
	showCounterNumber = msg.showCounterNumber;
	showInitCounter = msg.showInitCounter;

	function init(targetX, targetY){
		x = targetX;
		y = targetY;
		showCounter = showInitCounter;
		context = Game.getContext();
		singleSize = Config.Game.getSingleSize();
		targetImage = $("#"+msg.imageId)[0];
	}

	function draw(){
		context.save();
		context.drawImage(targetImage,
			showCounter*iconWidth,0,
			iconWidth,iconHeight,
			x*singleSize,y*singleSize,
			singleSize,singleSize);
		context.restore();
	}

	function start(){
		showCounter ++;
		showCounter = showCounter%showCounterNumber;
		setTimeout(start,showSpeed);
	}
	return {
		init:function(targetX,targetY){
			init(targetX,targetY);
			if(flag==0)
				start();
			flag = 1;
		},
		draw:function(){
			draw();
		},
		getTargetPos:function(){
			return {
				"X":x,
				"Y":y
			};
		}

	}
})();