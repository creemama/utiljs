# @util.js/emails

> JavaScript utility methods for emails

<p>
  <a href="https://www.npmjs.com/package/@util.js/emails"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/emails.svg?style=flat"></a>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
</p>

@util.js/emails is part of [Util.js](https://github.com/creemama/utiljs).

## Classes

<dl>
<dt><a href="#Emails">Emails</a></dt>
<dd><p>JavaScript utility methods for emails</p>
</dd>
<dt><a href="#EmailHeaders">EmailHeaders</a></dt>
<dd><p>Wrapper of email headers that makes header lookup easy.</p>
<p>This class makes it so that the case of header names is not important.
For example, Gmail might use &quot;In-Reply-To&quot; whereas iCloud might use &quot;In-reply-to&quot;.</p>
</dd>
</dl>

<a name="Emails"></a>

## Emails

JavaScript utility methods for emails

**Kind**: global class  
**Access**: public

- [Emails](#Emails)
  - [.isValidEmail(string)](#Emails+isValidEmail) ⇒ <code>boolean</code>
  - [.wrapHeaders(nameValueArrayOfHeaders)](#Emails+wrapHeaders) ⇒ [<code>EmailHeaders</code>](#EmailHeaders)

<a name="Emails+isValidEmail"></a>

### emails.isValidEmail(string) ⇒ <code>boolean</code>

Returns whether the given string is a valid email.

The regular expression used to validate strings comes from a [W3C article](https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html).

**Kind**: instance method of [<code>Emails</code>](#Emails)  
**Returns**: <code>boolean</code> - true if the given string is a valid email or false otherwise  
**Access**: public

| Param  | Type                | Description        |
| ------ | ------------------- | ------------------ |
| string | <code>string</code> | The string to test |

<a name="Emails+wrapHeaders"></a>

### emails.wrapHeaders(nameValueArrayOfHeaders) ⇒ [<code>EmailHeaders</code>](#EmailHeaders)

Wraps the given nameValueArrayOfHeaders inside an object that makes email-header lookup easy.

When using the returned object, you no longer have to worry about the case (e.g., "In-Reply-To" or "In-reply-to") of email headers.

[googleapis](https://www.npmjs.com/package/googleapis)'s interface to Gmail returns email headers as an array of name-value objects. The following is a sample:

<pre>
[ { name: 'Delivered-To', value: 'c@creemama.com' },
...
  { name: 'Date', value: 'Tue, 10 Jul 2018 10:18:52 -0700' },
...
  { name: 'To', value: 'Chris Topher <c@creemama.com>' } ]
</pre>

**Kind**: instance method of [<code>Emails</code>](#Emails)  
**Returns**: [<code>EmailHeaders</code>](#EmailHeaders) - A new [EmailHeaders](#EmailHeaders) instance  
**Throws**:

- <code>TypeError</code> If nameValueArrayOfHeaders is not an array-like object containing name-value objects

**Access**: public

| Param                   | Type               | Description                                             |
| ----------------------- | ------------------ | ------------------------------------------------------- |
| nameValueArrayOfHeaders | <code>Array</code> | An array of name-value objects containing email headers |

<a name="EmailHeaders"></a>

## EmailHeaders

Wrapper of email headers that makes header lookup easy.

This class makes it so that the case of header names is not important.
For example, Gmail might use "In-Reply-To" whereas iCloud might use "In-reply-to".

**Kind**: global class  
**Access**: public

- [EmailHeaders](#EmailHeaders)
  - [.deliveredTo()](#EmailHeaders+deliveredTo) ⇒ <code>undefined</code> \| <code>string</code>
  - [.date()](#EmailHeaders+date) ⇒ <code>undefined</code> \| <code>string</code>
  - [.from()](#EmailHeaders+from) ⇒ <code>undefined</code> \| <code>string</code>
  - [.get(headerName)](#EmailHeaders+get) ⇒ <code>undefined</code> \| <code>string</code>
  - [.inReplyTo()](#EmailHeaders+inReplyTo) ⇒ <code>undefined</code> \| <code>string</code>
  - [.messageId()](#EmailHeaders+messageId) ⇒ <code>undefined</code> \| <code>string</code>
  - [.references()](#EmailHeaders+references) ⇒ <code>undefined</code> \| <code>string</code>
  - [.subject()](#EmailHeaders+subject) ⇒ <code>undefined</code> \| <code>string</code>
  - [.to()](#EmailHeaders+to) ⇒ <code>undefined</code> \| <code>string</code>
  - [.toString()](#EmailHeaders+toString) ⇒ <code>string</code>

<a name="EmailHeaders+deliveredTo"></a>

### emailHeaders.deliveredTo() ⇒ <code>undefined</code> \| <code>string</code>

Returns the value of the Delivered-To header

**Kind**: instance method of [<code>EmailHeaders</code>](#EmailHeaders)  
**Returns**: <code>undefined</code> \| <code>string</code> - The value of the Date header as a string or undefined  
**Access**: public  
<a name="EmailHeaders+date"></a>

### emailHeaders.date() ⇒ <code>undefined</code> \| <code>string</code>

Returns the value of the Date header

**Kind**: instance method of [<code>EmailHeaders</code>](#EmailHeaders)  
**Returns**: <code>undefined</code> \| <code>string</code> - The value of the Date header as a string or undefined  
**Access**: public  
<a name="EmailHeaders+from"></a>

### emailHeaders.from() ⇒ <code>undefined</code> \| <code>string</code>

Returns the value of the From header

**Kind**: instance method of [<code>EmailHeaders</code>](#EmailHeaders)  
**Returns**: <code>undefined</code> \| <code>string</code> - The value of the From header as a string or undefined  
**Access**: public  
<a name="EmailHeaders+get"></a>

### emailHeaders.get(headerName) ⇒ <code>undefined</code> \| <code>string</code>

Returns the value of the given headerName

**Kind**: instance method of [<code>EmailHeaders</code>](#EmailHeaders)  
**Returns**: <code>undefined</code> \| <code>string</code> - The value of the given header name as a string or undefined  
**Throws**:

- <code>TypeError</code> If headerName does not have a toLowerCase function

**Access**: public

| Param      | Type                | Description                       |
| ---------- | ------------------- | --------------------------------- |
| headerName | <code>string</code> | The header to look up a value for |

<a name="EmailHeaders+inReplyTo"></a>

### emailHeaders.inReplyTo() ⇒ <code>undefined</code> \| <code>string</code>

Returns the value of the In-Reply-To header

**Kind**: instance method of [<code>EmailHeaders</code>](#EmailHeaders)  
**Returns**: <code>undefined</code> \| <code>string</code> - The value of the In-Reply-To header as a string or undefined  
**Access**: public  
<a name="EmailHeaders+messageId"></a>

### emailHeaders.messageId() ⇒ <code>undefined</code> \| <code>string</code>

Returns the value of the Message-Id header

**Kind**: instance method of [<code>EmailHeaders</code>](#EmailHeaders)  
**Returns**: <code>undefined</code> \| <code>string</code> - The value of the Message-Id header as a string or undefined  
**Access**: public  
<a name="EmailHeaders+references"></a>

### emailHeaders.references() ⇒ <code>undefined</code> \| <code>string</code>

Returns the value of the References header

**Kind**: instance method of [<code>EmailHeaders</code>](#EmailHeaders)  
**Returns**: <code>undefined</code> \| <code>string</code> - The value of the References header as a string or undefined  
**Access**: public  
<a name="EmailHeaders+subject"></a>

### emailHeaders.subject() ⇒ <code>undefined</code> \| <code>string</code>

Returns the value of the Subject header

**Kind**: instance method of [<code>EmailHeaders</code>](#EmailHeaders)  
**Returns**: <code>undefined</code> \| <code>string</code> - The value of the Subject header as a string or undefined  
**Access**: public  
<a name="EmailHeaders+to"></a>

### emailHeaders.to() ⇒ <code>undefined</code> \| <code>string</code>

Returns the value of the To header

**Kind**: instance method of [<code>EmailHeaders</code>](#EmailHeaders)  
**Returns**: <code>undefined</code> \| <code>string</code> - The value of the To header as a string or undefined  
**Access**: public  
<a name="EmailHeaders+toString"></a>

### emailHeaders.toString() ⇒ <code>string</code>

Returns a string listing the email-header names and values of this object

**Kind**: instance method of [<code>EmailHeaders</code>](#EmailHeaders)  
**Returns**: <code>string</code> - A string representation of this object  
**Access**: public
