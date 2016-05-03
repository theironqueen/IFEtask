var Tool = {
	Random:function(min,max){//[min,max)间随机整数
		var random = Math.random() * (max-min)+min;
		return Math.floor(random);
	},
	TwoArrayCopy:function(array){
		var result = [],length=array.length,i=0;
		for (;i<length;i++) {
			result[i] = array[i].concat();
		}
		return result;
	},
	getTouchPos:function(left,top,x,y,singleSize){
		var posX = Math.floor(Math.round(x-left)/singleSize);
		var posY = Math.floor(Math.round(y-top)/singleSize);
		var msg = {};
		msg.posX = posX;
		msg.posY = posY;
		return msg;
	},
	judgePosEqual:function(pos1,pos2){
		if(pos1.X==pos2.X&&pos1.Y==pos2.Y){
			return true;
		}else {
			return false;
		}
	}

};