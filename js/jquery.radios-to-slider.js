/* 
 * radiosToSlider v0.1.6
 * jquery plugin to create a slider using a list of radio buttons
 * (c)2014 Rubén Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */

(function($) {

	function RadiosToSlider(element, options){
		
	}

	RadiosToSlider.prototype = {
		
		activate: function(){
			
		}

	}

	$.fn.radiosToSlider = function(options) {
		this.each(function(){
			options = $.extend({}, $.fn.radiosToSlider.defaults, options);

			var slider = new RadiosToSlider($(this), options);
			slider.activate();
		});	
	}

	$.fn.radiosToSlider.defaults = {
        
    };

})(jQuery);
