Simpler Birthday Picker Plugin
==============================

##Usage
Create a div and wrap month, day and year insdie it. Make sure month > day > year are in the right order.
You can add elements/css between. 
```html
<div class="myBday">
    <select></select>
    <select></select>
    <select></select>
</div>
```

Add wrapper class into bday function. (Make sure you add window.onload or jQuery $(document).ready or add javascript under html elements)

```javascript
window.onload = function(){
	bday('.myBday');
	bday('.yourBday');
};
```

##License
This work is licensed under a [MIT License](http://opensource.org/licenses/MIT).

##Author
This Javascript plugin was written by Benjamin Wong