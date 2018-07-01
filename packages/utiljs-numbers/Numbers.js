
'use strict';

module.exports = function Numbers() {
	this.floor = Math.floor
	this.random = Math.random

	this.parseInt = Number.parseInt

	this.isInt = isInt

	// http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
	function isInt(value) {
		return !isNaN(value) &&
			parseInt(Number(value)) == value &&
			!isNaN(parseInt(value, 10))
	}
}