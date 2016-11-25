# radios-to-slider

If you are using angular, check out this awesome [AngularJS Module](https://github.com/wodka/angular-radios-to-slider) by wodka

[![Bower version](https://img.shields.io/bower/v/radios-to-slider.svg)](https://img.shields.io/bower/v/radios-to-slider.svg)

jQuery plugin to create a slider using a list of radio buttons

## Usage

```html
<div id="radios">
    <input id="option1" name="options" type="radio" value="1">
    <label for="option1">1 <br>year</label>

    <input id="option2" name="options" type="radio" value="2">
    <label for="option2">2 years</label>

    <input id="option3" name="options" type="radio" value="3" checked>
    <label for="option3">3 years</label>

    <input id="option4" name="options" type="radio" value="4">
    <label for="option4">4 years</label>

    <input id="option5" name="options" type="radio" value="5">
    <label for="option5">5+ years</label>
</div>

<script>
    $(document).ready(function(){
        var radios = $("#radios").radiosToSlider();

        // Disable input
        radios.setDisable();

        // Enable input
        radios.setEnable();

        // Retrieve value
        radios.getValue();
    });
</script>
```

## Options

Option       | Values      | Default
------------ | ----------- | --------
animation    | true, false | true
onSelect     | callback    | null
size         | string      | "medium"
fitContainer | true, false | true
isDisable    | true, false | false

## API

Function   | Callback | Args
---------- | -------- | ----------------
setDisable | true     | $levels, $inputs
setEnable  | true     | $levels, $inputs
getValue   | false    | -

Events      | Triggered
----------- | -------------
radiochange | If triggered [click, change] events
radiodisabled | When disabled radio
radiodenabled | When enabled radio

## Demo and examples

- [rubentd.com/radios-to-slider](http://rubentd.com/radios-to-slider)
