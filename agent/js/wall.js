function Wall(x,y,w,h){
	var width = w;
	var height = h;
	var posX = x;//左上角坐标
	var posY = y;//左上角坐标
	var singleSize = Config.Game.getSingleSize();

	this.getWidth = function(){
		return width;
	}
	this.getHeight = function(){
		return height;
	}
	this.getX = function(){
		return posX;
	}
	this.getY = function(){
		return posY;
	}
	//墙的绘制
	this.draw = function(image,context){
		context.save();
		for (var i=0;i<height;i++) {
			for (var j=0;j<width;j++) {
				context.drawImage(image,(posX+j)*singleSize,(posY+i)*singleSize,singleSize,singleSize);
			}
		}
		//context.drawImage(image,100,100,16,16);
		context.restore();

	}
	this.toString = function () {
		return "x:"+posX+" y:"+posY+" w:"+width+" h:"+height;
	}
	return this;
}