radios-to-slider
===========
[![Bower version](https://badge.fury.io/bo/radios-to-slider.svg)](http://badge.fury.io/bo/radios-to-slider)

jquery plugin to create a slider using a list of radio buttons


###Usage

```html
<div id="radios">
    <input id="option1" name="options" type="radio">
    <label for="option1">1 <br>year</label>
 
    <input id="option2" name="options" type="radio">
    <label for="option2">2 years</label>
 
    <input id="option3" name="options" type="radio" checked>
    <label for="option3">3 years</label>
 
    <input id="option4" name="options" type="radio">
    <label for="option4">4 years</label>
 
    <input id="option5" name="options" type="radio">
    <label for="option5">5+ years</label>
</div>

<script>
	$(document).ready( function(){
		$("#radios").radiosToSlider();
	});
</script>
```

###Options

Option	|Values	|Default
--- | --- | ---
animation	| true, false	|true

###Demo and examples
[rubentd.com/radios-to-slider](http://rubentd.com/radios-to-slider)
