
'use strict';

module.exports = function Arrays() {
	this.contains = contains
	this.shallowCopy = shallowCopy
	this.shuffle = shuffle

	const o = {}

	function knuthshuffle() {
		if (!o['knuth-shuffle']) o['knuth-shuffle'] = require('knuth-shuffle')
		return o['knuth-shuffle']
	}

	function contains(array, object) { return array.indexOf(object) > -1 }

	function shallowCopy(array) { return array.slice(0) }

	function shuffle(array) { return knuthshuffle().knuthShuffle(shallowCopy(array)) }
}