/* 
 * radiosToSlider v0.2.0
 * jquery plugin to create a slider using a list of radio buttons
 * (c)2014 Rubén Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */

(function($) {


	var KNOB_WIDTH=32;
	var KNOB_MARGIN=28;
	var LEVEL_MARGIN=KNOB_MARGIN+10;
	var LABEL_WIDTH=44;
	var LEVEL_WIDTH=22;

	function RadiosToSlider(element, options){
		this.bearer=element;
		this.options=options;
		this.currentLevel=0; //this means no level selected
	}

	RadiosToSlider.prototype = {
		
		activate: function(){
			// Get number options
			this.numOptions=this.bearer.find('input[type=radio]').length;
			this.fitContainer();
			this.addBaseStyle();
			this.addLevels();
			this.addBar();
			this.setSlider();
			this.addInteraction();
		},

		fitContainer: function() {
			// If fitContainer, calculate KNOB_MARGIN based on container width
			if ( this.options.fitContainer ) {
				KNOB_MARGIN = (this.bearer.width()-KNOB_WIDTH) / (this.numOptions-1) - KNOB_WIDTH;
				LEVEL_MARGIN=KNOB_MARGIN+10;
			}
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

		//Add level indicators to DOM
		addLevels: function(){
			var b=this.bearer;
			this.bearer.find('input[type=radio]').each(function(){
				var radioId=$(this).attr('id');
				b.append("<ins class='slider-level' data-radio='" + radioId + "'></ins>");
			});
			var level=0;
			this.bearer.find('.slider-level').each(function(){
				var paddingLeft = parseInt(b.css('padding-left').replace('px', ''));
				$(this).css('left', paddingLeft + (level*LEVEL_MARGIN) + (level*LEVEL_WIDTH) + 'px');
				level++;
			})
		},

		//Add slider bar to DOM
		addBar: function(){
			this.bearer.append("<ins class='slider-bar'><span class='slider-knob'></span></ins>");
		},

		//set width of slider bar and current level
		setSlider: function(){
			var radio=1;
			var slider=this;
			this.bearer.find('input[type=radio]').each( function(){
				var radioId=$(this).attr('id');
				if($(this).prop('checked')){
					slider.bearer.find('.slider-bar').css('display', 'block');
					slider.bearer.find('.slider-bar').width( (radio*KNOB_WIDTH) + (radio-1)*KNOB_MARGIN + 'px');
					slider.currentLevel=radio;
				}
				if(slider.options.animation){
					slider.bearer.find('.slider-bar').addClass('transition-enabled');
				}
				radio++;
			});
			//Set style for lower levels
			var label=0;
			this.bearer.find('.slider-level').each(function(){
				label++;
				if(label < slider.currentLevel){
					$(this).show();
					$(this).addClass('slider-lower-level');
				}else if(label == slider.currentLevel){
					$(this).hide();
				}else{
					$(this).show();
					$(this).removeClass('slider-lower-level');
				}
			});
			//Add bold style for selected label
			var label=0;
			this.bearer.find('.slider-label').each(function(){
				label++;
				if(label == slider.currentLevel){
					$(this).addClass('slider-label-active');
				}else{
					$(this).removeClass('slider-label-active');
				}
			});
		},

		addInteraction: function(){
			var slider=this;

			this.bearer.find('.slider-level').click( function(){
				var radioId = $(this).attr('data-radio');
				slider.bearer.find('#' + radioId).prop('checked', true);
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
        size: 'medium',
        animation: true,
        fitContainer: true
    };

})(jQuery);
