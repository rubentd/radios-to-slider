/* 
 * radiosToSlider v0.1.6
 * jquery plugin to create a slider using a list of radio buttons
 * (c)2014 Rubén Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */

(function($) {

	var LABEL_WIDTH=44;
	var LEVEL_WIDTH=22;
	var LEVEL_MARGIN=50;
	var KNOB_WIDTH=32
	var KNOB_MARGIN=40;

	function RadiosToSlider(element, options){
		this.bearer=element;
		this.options=options;
	}

	RadiosToSlider.prototype = {
		
		activate: function(){
			//Get number options
			this.numOptions=this.bearer.find('input[type=radio]').length;
			this.addBaseStyle();
			this.addLevels();
			this.addBar();
			this.setSlider();
			this.addInteraction();
		},

		addBaseStyle: function(){
			this.bearer.find('input[type=radio]').hide();
			this.bearer.addClass("radios-to-slider");
			this.bearer.addClass(this.options.size);
			this.bearer.css('width', (this.numOptions*LEVEL_WIDTH) + (this.numOptions-1)*LEVEL_MARGIN + 'px');
			var label=0;
			this.bearer.find('label').each(function(){
				var leftPos = KNOB_WIDTH/2 - (LABEL_WIDTH/2) + label*LEVEL_MARGIN + label*LEVEL_WIDTH;
				$(this).addClass('slider-label');
				$(this).css('left', leftPos + 'px');
				label++;
			});
		},

		addLevels: function(){
			var b=this.bearer;
			this.bearer.find('input[type=radio]').each(function(){
				var radioId=$(this).attr('id');
				b.append("<ins class='slider-level' data-radio='" + radioId + "'></ins>");
			});
			var level=0;
			this.bearer.find('.slider-level').each(function(){
				if(level > 0){
					$(this).css('margin-left',  LEVEL_MARGIN + 'px');
				}
				level++;
			})
		},

		addBar: function(){
			this.bearer.append("<ins class='slider-bar'><span class='slider-knob'></span></ins>");
		},

		setSlider: function(){
			var radio=1;
			this.bearer.find('input[type=radio]').each( function(){
				var radioId=$(this).attr('id');
				if($(this).prop('checked')){
					console.log(radio);
					$('.slider-bar').css('display', 'block');
					$('.slider-bar').width( (radio*KNOB_WIDTH) + (radio-1)*KNOB_MARGIN + 'px');
				}
				radio++;
			})
		},

		addInteraction: function(){
			var slider=this;

			$('.slider-level').click( function(){
				var radioId = $(this).attr('data-radio');
				$('#' + radioId).prop('checked', true);
				slider.setSlider();

			});

			this.bearer.find('input[type=radio]').change(function(){
				slider.setSlider();
			});

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
        size: 'medium'
    };

})(jQuery);
