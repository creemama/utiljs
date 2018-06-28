
'use strict';

const util = require('util')

module.exports = function Timers() {
	this.setImmediate = setImmediate
	this.setImmediatePromise = util.promisify(setImmediate)
	this.setInterval = setInterval
	this.setTimeout = setTimeout
	this.setTimeoutPromise = util.promisify(setTimeout)
	this.clearImmediate = clearImmediate
	this.clearInterval = clearInterval
	this.clearTimeout = clearTimeout
}
