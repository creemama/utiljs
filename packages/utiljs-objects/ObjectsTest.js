
'use strict';

var expect = require('chai').expect

var Objects = require(__dirname + '/Objects')

describe('Objects', () => {
	describe('#merge(a, b)', () => {
		var objects = new Objects

		it('should handle nulls and undefined inputs', () => {
			// If u = undefined, n = null, and o = object,
			// we're going to test:

			// u, u
			// u, n // not testing
			// u, o // not testing
			// n, u
			// n, n
			// n, o
			// o, u
			// o, n
			// o, o

			expect(objects.merge()).to.eql({})
			expect(objects.merge(null)).to.eql({})
			expect(objects.merge(null, null)).to.eql({})
			expect(objects.merge(null, {a: 'a'})).to.eql({a: 'a'})
			expect(objects.merge({a: 'a'})).to.eql({a: 'a'})
			expect(objects.merge({a: 'a'}, null)).to.eql({a: 'a'})
			expect(objects.merge({a: 'a'}, {b: 'b'})).to.eql({b: 'b', a: 'a'})
		})
		it('should return b\'s properties over a\'s', () => {
			expect(objects.merge({a: 'a'}, {a: 'a'})).to.eql({a: 'a'})
			expect(objects.merge({a: 'a'}, {a: 'b'})).to.eql({a: 'b'})
		})
	})
})
