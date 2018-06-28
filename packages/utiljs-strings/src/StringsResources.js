
'use strict';

module.exports = function StringsResources() {
	const o = {}

	function get(resource) { return o[resource] ? o[resource] : (o[resource] = require(resource)) }

	this.base64url = function base64url() { return get('base64url') }
}
