/**
 * radiosToSlider v0.3.1
 * jquery plugin to create a slider using a list of radio buttons
 * (c)2014 Rubén Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */

(function($) {
    function RadiosToSlider(element, options) {
        this.KNOB_WIDTH = 32;
        this.KNOB_MARGIN = 28;
        this.LEVEL_MARGIN = this.KNOB_MARGIN + 10;
        this.LABEL_WIDTH = 44;
        this.LEVEL_WIDTH = 22;
        this.bearer = element;
        this.options = options;
        this.currentLevel = 0; //this means no level selected
    }

    RadiosToSlider.prototype = {

        activate: function() {
            // Get number options
            this.numOptions = this.bearer.find('input[type=radio]').length;
            this.reset(); // helps prevent duplication
            this.fitContainer();
            this.addBaseStyle();
            this.addLevels();
            this.addBar();
            this.setSlider();
            this.addInteraction();
            this.setDisabled();

            var slider = this;

            $(window).on('resize orientationChanged', function() {
                slider.reset();
                slider.fitContainer();
                slider.addBaseStyle();
                slider.addLevels();
                slider.setSlider();
                slider.addInteraction();
                slider.setDisabled();
            });
        },

        reset: function() {
            this.bearer.find('label').each(function() {
                $(this).removeClass('slider-label');
                $(this).css('left', 0);
            });
            this.bearer.find('.slider-level').each(function() {
                $(this).remove();
            });
            this.bearer.css('width', 'auto');
        },

        fitContainer: function() {
            // If fitContainer, calculate KNOB_MARGIN based on container width
            if (this.options.fitContainer) {
                this.KNOB_MARGIN = (this.bearer.width() - this.KNOB_WIDTH) / (this.numOptions - 1) - this.KNOB_WIDTH;
                this.LEVEL_MARGIN = this.KNOB_MARGIN + 10;
            }
        },

        addBaseStyle: function() {
            this.bearer.find('input[type=radio]').hide();
            this.bearer.addClass("radios-to-slider");
            this.bearer.addClass(this.options.size);
            this.bearer.css('width', (this.numOptions * this.LEVEL_WIDTH) + (this.numOptions - 1) * this.LEVEL_MARGIN + 'px');
            var label = 0;
            var slider = this;
            this.bearer.find('label').each(function() {
                var leftPos = slider.KNOB_WIDTH / 2 - (slider.LABEL_WIDTH / 2) + label * slider.LEVEL_MARGIN + label * slider.LEVEL_WIDTH;
                $(this).addClass('slider-label');
                $(this).css('left', leftPos + 'px');
                label++;
            });
        },

        //Add level indicators to DOM
        addLevels: function() {
            var b = this.bearer;
            var slider = this;
            this.bearer.find('input[type=radio]').each(function() {
                var radioId = $(this).attr('id');
                b.append("<ins class='slider-level' data-radio='" + radioId + "'></ins>");
            });
            var level = 0;
            this.bearer.find('.slider-level').each(function() {
                var paddingLeft = parseInt(b.css('padding-left').replace('px', ''));
                $(this).css('left', paddingLeft + (level * slider.LEVEL_MARGIN) + (level * slider.LEVEL_WIDTH) + 'px');
                level++;
            })
        },

        //Add slider bar to DOM
        addBar: function() {
            this.bearer.append("<ins class='slider-bar'><span class='slider-knob'></span></ins>");
        },

        //set width of slider bar and current level
        setSlider: function() {
            var radio = 1;
            var slider = this;
            var label;
            this.bearer.find('input[type=radio]').each(function() {
                var radioId = $(this).attr('id');
                if ($(this).prop('checked')) {
                    slider.bearer.find('.slider-bar').css('display', 'block');
                    slider.bearer.find('.slider-bar').width((radio * slider.KNOB_WIDTH) + (radio - 1) * slider.KNOB_MARGIN + 'px');
                    slider.currentLevel = radio;
                }
                if (slider.options.animation) {
                    slider.bearer.find('.slider-bar').addClass('transition-enabled');
                }
                radio++;
            });
            //Set style for lower levels
            label = 0;
            this.bearer.find('.slider-level').each(function() {
                label++;
                if (label < slider.currentLevel) {
                    $(this).show();
                    $(this).addClass('slider-lower-level');
                } else if (label == slider.currentLevel) {
                    $(this).hide();
                } else {
                    $(this).show();
                    $(this).removeClass('slider-lower-level');
                }
            });
            //Add bold style for selected label
            label = 0;
            this.bearer.find('.slider-label').each(function() {
                label++;
                if (label == slider.currentLevel) {
                    $(this).addClass('slider-label-active');
                } else {
                    $(this).removeClass('slider-label-active');
                }
            });
        },

        addInteraction: function() {
            var slider = this,
                $levels = this.bearer.find('.slider-level:not(.disabled)'),
                $inputs = this.bearer.find('input[type=radio]:not(:disabled)');

            $levels.on('click', function() {
                var radioId = $(this).attr('data-radio'),
                    radioElement = slider.bearer.find('#' + radioId);

                radioElement.prop('checked', true);

                if (slider.options.onSelect) {
                    slider.options.onSelect(radioElement, [
                        $levels,
                        $inputs
                    ]);
                }

                slider.setSlider();

            });

            $inputs.on('change', function() {
                slider.setSlider();
            });

        },

        setDisabled: function(isDisable, cb) {
            if (!this.options.isDisable) return;

            this.setDisable();
        },

        setDisable: function(cb) {
            this.options.isDisable = true;

            var slider = this,
                $levels = this.bearer.find('.slider-level'),
                $inputs = this.bearer.find('input[type=radio]');

            $.merge($levels, $inputs).each(function() {
                $(this).prop('disabled', true).addClass('disabled');
                $(this).off('click change');
            });

            if (typeof cb === "function") {
                cb($levels, $inputs);
            }
        },

        setEnable: function(cb) {
            this.options.isDisable = false;

            var slider = this,
                $levels = this.bearer.find('.slider-level'),
                $inputs = this.bearer.find('input[type=radio]');

            $.merge($levels, $inputs).each(function() {
                $(this).prop('disabled', false).removeClass('disabled');
                slider.addInteraction();
            });

            if (typeof cb === "function") {
                cb($levels, $inputs);
            }
        }

    };

    $.fn.radiosToSlider = function(options) {
        var rtn = [];

        this.each(function() {
            options = $.extend({}, $.fn.radiosToSlider.defaults, options);

            var slider = new RadiosToSlider($(this), options);
            slider.activate();

            rtn.push({
                setDisable: slider.setDisable.bind(slider),
                setEnable: slider.setEnable.bind(slider)
            });
        });

        return rtn;
    };

    $.fn.radiosToSlider.defaults = {
        size: 'medium',
        animation: true,
        fitContainer: true,
        isDisable: false,
        onSelect: null
    };

})(jQuery);
