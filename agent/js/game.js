var Game = (function(){
	var level,score;//等级，成绩
	var context;
	//房间矩阵 1为墙 0为通路
	var  gameMatrix;
	function init(ctx){
		context = ctx;
		level = 1;
		score = 0;
		//创建房间矩阵
		initMatrix();
	}
	/**
	 * 创建房间矩阵
	 */
	function initMatrix(){
		if(typeof(gameMatrix)=="undefined")	
			gameMatrix = new Array();
		for(var i=0;i<Config.Game.getGameHeight();i++){
			if(typeof(gameMatrix[i])=="undefined")
				gameMatrix[i] = new Array();
			for (var j=0;j<Config.Game.getGameWidth();j++) {
				gameMatrix[i][j] = 0;
			}
		}
	}
	return {
		init:function(ctx){
			init(ctx);
		},
		getLevel:function(){
			return level;
		},
		getScore:function(){
			return score;
		},
		/**
		 * 下一关，游戏信息操作，墙清空
		 * @param  {[type]} moreScore [description]
		 * @return {[type]}           [description]
		 */
		nextLevel:function(moreScore){
			level ++;
			score += moreScore;
			initMatrix();
		},
		getContext:function(){
			return context;
		},
		getGameMatrix:function(){
			return Tool.TwoArrayCopy(gameMatrix);
		},
		setGameMatrix:function(matrix){
			gameMatrix = Tool.TwoArrayCopy(matrix);
		}
	};
})();