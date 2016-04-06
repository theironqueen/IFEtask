/**
 * 下拉选择框插件
 * @author youwandetuzi
 * select.queen-select需要由div.queen-container包裹
 * 内部每一项大小与div的大小相同
 * @param  {object} options 默认参数有
 * title_bg_color
 * font_size
 */
(function($){
	$.fn.extend({
		"queen_select": function(options){
			//参数覆盖
			var opts = $.extend({}, defaults, options);
			//内容创建
			create_content(this, opts);
			//事件绑定
			/**
			 * select 显示和隐藏切换
			 */
			$(".queen-select-title").unbind("click").bind("click",function(){
				var $this = $(this);
				$list = $this.parent().find(".queen-select-list");
				$icon = $this.find('i.queen-triangle');
				if($list.hasClass('queen-hide')){
					$list.removeClass('queen-hide');
					$icon.addClass('queen-triangle-up');
				} else {
					$list.addClass('queen-hide');
					$icon.removeClass('queen-triangle-up');
				}
			});
			/**
			 * select内容选择
			 */
			$(".queen-container").on('click', '.queen-select-item', function(event) {
				var text = $(this).html();
				var value = $(this).attr("title");
				$(".queen-select-title").click().find("h2").html(text);
				$(".queen-select").attr("value",value);
				$(this).parent().find(".queen-select-item").removeClass("active");
				$(this).addClass("active");
			});
			return this;
		}
	});
	var defaults = {
		"title_bg_color":'#3EAA9D',
		"font_size": '14px',
		"list_bg_color": '#3EAA9D'
	};
	/**
	 * 根据select创建一个下拉列表
	 * @param  {jquery object} $container 使用插件的jquery对象
	 * @param  {object} options    配置参数
	 */
	function create_content($container, options){

		var $select = $container.find('select.queen-select');
		var $options = $select.find('option');
		var select_values = [];
		$options.each(function(index, el) {
			select_values[$(this).attr("value")] 
				= $(this).html();
		});
		create_title($container, $options.eq(0).html(), options["title_bg_color"], options["font_size"]);
		create_list($container, select_values);
	}
	/**
	 * 创建下拉列表的头部
	 * @param  {string} title      列表头内容
	 * @param  {string} color      列表头背景颜色
	 * @param  {string} size       字体大小
	 */
	function create_title($container, title, color, size){
		var html =	"<div class='queen-select-title'>"
					+ 	"<h2>"+title+"</h2>"
					+ 	"<i class='queen-triangle'></i>"
					+"</div>";
		var $title = $(html);
		$container.append($title);
		$title.css({
			"background-color": color,
			"font-size": size
		});
	}
	/**
	 * 下拉列表的主体
	 * @param  {array} items      select中的所有option的value和内容
	 */
	function create_list($container, items){
		var $list = $("<ul class='queen-select-list queen-hide'></ul>");
		$container.append($list);
		for (var key in items) {
			$list = create_item($list, key, items[key]);
		} 
		$list.find('li.queen-select-item').eq(0).addClass('active');
	}
	function create_item($list, value, text){
		var $item = $("<li class='queen-select-item'></li>");
		$list.append($item);
		$item.attr("title", value).html(text);
		return $list;
	}
})(window.jQuery);