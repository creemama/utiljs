
'use strict';

module.exports = function Emails() {
	this.isValidEmail = isValidEmail

	// This regular expression comes from https://www.w3.org/TR/html-markup/input.email.html
	function isValidEmail(string) { return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(string) }
}
