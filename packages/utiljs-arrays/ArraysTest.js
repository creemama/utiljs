
'use strict';

var expect = require('chai').expect

var arrays = require('.')

describe('Arrays', () => {
	describe('#contains(a, obj)', () => {
		it('should throw an exception if array is undefined', () => {
			expect(function() {
				arrays.contains()
			}).to.throw('Cannot read property \'indexOf\' of undefined')
		})
		it('should throw an exception if array is null', () => {
			expect(function() {
				arrays.contains(null)
			}).to.throw('Cannot read property \'indexOf\' of null')
		})
		it('should return true if an array contains a value', () => {
			var a = [1, 2, 3]
			expect(arrays.contains(a, 1)).to.equal(true)
			expect(arrays.contains(a, 2)).to.equal(true)
			expect(arrays.contains(a, 3)).to.equal(true)
		})
		it('should return false if an array does not contain a value', () => {
			var a = [1, 2, 3]
			expect(arrays.contains(a)).to.equal(false)
			expect(arrays.contains(a), null).to.equal(false)
			expect(arrays.contains(a, 4)).to.equal(false)
		})
		it('should return true if an array contains null or undefined values', () => {
			var u
			var a = [1, null, 3, u]
			expect(arrays.contains(a, null)).to.equal(true)
			expect(arrays.contains(a)).to.equal(true)
		})
	})

	describe('#shallowCopy', () => {
		it('should create a shallow copy', () => {
			const a = [1, 2, 3]
			const b = arrays.shallowCopy(a)
			expect(b == a).to.be.false
			expect(b[0]).to.eql(1)
			expect(b[1]).to.eql(2)
			expect(b[2]).to.eql(3)
			expect(b.length).to.eql(3)
		})
		it('should throw an error an undefined or null input', () => {
			expect(() => arrays.shallowCopy()).to.throw(Error)
			expect(() => arrays.shallowCopy(null)).to.throw(Error)
		})
	})

	describe('#shuffle', () => {
		it('should shuffle array contents', () => {
			const a = [1, 2, 3]
			const b = arrays.shuffle(a)
			expect(b == a).to.be.false
			expect(b.length).to.eql(3)
			// console.log(b)
		})
		it('should throw an error an undefined or null input', () => {
			expect(() => arrays.shuffle()).to.throw(Error)
			expect(() => arrays.shuffle(null)).to.throw(Error)
		})
	})
})
