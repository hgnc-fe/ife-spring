'use strict'

/**
 * 常见的匹配数字的正则参见:http://lives.iteye.com/blog/1397939
 */

const expect = require('chai').expect

const REG_EXP = /^(0|-?[1-9]\d*)$/

describe('<正则表达式测试>', () =>{
	it('<1>', () => {
		expect(REG_EXP.test('1')).to.be.true
	})
	it('<123>',() => {
		expect(REG_EXP.test('123')).to.be.true
	})
	it('<0>',() => {
		expect(REG_EXP.test('0')).to.be.true
	})
	it('<012>',() => {
		expect(REG_EXP.test('012')).to.be.false
	})
	it('<000>',() => {
		expect(REG_EXP.test('000')).to.be.false
	})
	it('<-0>',() => {
		expect(REG_EXP.test('-0')).to.be.false
	})
	it('<-12>',() => {
		expect(REG_EXP.test('-12')).to.be.true
	})
	it('<-00>',() => {
		expect(REG_EXP.test('-00')).to.be.false
	})
	it('<-12>',() => {
		expect(REG_EXP.test('-012')).to.be.false
	})
	it('<1dsfds2>',() => {
		expect(REG_EXP.test('1dsfds2')).to.be.false
	})
})