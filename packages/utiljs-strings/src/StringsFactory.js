
'use strict';

const Resources = require(__dirname + '/StringsResources')
const Strings = require(__dirname + '/Strings')

module.exports = function StringsFactory() {
	this.newStrings = function newStrings() {
		return new Strings({ base64url: newResources().base64url() })
	}

	function newResources() { return new Resources() }
}
