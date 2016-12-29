/*
The MIT License (MIT)

 * Copyright (c) 2016 Benjamin Wong 
 * https://github.com/yben56/bDay

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(){
	'use strict';
	
	var bday = function( selector ){
		return new init( selector );
	};
	
	var defaults = function(){
		var currentYear = new Date().getFullYear();
		
		this.defaultMonths	= getDefault(1, 12, "Month");
		this.defaultDays	= getDefault(false, false, "Day");
		this.defaultYears	= getDefault(false, false, "Year");
				
		this.days31		= getDefault(1, 31, "Day");
		this.days30		= getDefault(1, 30, "Day");
		this.days29		= getDefault(1, 29, "Day");
		this.years		= getDefault(currentYear - 100, currentYear, "Year");
		this.leapYears 	= getDefault(Math.ceil((currentYear - 100)/4) * 4, currentYear, "Year", true);
		
		
		function getDefault(start, end, type, leap = false){
			var opt = "<option selected disabled>" + type + "</option>";
			
			if (start == false || end == false) { return opt; }
			
			var increment = 1;
			if (leap) { increment = 4; }
			
			for( start; start <= end; start += increment ){
				opt += "<option value='" + start + "'>" + start + "</option>";
			}
			
			return opt;
		}
	};
	
	var init = function( selector ){
		defaults.call(this);
		
		this.month	= document.querySelectorAll( selector + " select" )[0];
		this.day	= document.querySelectorAll( selector + " select" )[1];
		this.year	= document.querySelectorAll( selector + " select" )[2];
		
		this.pageLoad();
		this.selectChange('month');
		this.selectChange('day');
	};
	
	init.prototype.pageLoad = function(){
		this.month.innerHTML += this.defaultMonths;
		this.day.innerHTML += this.defaultDays;
		this.year.innerHTML += this.defaultYears;
	};
	
	init.prototype.selectChange = function( type ){
		var self = this;
		
		if (type == "month") {
		
			this.month.onchange = function(){
				if (
					this.value == 1 || this.value == 3 || this.value == 5 ||
					this.value == 7 || this.value == 8 || this.value == 10 || this.value == 12
				) {
					self.day.innerHTML = self.days31;
				} else if (
					this.value == 2
				) {
					self.day.innerHTML = self.days29;
				} else {
					self.day.innerHTML = self.days30;
				}
			};
		} else if (type == "day") {
			this.day.onchange = function(){
				if (this.value == 29 && self.month.value == 2) {
					self.year.innerHTML = self.leapYears;
				} else {
					self.year.innerHTML = self.years;
				}
			};
		}
	}
	
	window.bday = bday;
})();