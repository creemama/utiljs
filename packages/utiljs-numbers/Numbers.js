
'use strict';

module.exports = function Numbers() {
	this.E = Math.E
	this.LN10 = Math.LN10
	this.LN2 = Math.LN2
	this.LOG10E = Math.LOG10E
	this.LOG2E = Math.LOG2E
	this.PI = Math.PI
	this.SQRT1_2 = Math.SQRT1_2
	this.SQRT2 = Math.SQRT2

	this.EPSILON = Number.EPSILON
	this.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER
	this.MAX_VALUE = Number.MAX_VALUE
	this.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER
	this.MIN_VALUE = Number.MIN_VALUE
	this.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY
	this.NaN = Number.NaN
	this.POSITIVE_INFINITY = Number.POSITIVE_INFINITY

	this.abs = Math.abs
	this.acos = Math.acos
	this.acosh = Math.acosh
	this.asin = Math.asin
	this.asinh = Math.asinh
	this.atan = Math.atan
	this.atan2 = Math.atan2
	this.atanh = Math.atanh
	this.cbrt = Math.cbrt
	this.ceil = Math.ceil
	this.clz32 = Math.clz32
	this.cos = Math.cos
	this.cosh = Math.cosh
	this.exp = Math.exp
	this.expm1 = Math.expm1
	this.floor = Math.floor
	this.fround = Math.fround
	this.hypot = Math.hypot
	this.imul = Math.imul
	this.log = Math.log
	this.log10 = Math.log10
	this.log1p = Math.log1p
	this.log2 = Math.log2
	this.max = Math.max
	this.min = Math.min
	this.pow = Math.pow
	this.random = Math.random
	this.round = Math.round
	this.sign = Math.sign
	this.sin = Math.sin
	this.sinh = Math.sinh
	this.sqrt = Math.sqrt
	this.tan = Math.tan
	this.tanh = Math.tanh
	this.trunc = Math.trunc

	this.isFinite = Number.isFinite
	this.isInteger = Number.isInteger
	this.isNaN = Number.isNaN
	this.isSafeInteger = Number.isSafeInteger
	this.parseFloat = Number.parseFloat
	this.parseInt = Number.parseInt

	this.isInt = isInt

	// http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
	function isInt(value) {
		return !isNaN(value) &&
			parseInt(Number(value)) == value &&
			!isNaN(parseInt(value, 10))
	}
}
