var Config = (function(){
	var gameWidth,gameHeight;//每32px算1个
	var singleSize = 32;//大小，每32px算1个单位
	var headerHeight = 3;//头部高度
	//墙
	var wallImageId;//图片id
	wallImageId = "wall-image";
	//特工
	var agentImageId;
	var agentIconHeight,agentIconWidth;
	var agentWalkSpeed; // 单位ms
	var agentWalkInitCounter,agentWalkCounterNumber;//特工行走计数
	var agentImageDirection;//特工图片方向与行走方向对应

	agentImageId = "agent-image";
	agentIconHeight = 32;
	agentIconWidth =30;
	agentWalkSpeed = 100;
	agentWalkCounterNumber = 3;
	agentWalkInitCounter = 1;
	agentImageDirection = "0,1,2,3";

	//目标
	var targetImageId;
	var targetIconHeight,targetIconWidth;
	var targetInitCounter,targetCounterNumber;
	var targetShowSpeed;
	
	targetImageId = "target-image";
	targetIconHeight =64;
	targetIconWidth = 64;
	targetShowSpeed = 50;
	targetInitCounter = 0;
	targetCounterNumber = 30;

	function init(){
		var deviceHeight = $(window).height();
		var deviceWidth = $(window).width();
		gameHeight = Math.floor(deviceHeight/singleSize)-headerHeight-1;
		gameWidth = Math.floor(deviceWidth/singleSize)-2;
	}
	return {
		init:function(){
			init();
			(function() {
			    var lastTime = 0;
			    var vendors = ['ms', 'moz', 'webkit', 'o'];
			    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
			    }
			    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
			        var currTime = new Date().getTime();
			        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			        var id = window.setTimeout(function() {
			            callback(currTime + timeToCall);
			        }, timeToCall);
			        lastTime = currTime + timeToCall;
			        return id;
			    };
			    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
			        clearTimeout(id);
			    };
			}());
		},
		Game:{
			getGameWidth:function(){
				return gameWidth;
			},
			getGameHeight:function(){
				return gameHeight;
			},
			getSingleSize:function(){
				return singleSize;
			}
		},
		Wall:{
			getWallImageId:function(){
				return wallImageId;
			}
		},
		Agent:{
			getAgentInitMessage:function(){
				return {
					"imageId":agentImageId,
					"iconHeight":agentIconHeight,
					"iconWidth":agentIconWidth,
					"walkSpeed":agentWalkSpeed,
					"walkInitCounter":agentWalkInitCounter,
					"walkCounterNumber":agentWalkCounterNumber,
					"imageDirection":agentImageDirection
				};
			}
		},
		Target:{
			getTargetInitMessage:function(){
				return {
					"imageId":targetImageId,
					"iconHeight":targetIconHeight,
					"iconWidth":targetIconWidth,
					"showSpeed":targetShowSpeed,
					"showCounterNumber":targetCounterNumber,
					"showInitCounter":targetInitCounter
				};
			}
		}
	};
})();